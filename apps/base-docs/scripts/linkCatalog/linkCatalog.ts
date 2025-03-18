import fs from 'fs';
import { glob } from 'glob';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { validateLink } from './validateLink.ts';
import { extractLinks } from './extractLinks.ts';

type Link = {
  href: string;
  valid: boolean;
};

type Page = Record<string, { links: Link[] }>;

/**
 * Recursively extracts all links from all files in the docs/pages directory.
 * Returns an object with the file path as the key and an array of links as the value.
 */
export async function linkCatalog(): Promise<Page[]> {
  const mdFiles = await glob('apps/base-docs/docs/pages/**/*.md');
  const mdxFiles = await glob('apps/base-docs/docs/pages/**/*.mdx');
  const files = [...mdFiles, ...mdxFiles];

  const pages: Page[] = [];
  for (const file of files) {
    const fileContent = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .parse(fs.readFileSync(file, 'utf-8'));

    const fileLinks = extractLinks(fileContent);
    const validatedLinks = await Promise.all(
      fileLinks.map(async (link: string) => ({
        href: link,
        valid: await validateLink(link),
      })),
    );
    pages.push({
      [file]: {
        links: validatedLinks,
      },
    });
  }

  return pages;
}
