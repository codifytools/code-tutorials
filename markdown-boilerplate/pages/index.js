import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const filePaths = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(filePaths);

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(process.cwd(), "posts", fileName));

    const { data: frontmatter } = matter(fileContent);
    return { slug, ...frontmatter };
  });

  return { props: { posts } };
};

export default function Home({ posts }) {
  const meta = {
    title: "Main title here",
    description: "Main description here"
  };

  return (
    <Layout meta={meta}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <div className={styles.grid}>
            {posts.map(post => (
              <a href={`/post/${post.slug}`} key={post.slug} className={styles.card}>
                <h2>{post.title} &rarr;</h2>
                <p>{post.description}</p>
              </a>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  )
}