import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ProductGallery } from "@/components/ProductGallery";
import { prisma } from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  const d = await getTranslations("ProductDetail");
  const c = await getTranslations("Categories");

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  const name = locale === "vi" ? product.nameVi : product.nameEn;
  const description = locale === "vi" ? product.descVi : product.descEn;
  const categoryStr = product.type.toLowerCase();

  // Helper to get image URL considering fallback logic
  const getImageUrl = (index: number) => {
    const firstNameStr = product.nameEn.toLowerCase().replace(/\s+/g, "_");
    const nameStr = product.nameEn.toLowerCase().replace(/\s+/g, "-");
    return `/daiphucimex/products/${categoryStr}/${firstNameStr}/${nameStr}-${index + 1}.jpg`;
  };

  const thumbnails = Array.from({ length: product.imageUrls.length }).map(
    (_, i) => getImageUrl(i),
  );
  const specs = [d("origin"), d("highQuality")];
  const process = d("processSteps");

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
      <Link
        href="/products"
        className={buttonVariants({ variant: "ghost", className: "mb-8" })}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> {d("backToProducts")}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductGallery name={name} images={thumbnails} />

        {/* Product Info */}
        <div>
          <div className="text-sm text-primary uppercase tracking-wider font-bold mb-2">
            {c(categoryStr as any)}
          </div>
          <h1 className="text-4xl font-bold mb-6">{name}</h1>
          <p className="text-lg text-muted-foreground mb-8 whitespace-pre-line">
            {description}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{d("specifications")}</h3>
            <ul className="space-y-2">
              {specs.map((spec, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-4">{d("productionProcess")}</h3>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-mono text-sm">{process}</p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">
              {d("inquire")}
            </h3>
            <ContactForm defaultTitle={`${d("inquiryPrefix")}${name}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
