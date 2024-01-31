import { Entities } from '../App';

export async function fetchEntities(value: string) {
  const res = await fetch(
    `https://mobile-staging.gametime.co/v1/search?q=${value}`
  );

  const data: Entities = await res.json();
  return data;
}
