"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateProductDescription } from '@/ai/flows/generate-product-descriptions';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  productName: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  productCategory: z.enum(['Cakes', 'Brownies'], { required_error: 'Please select a category.' }),
  productDetails: z.string().min(10, { message: 'Please provide some details about the product.' }),
  productImage: z.instanceof(File).refine((file) => file.size > 0, 'Product image is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function GeneratePage() {
  const [generatedDescription, setGeneratedDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productDetails: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setGeneratedDescription(null);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(values.productImage);
      reader.onload = async () => {
        const productImageUri = reader.result as string;
        const result = await generateProductDescription({
          ...values,
          productImageUri,
        });
        setGeneratedDescription(result.description);
      };
    } catch (error) {
      console.error('Error generating description:', error);
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Generate Product Description</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Let AI help you write compelling descriptions for your products.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Classic Chocolate Cake" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productCategory"
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
                <FormField
                  control={form.control}
                  name="productDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the product's ingredients, flavors, texture, etc."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The more details you provide, the better the description will be.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="productImage"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Product Image</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          }}
                          {...rest}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {imagePreview && (
                    <div className="mt-4">
                        <Image src={imagePreview} alt="Product preview" width={100} height={100} className="rounded-md" />
                    </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Description'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Description</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">AI is baking up a fresh description for you...</p>
              </div>
            )}
            {generatedDescription ? (
              <div className="prose dark:prose-invert">
                <p>{generatedDescription}</p>
              </div>
            ) : (
                !isLoading && <p className="text-sm text-muted-foreground">The generated description will appear here.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
