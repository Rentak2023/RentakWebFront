import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react/nextjs";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { type BlogPosting, type WithContext } from "schema-dts";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { orpcClient } from "@/lib/orpc";
import { generateAlternatesLinks } from "@/lib/utils";

import MorePosts from "./more-posts";

export const generateStaticParams = async () => {
  const articles = await orpcClient.articles.list("en");

  return articles.map((article) => ({ slug: article.slug }));
};

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const locale = await getLocale();

  const article = await orpcClient.articles.find({
    slug: decodeURI(slug),
    lang: locale,
  });
  if (!article) return notFound();

  const url = `https://rentakapp.com/blog/${slug}`;

  return {
    title: article.title,
    description: article.meta_description,
    keywords: article.meta_keywords,
    alternates: generateAlternatesLinks(`/blog/${slug}`),
    openGraph: {
      title: article.title,
      description: article.meta_description,
      url,
      type: "article",
      publishedTime: article.created,
      authors: [article.author || "Rentak"],
      images: [
        {
          url: article.picture,
          alt: article.title,
        },
      ],
    },
  };
};

const PostLayout = async (
  props: Readonly<{ params: Promise<{ slug: string }> }>,
) => {
  const { slug } = await props.params;
  const locale = await getLocale();

  const article = await orpcClient.articles.find({
    slug: decodeURI(slug),
    lang: locale,
  });
  if (article == null) return notFound();

  const blurhash = await orpcClient.placeholder.blurhash({
    url: article.picture,
  });

  const gradient = blurhashToCssGradientString(blurhash.encoded);

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.meta_description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rentakapp.com/blog/${slug}`,
    },
    image: article.picture,
    datePublished: article.created,
    articleBody: article.description,
    author: {
      "@type": "Person",
      name: article.author || "Rentak",
    },
    publisher: {
      "@type": "Organization",
      name: "Rentak",
      logo: {
        "@type": "ImageObject",
        url: "https://rentakapp.com/images/logo.png",
      },
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb />
      <article className="mx-auto mt-20 max-w-xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-semibold">{article.title}</h1>
        </div>
        <div className="relative mb-8 min-h-96">
          <Image
            src={article.picture}
            alt={`Featured image for article: ${article.title}`}
            width={576}
            height={384}
            className="mx-auto mb-8 size-full overflow-hidden rounded-2xl"
            priority
            loading="eager"
            fetchPriority="high"
            itemProp="image"
            background={gradient}
          />
        </div>
        <article
          aria-label="Article content"
          itemProp="articleBody"
          className="prose prose-slate md:prose-lg lg:prose-xl"
          // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: article.description,
          }}
        />
      </article>
      <MorePosts />
    </div>
  );
};

export default PostLayout;
