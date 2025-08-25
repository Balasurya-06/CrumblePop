import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - CrumblePop',
  description: 'Get in touch with CrumblePop. We are here to help!',
};


export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Phone className="h-8 w-8 text-primary" />,
      title: 'Call Us',
      detail: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: 'WhatsApp',
      detail: 'Chat with us',
      link: 'https://wa.me/919876543210'
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: 'Email Us',
      detail: 'hello@crumblepop.com',
      link: 'mailto:hello@crumblepop.com'
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: 'Our Location',
      detail: '123 Sweet Street, Bakery Lane, Pune',
      link: '#'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We'd love to hear from you! For orders, queries, or just to say hello.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactInfo.map((info) => (
          <a href={info.link} target="_blank" rel="noopener noreferrer" key={info.title}>
            <Card className="text-center h-full hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                  {info.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{info.title}</CardTitle>
                <p className="text-muted-foreground">{info.detail}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

       <div className="mt-20">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.189512688789!2d73.85433931538615!3d18.52043038740889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0792348f3e5%3A0x1c34a41f881b2a47!2sShaniwar%20Wada!5e0!3m2!1sen!2sin!4v1620048574169!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{border:0}} 
            allowFullScreen={false} 
            loading="lazy"
            className="rounded-lg shadow-md"
        ></iframe>
       </div>
    </div>
  );
}
