import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Leaf, Globe, Briefcase, Phone as PhoneIcon } from "lucide-react";

export function Footer() {
  const t = useTranslations("Navigation");

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Dai Phuc Global</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner in agricultural import-export, connecting Vietnam's finest agriculture, forestry, and seafood with the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Briefcase className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <PhoneIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-foreground">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Agriculture</li>
              <li>Forestry</li>
              <li>Seafood</li>
              <li>Spices</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <address className="text-sm text-muted-foreground not-italic space-y-2">
              <p>Address: [Will be updated later]</p>
              <p>Phone: [Will be updated later]</p>
              <p>Email: contact@daiphucglobal.com</p>
            </address>
          </div>
        </div>
        
        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dai Phuc Global. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
