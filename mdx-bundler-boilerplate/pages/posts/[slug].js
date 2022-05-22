import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPosts, getPostBySlug } from '../../lib/posts';
import Layout from '../../components/layout';
import { mdxToHtml } from '../../lib/mdx';

export default function Post({ meta, content }) {
  const Component = useMemo(() => getMDXComponent(content), [content]);

  return (
    <Layout meta={meta}>
      <Component />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  const content = await mdxToHtml(post.content);

  return {
    props: {
      ...post,
      content
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      };
    }),
    fallback: false
  }
}