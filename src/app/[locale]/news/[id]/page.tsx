import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Mock data
  const newsItem = {
    id: id,
    title: "Global Spices Market Sees Unprecedented Growth in Q2",
    date: "2024-05-15",
    content: `
      <p>The demand for high-quality spices, especially black pepper and cinnamon from Southeast Asia, has surged in the European market in the second quarter of 2024.</p>
      <p>Experts attribute this growth to a shift in consumer preferences towards organic and sustainably sourced culinary ingredients. Dai Phuc Global has been at the forefront of this movement, ensuring that all our partner farms adhere to strict quality and sustainability standards.</p>
      <p>Looking ahead, we expect this trend to continue as more markets recognize the superior flavor profiles of Vietnamese spices.</p>
    `
  };

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 max-w-4xl">
      <Link href="/news" className={buttonVariants({ variant: "ghost", className: "mb-8" })}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center text-primary mb-4 font-medium">
            <Calendar className="mr-2 h-4 w-4" />
            <time>{newsItem.date}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {newsItem.title}
          </h1>
          <div className="aspect-video w-full bg-muted rounded-xl flex items-center justify-center mb-10">
            <span className="text-muted-foreground text-2xl font-bold">Featured Image</span>
          </div>
        </div>
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      </article>
    </div>
  );
}
