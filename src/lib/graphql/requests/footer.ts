import { client } from '../client';
import { getSdk } from '../sdk';

const sdk = getSdk(client);

export const getFooter = async () => {
  const { footer } = await sdk.Footer();
  return footer;
}