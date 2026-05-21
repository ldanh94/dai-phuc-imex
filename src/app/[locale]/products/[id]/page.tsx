import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Image } from "@imagekit/next";
import { prisma } from "@/lib/prisma";
import { getLocale } from "next-intl/server";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();
  
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  const name = locale === 'vi' ? product.nameVi : product.nameEn;
  const description = locale === 'vi' ? product.descVi : product.descEn;
  const categoryStr = product.type.toLowerCase();

  // Helper to get image URL considering fallback logic
  const getImageUrl = (index: number) => {
    if (product.imageUrls && product.imageUrls.length > index) {
      return product.imageUrls[index];
    }

    const firstNameStr = product.nameEn.toLowerCase().replace(/\s+/g, '_');
    const nameStr = product.nameEn.toLowerCase().replace(/\s+/g, '-');
    return `/daiphucimex/products/${categoryStr}/${firstNameStr}/${nameStr}-${index + 1}.jpg`;
  };

  const mainImage = getImageUrl(0);
  // We'll attempt to show 3 thumbnails. If they don't exist, ImageKit will return 404 but we'll handle onError in client or just show broken image for now.
  const thumbnails = [getImageUrl(0), getImageUrl(1), getImageUrl(2)];

  // We don't have specs/process in DB schema currently, so we use generic text or map description lines if needed.
  // For now, we'll keep the mock specs/process but ideally they should be in the DB.
  const specs = [
    "Origin: Vietnam",
    "High Quality Export Standard"
  ];
  const process = "Harvested -> Cleaned -> Sorted -> Packaged";

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
      <Link href="/products" className={buttonVariants({ variant: "ghost", className: "mb-8" })}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-muted-foreground relative overflow-hidden border">
            <Image 
              urlEndpoint="https://ik.imagekit.io/daiphucimex"
              src={`/daiphucimex/products/${product.type.toLowerCase()}/${product.nameEn.toLowerCase().replace(/\s+/g, '_')}/${product.nameEn.toLowerCase().replace(/\s+/g, '-')}-1.jpg`} 
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {thumbnails.map((thumb, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity">
                <Image 
                  urlEndpoint="https://ik.imagekit.io/daiphucimex"
                  src={`/daiphucimex/products/${product.type.toLowerCase()}/${product.nameEn.toLowerCase().replace(/\s+/g, '_')}/${product.nameEn.toLowerCase().replace(/\s+/g, '-')}-${i + 1}.jpg`} 
                  width={500}
                  height={500}
                  alt={`${name} thumbnail ${i+1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-primary uppercase tracking-wider font-bold mb-2">
            {categoryStr}
          </div>
          <h1 className="text-4xl font-bold mb-6">{name}</h1>
          <p className="text-lg text-muted-foreground mb-8 whitespace-pre-line">
            {description}
          </p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
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
            <h3 className="text-xl font-semibold mb-4">Production Process</h3>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <p className="font-mono text-sm">{process}</p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Inquire About This Product</h3>
            <ContactForm defaultTitle={`Inquiry: ${name}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
