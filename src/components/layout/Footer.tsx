import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Globe, Briefcase, Phone as PhoneIcon } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("Navigation");
  const f = useTranslations("Footer");
  const c = useTranslations("Categories");

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="Dai Phuc Global"
                width={32}
                height={32}
                className="hidden sm:inline-block"
              />
              <span className="font-bold text-xl">Dai Phuc Global</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {f("description")}
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
            <h3 className="font-semibold mb-4">{f("quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f("products")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{c("agriculture")}</li>
              <li>{c("forestry")}</li>
              <li>{c("seafood")}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{f("contactUs")}</h3>
            <address className="text-sm text-muted-foreground not-italic space-y-2">
              <p>
                {f("addressLabel")}
                {f("address")}
              </p>
              <p>
                {f("phoneLabel")}
                {f("phone")}
              </p>
              <p>
                {f("emailLabel")}
                {f("email")}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {f("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
