import { bundleMDX } from "mdx-bundler";
import remarkPrism from "remark-prism";

export async function mdxToHtml(mdx) {
  const { code } = await bundleMDX(mdx, {
    xdmOptions: options => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkPrism]

      return options;
    },
  });

  return code;
}