import fs from 'fs';
import { linkCatalog } from './linkCatalog.ts';

type Link = {
  href: string;
  valid: boolean;
};

// Usage:
// All links:     npx tsx linkCatalogCsv.ts all
// Broken links:  npx tsx linkCatalogCsv.ts broken

const arg = process.argv[2]; // 'all' or 'broken'

/**
 * Creates a CSV file with the page path and all links in the file.
 */
export async function createLinkCatalogCsv() {
  const pages = await linkCatalog();

  const rows: [string, Link][] = [];
  for (const page of pages) {
    const pagePath = Object.keys(page)[0];
    const links = page[pagePath].links;
    for (const link of links) {
      const row: [string, Link] = [pagePath, link];
      rows.push(row);
    }
  }

  const csvContent = ['page, href, valid\n'];
  for (const [page, link] of rows) {
    if (arg === 'all' || (arg === 'broken' && !link.valid)) {
      csvContent.push(`${page}, ${link.href}, ${link.valid}`);
    }
  }

  fs.writeFileSync(
    `apps/base-docs/scripts/linkCatalog/link-catalog-${arg}.csv`,
    csvContent.join('\n'),
  );
}

void createLinkCatalogCsv();
