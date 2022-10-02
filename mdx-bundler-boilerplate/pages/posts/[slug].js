import { useMemo } from "react";
import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import remarkPrism from "remark-prism";
import matter from "gray-matter";
import Layout from "../../components/layout";

export async function getStaticPaths() {
  const filePaths = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(filePaths);

  const paths = files.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    return { params: { slug } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.mdx`);
  const post = fs.readFileSync(filePath);

  const { data: frontmatter, content } = matter(post);

  const { code } = await bundleMDX({
    source: content,
    xdmOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkPrism]
      return options;
    },
  });

  return { props: { frontmatter, code } };
};

export default function Post({ frontmatter, code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout meta={frontmatter}>
      <Component />
    </Layout>
  );
}