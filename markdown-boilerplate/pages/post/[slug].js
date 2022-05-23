import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Layout from "../../components/layout";

export async function getStaticPaths() {
  const filePaths = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(filePaths);

  const paths = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    return { params: { slug } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);
  const post = fs.readFileSync(filePath);

  const { data: frontmatter, content: rawContent } = matter(post);

  const code = await remark().use(html).process(rawContent);
  const content = code.toString();

  return { props: { frontmatter, content } };
};

export default function Post({ frontmatter, content }) {
  return (
    <Layout meta={frontmatter}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
}