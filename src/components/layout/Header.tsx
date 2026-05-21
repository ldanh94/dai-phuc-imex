import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Leaf } from "lucide-react";
import Image from "next/image";

export function Header() {
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-6 md:px-12 lg:px-20">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Image src="/logo.png" alt="Dai Phuc Global" width={32} height={32} className="hidden sm:inline-block" />
          <span className="hidden font-bold sm:inline-block text-xl">
            Dai Phuc Global
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("products")}
            </Link>
            <Link href="/news" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("news")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
              {t("contact")}
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
