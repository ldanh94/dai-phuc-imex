import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Trees, Fish } from "lucide-react";
import { Image } from "@imagekit/next";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const c = useTranslations("Categories");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-muted overflow-hidden">
        {/* Placeholder for Carousel/Image */}

        <div className="absolute inset-0 w-full h-full">
          <Image
            urlEndpoint="https://ik.imagekit.io/daiphucimex"
            src={`/daiphucimex/hero.jpg`}
            fill
            className="object-cover"
            alt="Dai Phuc Global"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-20 text-center text-white px-6 md:px-12 lg:px-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            {t("heroSubtitle")}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className={buttonVariants({
                size: "lg",
                className: "text-primary",
              })}
            >
              Explore Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "text-secondary",
              })}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-24 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("categories")}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: c("agriculture"),
              desc: c("agricultureDesc"),
              icon: Leaf,
              color: "text-green-500",
              bg: "bg-green-500/10",
              slug: "agriculture",
            },
            {
              title: c("forestry"),
              desc: c("forestryDesc"),
              icon: Trees,
              color: "text-amber-600",
              bg: "bg-amber-600/10",
              slug: "forestry",
            },
            {
              title: c("seafood"),
              desc: c("seafoodDesc"),
              icon: Fish,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
              slug: "seafood",
            },
          ].map((cat) => (
            <Link
              key={cat.title}
              href={{
                pathname: "/products",
                query: { category: cat.slug },
              }}
            >
              <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer border-none bg-card/50 backdrop-blur">
                <CardContent className="p-8 text-center flex flex-col items-center">
                  <div
                    className={`p-6 rounded-full ${cat.bg} mb-6 transition-transform group-hover:scale-110`}
                  >
                    <cat.icon className={`w-12 h-12 ${cat.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {cat.desc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Market News & Factory Tour placeholder */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{t("latestNews")}</h2>
              <Link
                href="/news"
                className={buttonVariants({ variant: "ghost" })}
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 flex gap-4 items-center">
                    <div className="w-24 h-24 bg-muted rounded-md shrink-0 flex items-center justify-center text-xs text-muted-foreground">
                      News Img
                    </div>
                    <div>
                      <div className="text-sm text-primary font-medium mb-1">
                        Market Update
                      </div>
                      <h4 className="font-semibold line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                        Global Spices Market Sees Unprecedented Growth in Q2
                      </h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">{t("factoryTour")}</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video bg-muted rounded-lg relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
