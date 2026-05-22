import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("Navigation");

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We would love to hear from you. Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information Cards */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Our Office</h3>
                <p className="text-sm text-muted-foreground">
                  Thửa đất số 3467, tờ bản đồ số 23, đường N2B, khu phố 4, phường Thới Hòa, Thành phố Hồ Chí Minh, Việt Nam
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone Number</h3>
                <p className="text-sm text-muted-foreground">+84 971 006 678</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email Address</h3>
                <p className="text-sm text-muted-foreground">lda.daiphuc@gmail.com</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Map Embedded Placeholder */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Find us on the Map</h2>
        <div className="w-full h-[400px] bg-muted rounded-xl flex items-center justify-center border shadow-inner">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-primary/50" />
            <p className="font-medium">Google Maps Embedded Here</p>
            <p className="text-sm mt-1">Showing location pins for Dai Phuc Global offices</p>
          </div>
        </div>
      </div>
    </div>
  );
}
