import { getPageBySlug } from "@/lib/graphql/requests/pages";
import PageSections from "./(components)/PageSections";

export default async function Home() {
  const page = await getPageBySlug("home");
  return page ? <PageSections sections={page.sections} /> : null;
}
