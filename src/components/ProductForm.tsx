
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductStore } from "@/hooks/use-product-store";
import type { Product, ProductSize } from "@/lib/types";
import { useEffect, useRef } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.enum(["Cakes", "Brownies"]),
  images: z.string().url("Please enter a valid image URL.").array().min(1, "At least one image is required."),
  sizes: z.array(z.object({
    name: z.string().min(1, "Size name cannot be empty."),
    price: z.coerce.number().min(0, "Price must be a positive number."),
  })).min(1, "At least one size is required."),
  isBestseller: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: Product | null;
}

export function ProductForm({ isOpen, setIsOpen, product }: ProductFormProps) {
  const { addProduct, updateProduct } = useProductStore();
  const lastImageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "Cakes",
      images: [""],
      sizes: [{ name: "", price: 0 }],
      isBestseller: false,
    },
  });

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control: form.control,
    name: "sizes",
  });
  
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        category: product.category,
        images: product.images,
        sizes: product.sizes,
        isBestseller: product.isBestseller || false,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        category: "Cakes",
        images: [""],
        sizes: [{ name: "", price: 0 }],
        isBestseller: false,
      });
    }
  }, [product, form, isOpen]);

  useEffect(() => {
    if (imageFields.length > 1) {
      lastImageInputRef.current?.focus();
    }
  }, [imageFields.length]);


  const onSubmit = (data: ProductFormValues) => {
    if (product) {
      updateProduct({ ...product, ...data });
    } else {
      addProduct({
        id: `prod-${Date.now()}`,
        ...data,
      });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Chocolate Truffle Cake" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the product..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cakes">Cakes</SelectItem>
                      <SelectItem value="Brownies">Brownies</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Images</FormLabel>
              <div className="space-y-2 mt-2">
                {imageFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`images.${index}`}
                    render={({ field: { ref, ...fieldProps } }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                           <FormControl>
                            <Input 
                                placeholder="https://example.com/image.png" 
                                {...fieldProps} 
                                ref={index === imageFields.length - 1 ? lastImageInputRef : ref}
                            />
                           </FormControl>
                           {imageFields.length > 1 && (
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                           )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendImage("", { shouldFocus: true })}>
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Image
              </Button>
            </div>

            <div>
              <FormLabel>Sizes and Prices</FormLabel>
              <div className="space-y-4 mt-2">
                {sizeFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 p-2 border rounded-md">
                    <FormField
                      control={form.control}
                      name={`sizes.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="e.g. 0.5 kg or Pack of 4" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`sizes.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="number" placeholder="Price" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    {sizeFields.length > 1 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeSize(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendSize({ name: "", price: 0 })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Size
              </Button>
            </div>
            
            <FormField
              control={form.control}
              name="isBestseller"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Mark as Bestseller
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
