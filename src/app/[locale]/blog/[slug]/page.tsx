import { allPosts } from "@content";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const generateStaticParams = () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) return notFound();
  return { title: post.title };
};

const PostLayout = async (
  props: Readonly<{ params: Promise<{ slug: string; locale: string }> }>,
) => {
  const { slug, locale } = await props.params;

  setRequestLocale(locale);

  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  if (!post) return notFound();

  return (
    <article className="mx-auto mt-20 max-w-xl py-8">
      <Image
        src={post.image}
        alt={post.title}
        width={512}
        height={256}
        className="mx-auto mb-8 object-contain"
      />
      <div className="mb-8 text-center">
        {/* <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time> */}
        <h1 className="text-3xl font-bold">
          {locale === "en" ? post.title : post.arTitle}
        </h1>
      </div>
      <div
        className="prose prose-slate md:prose-lg lg:prose-xl"
        dangerouslySetInnerHTML={{
          __html: locale === "en" ? post.content.html : post.arContent.html,
        }}
      />
    </article>
  );
};

export default PostLayout;
