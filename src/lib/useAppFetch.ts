import { BASE_API_URL } from '@/config';

type ResponseState = {
  statusCode: number;
  ok: boolean;
};

type AppFetchResult = {
  data: unknown;
  responseState: ResponseState;
};

export const useAppFetch = async (
  path: string,
  opts?: RequestInit,
  signal?: AbortSignal,
  isImage: boolean = false
): Promise<AppFetchResult> => {
  const response = await fetch(`${BASE_API_URL}${path}`, { ...opts, signal });

  let data = null;

  if (isImage) {
    data = await response.blob();
  } else {
    data = await response.json();
  }

  const responseState = { statusCode: response.status, ok: response.ok };

  return { data, responseState };
};
