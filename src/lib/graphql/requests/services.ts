import { cache } from "react";
import { client } from "../client";
import { getSdk } from "../sdk";

const sdk = getSdk(client);

export const getServiceBySlug = cache(async (slug: string) => {
  const { service } = await sdk.ServiceBySlug({ slug });
  return service;
});
