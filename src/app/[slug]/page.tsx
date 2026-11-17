import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { WorkshopContact } from "@/app/(components)/PageContent";
import PageSections from "@/app/(components)/PageSections";
import { getPageBySlug } from "@/lib/graphql/requests/pages";

type CmsPageProps = { params: Promise<{ slug: string }> };

async function loadPage(params: CmsPageProps["params"]) {
  const { slug } = await params;
  if (slug === "home") redirect("/");
  if (slug === "gallery") redirect("/about#galeria");

  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return page;
}

export async function generateMetadata({ params }: CmsPageProps): Promise<Metadata> {
  const page = await loadPage(params);
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description ?? page.sections.find((section) => section.__typename === "HeroSection")?.description,
  };
}

export default async function CmsPage({ params }: CmsPageProps) {
  const page = await loadPage(params);
  const afterHero = page.slug === "contact" ? <WorkshopContact /> : undefined;

  return (
    <PageSections
      sections={page.sections}
      catalog={page.slug === "services"}
      compactHero={["services", "about", "contact"].includes(page.slug ?? "")}
      about={page.slug === "about"}
      afterHero={afterHero}
    />
  );
}




