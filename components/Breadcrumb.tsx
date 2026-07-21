import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * Visual breadcrumb nav. Pairs with lib/schema.ts#buildBreadcrumbSchema —
 * the two must list the same trail, in the same order, so the structured
 * data matches what a user (and a crawler) actually sees on the page.
 */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-xs tracking-wide text-slate">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span className="text-rust" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-rust">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
