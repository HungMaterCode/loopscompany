import type { Metadata } from "next";
import type { SeoPage } from "@prisma/client";
import { getSiteUrl, SITE, SITE_URLS } from "./site";

export type SeoInput = {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  robots?: string;
  path?: string;
};

export function buildMetadata(input: SeoInput): Metadata {
  const url = input.canonical ?? getSiteUrl(input.path ?? "/");
  const title = input.title;
  const description = input.description;
  const ogTitle = input.ogTitle ?? title;
  const ogDescription = input.ogDescription ?? description;
  const robots = input.robots ?? "index, follow";
  const index = !robots.includes("noindex");

  return {
    title,
    description,
    keywords: input.keywords?.split(",").map((k) => k.trim()),
    robots: { index, follow: !robots.includes("nofollow") },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: ogTitle,
      description: ogDescription,
      images: input.ogImage ? [{ url: input.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: input.ogImage ? [input.ogImage] : undefined,
    },
  };
}

export function seoFromRecord(page: SeoPage, path: string): Metadata {
  return buildMetadata({
    title: page.title,
    description: page.description,
    canonical: page.canonical,
    keywords: page.keywords,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
    ogImage: page.ogImage,
    robots: page.robots,
    path,
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brand,
    url: getSiteUrl("/"),
    logo: getSiteUrl("/og/default.jpg"),
    email: SITE.email,
    telephone: SITE.hotline,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressCountry: "VN",
    },
    sameAs: [SITE_URLS.staging],
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  publishedAt: Date;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.cover,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt.toISOString(),
    mainEntityOfPage: getSiteUrl(`/bai-viet/${article.slug}`),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: getSiteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${getSiteUrl("/bai-viet")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
