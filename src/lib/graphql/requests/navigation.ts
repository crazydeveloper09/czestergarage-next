import { client } from '../client';
import { getSdk } from '../sdk';
import { cache } from 'react';

const sdk = getSdk(client);

export const getNavigation = cache(async () => {
  const { navigation } = await sdk.Navigation();
  return navigation;
});
