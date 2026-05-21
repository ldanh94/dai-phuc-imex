import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { CategoryType } from "@/lib/generated/prisma/enums";
import { Image } from "@imagekit/next";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const t = await getTranslations("Navigation");
  const locale = await getLocale();
  const params = await searchParams;
  const category = params.category || "all";

  // Fetch products from database
  const products = await prisma.product.findMany({
    where: category !== "all" ? { type: category.toUpperCase() as CategoryType } : undefined,
    orderBy: { createdAt: "desc" },
  });

  const getImageUrl = (product: any) => {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    // Fallback ImageKit logic based on user instructions
    const catStr = product.type.toLowerCase();
    const firstNameStr = product.nameEn.toLowerCase().replace(/\s+/g, '_')
    const nameStr = product.nameEn.toLowerCase().replace(/\s+/g, '-');
    return `/daiphucimex/products/${catStr}/${firstNameStr}/${nameStr}-1.jpg`;
  };

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">Discover our high-quality export products.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Link href="/products" className={buttonVariants({ variant: category === "all" ? "default" : "outline" })}>All</Link>
          <Link href={{ pathname: '/products', query: { category: 'agriculture' } }} className={buttonVariants({ variant: category === "agriculture" ? "default" : "outline" })}>Agriculture</Link>
          <Link href={{ pathname: '/products', query: { category: 'forestry' } }} className={buttonVariants({ variant: category === "forestry" ? "default" : "outline" })}>Forestry</Link>
          <Link href={{ pathname: '/products', query: { category: 'seafood' } }} className={buttonVariants({ variant: category === "seafood" ? "default" : "outline" })}>Seafood</Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={{ pathname: '/products/[id]', params: { id: product.id } }}>
              <Card className="overflow-hidden hover:shadow-lg transition-all group cursor-pointer border-muted">
                <div className="aspect-square bg-muted flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:scale-105 transition-transform z-10" />
              <Image
                urlEndpoint="https://ik.imagekit.io/daiphucimex"
                src={`/daiphucimex/products/${product.type.toLowerCase()}/${product.nameEn.toLowerCase().replace(/\s+/g, '_')}/${product.nameEn.toLowerCase().replace(/\s+/g, '-')}-1.jpg`}
                width={500}
                height={500}
                alt="Picture of the author"
              />
                </div>
                <CardContent className="p-4">
                  <div className="text-xs text-primary mb-1 uppercase tracking-wider font-semibold">
                    {product.type.toLowerCase()}
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {locale === 'vi' ? product.nameVi : product.nameEn}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
