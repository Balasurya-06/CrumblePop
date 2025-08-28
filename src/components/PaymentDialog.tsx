
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface PaymentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (screenshotDataUrl: string) => void;
}

export function PaymentDialog({ isOpen, onClose, onConfirm }: PaymentDialogProps) {
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { toast } = useToast();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                toast({
                    variant: "destructive",
                    title: "File too large",
                    description: "Please upload a screenshot under 2MB.",
                });
                return;
            }
            setScreenshotFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleConfirm = () => {
        if (!screenshotFile) {
            toast({
                variant: "destructive",
                title: "Screenshot required",
                description: "Please upload a payment screenshot to confirm your order.",
            });
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(screenshotFile);
        reader.onloadend = () => {
            const base64String = reader.result as string;
            onConfirm(base64String);
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
            toast({
                variant: "destructive",
                title: "File read error",
                description: "Could not process the uploaded file. Please try again.",
            });
        };
    };
    
    const handleClose = () => {
        setScreenshotFile(null);
        setPreviewUrl(null);
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Complete Your Payment</DialogTitle>
                    <DialogDescription>
                        Scan the QR code to pay, then upload a screenshot of the confirmation.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-6 py-4">
                     <div className="p-4 border rounded-lg bg-white">
                        <Image
                            src="https://placehold.co/250x250.png"
                            alt="Payment QR Code"
                            width={200}
                            height={200}
                            data-ai-hint="payment QR code"
                        />
                    </div>
                     <div className="text-center">
                        <p className="text-muted-foreground">Or pay using UPI:</p>
                        <p className="font-mono text-lg font-semibold tracking-wider p-2 bg-muted rounded-md">your-upi-id@okhdfcbank</p>
                    </div>

                    <div className="w-full space-y-2">
                        <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
                        <div className="flex items-center justify-center w-full">
                           <label htmlFor="screenshot-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, or GIF (MAX. 2MB)</p>
                                </div>
                                <Input id="screenshot-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" />
                            </label>
                        </div> 
                        {previewUrl && (
                             <div className="mt-4 text-center">
                                <p className="text-sm font-medium">Screenshot Preview:</p>
                                <Image src={previewUrl} alt="Screenshot preview" width={150} height={150} className="mt-2 rounded-md mx-auto object-contain h-32"/>
                             </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button type="button" onClick={handleConfirm} disabled={!screenshotFile}>Confirm Order</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
