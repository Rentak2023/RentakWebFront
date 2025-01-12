import { allPosts } from "@content";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import MorePosts from "./more-posts";

export const generateStaticParams = () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) return notFound();
  return { title: post.title };
};

const PostLayout = async (
  props: Readonly<{ params: Promise<{ slug: string; locale: Locale }> }>,
) => {
  const { slug, locale } = await props.params;

  setRequestLocale(locale);

  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) return notFound();

  return (
    <div>
      <article className="mx-auto mt-20 max-w-xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-semibold">
            {locale === "en" ? post.title : post.arTitle}
          </h1>
        </div>
        <div className="relative mb-8 min-h-96">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="mx-auto mb-8 size-full overflow-hidden rounded-2xl object-cover"
          />
        </div>
        <div
          className="prose prose-slate md:prose-lg lg:prose-xl"
          // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: locale === "en" ? post.content.html : post.arContent.html,
          }}
        />
      </article>
      <MorePosts />
    </div>
  );
};

export default PostLayout;
