import { Link } from "@/i18n/routing";
import { Card, CardTitle } from "@/components/ui/card";

export default function NewsPage() {
  const news = [
    { id: "1", title: "Global Spices Market Sees Unprecedented Growth in Q2", date: "2024-05-15", excerpt: "The demand for high-quality spices, especially black pepper and cinnamon from Southeast Asia, has surged in the European market..." },
    { id: "2", title: "Vietnam Coffee Exports Reach Record High", date: "2024-05-10", excerpt: "Robusta coffee beans export volume increased by 15% compared to the same period last year, solidifying Vietnam's position as a top exporter." },
    { id: "3", title: "Sustainable Farming Practices Adopted by 500+ Local Partners", date: "2024-05-02", excerpt: "Dai Phuc Global has successfully implemented new sustainable farming guidelines across its network of agricultural suppliers." },
  ];

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Market News</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Stay updated with the latest trends and updates in the agricultural import-export industry.
        </p>

        <div className="space-y-8">
          {news && news.length > 0 ? (
            news.map((item) => (
              <Link key={item.id} href={{ pathname: '/news/[id]', params: { id: item.id } }} className="block">
                <Card className="hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-64 aspect-video sm:aspect-square bg-muted flex items-center justify-center shrink-0">
                      <span className="text-muted-foreground">Thumbnail</span>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <div className="text-sm text-primary font-medium mb-2">{item.date}</div>
                      <CardTitle className="text-2xl mb-3 hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <p className="text-muted-foreground line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No news found at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
