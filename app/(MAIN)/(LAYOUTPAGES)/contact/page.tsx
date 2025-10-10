"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission
  };

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-24 py-16 flex flex-col gap-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto flex flex-col gap-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-cinzel font-bold tracking-wide">
          Get in Touch with Kadian Fashion
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg md:text-xl">
          We’d love to hear from you. Reach out for inquiries, support, or personalized style advice.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="flex flex-col gap-6">
          {[{
            icon: <Mail className="w-5 h-5" />,
            title: "Email Us",
            content: (
              <>
                <p className="text-muted-foreground mb-1">General Inquiries</p>
                <a href="mailto:hello@kadianfashion.com" className="text-accent hover:text-accent/80">hello@kadianfashion.com</a>
                <p className="text-muted-foreground mt-4 mb-1">Customer Support</p>
                <a href="mailto:support@kadianfashion.com" className="text-accent hover:text-accent/80">support@kadianfashion.com</a>
              </>
            )
          },{
            icon: <Phone className="w-5 h-5" />,
            title: "Call Us",
            content: (
              <>
                <p className="text-muted-foreground mb-1">Customer Service</p>
                <a href="tel:+1234567890" className="text-accent hover:text-accent/80">+1 (234) 567-890</a>
                <p className="text-muted-foreground mt-4 mb-1">Press Inquiries</p>
                <a href="tel:+1234567891" className="text-accent hover:text-accent/80">+1 (234) 567-891</a>
              </>
            )
          },{
            icon: <MapPin className="w-5 h-5" />,
            title: "Visit Us",
            content: (
              <p className="text-muted-foreground">
                123 Fashion Avenue<br />
                New York, NY 10001<br />
                United States
              </p>
            )
          },{
            icon: <Clock className="w-5 h-5" />,
            title: "Business Hours",
            content: (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Mon-Fri</span><span>9:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
              </div>
            )
          }].map((item, idx) => (
            <Card key={idx} className="hover:scale-105 transition-transform duration-300 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">{item.icon}{item.title}</CardTitle>
              </CardHeader>
              <CardContent>{item.content}</CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <p className="text-muted-foreground text-sm sm:text-base">
                Fill out the form below and we’ll get back to you promptly.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="returns">Returns & Exchanges</SelectItem>
                      <SelectItem value="sizing">Sizing Help</SelectItem>
                      <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                      <SelectItem value="press">Press Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="btn-hero flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 transition-colors w-full md:w-auto"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-16 max-w-5xl mx-auto flex flex-col gap-6">
        <h2 className="heading-section text-center text-3xl sm:text-4xl mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: "What is your return policy?", a: "We offer a 30-day return policy for unworn items in original condition with tags attached." },
            { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping is available for next-day delivery." },
            { q: "Do you ship internationally?", a: "Yes, we ship to most countries worldwide. International shipping times and costs vary by location." },
            { q: "How do I track my order?", a: "Once your order ships, you’ll receive a tracking number via email to monitor your package." }
          ].map((faq, idx) => (
            <Card key={idx} className="hover:scale-105 transition-transform duration-300 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
