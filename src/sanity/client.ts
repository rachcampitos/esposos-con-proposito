import { createClient, type QueryParams } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

const configured = !!projectId;

export const client = configured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

export async function safeFetch<T>(
  query: string,
  params?: QueryParams,
  fallback?: T,
): Promise<T> {
  if (!client) return fallback as T;
  try {
    if (params) {
      return await client.fetch<T>(query, params);
    }
    return await client.fetch<T>(query);
  } catch {
    return fallback as T;
  }
}
