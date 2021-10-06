import { bundleMDX } from "mdx-bundler";
import remarkPrism from "remark-prism";

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function mdxToHtml(mdx) {
  const { code, frontmatter } = await bundleMDX(mdx, {
    xdmOptions: options => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkPrism]

      return options
    },
  });

  return {
    code,
    ...frontmatter
  }
}