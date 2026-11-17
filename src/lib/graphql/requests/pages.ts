import { cache } from "react";
import { client } from "../client";
import { getSdk } from "../sdk";

const sdk = getSdk(client);

export const getPageBySlug = cache(async (slug: string) => {
  const { page } = await sdk.PageBySlug({ slug });
  return page;
});
