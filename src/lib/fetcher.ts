import { ACCESS_TOKEN_KEY } from './constants/storageKey';
import { getCookie } from './cookies';

type Query = Record<string, string | undefined>;

type FetchOptions = {
  isFreshURL?: boolean;
  isFormData?: boolean;
};

type FetchParams = RequestInit & {
  url: string;
  query?: Query;
  options?: FetchOptions;
};

const generateQuery = (query: Query) => {
  const queryKeys = Object.keys(query);

  if (queryKeys.length === 0) return '';

  const queryValues = queryKeys.map((key) => {
    if (!query[key]) return null;

    return `${key}=${query[key]}`;
  });

  const queryString = queryValues.filter((query) => query !== null).join('&');

  return queryString;
};

const parseURL = (url: string, query?: Query) => {
  const [urlWithoutQueries, initialQueries] = url.split('?');

  const listOfQueries: string[] = [];
  if (initialQueries) listOfQueries.push(initialQueries);
  if (query) listOfQueries.push(generateQuery(query));

  const queryString =
    listOfQueries.length > 0 ? `?${listOfQueries.join('&')}` : '';
  return `${urlWithoutQueries}${queryString}`;
};

const fetcher = <ResponseBody>({ method = 'GET', ...args }: FetchParams) => {
  return new Promise<ResponseBody>(async (resolve, reject) => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const finalUrl = args?.options?.isFreshURL
      ? args?.url
      : `${backendUrl}${args?.url}`;

    const response = await fetch(parseURL(finalUrl, args?.query), {
      method,
      headers: <HeadersInit>{
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...(!args?.options?.isFormData && {
          'Content-Type': 'application/json',
        }),
        ...args?.headers,
      },
      cache: args?.cache ?? args?.next ? undefined : 'no-store',
      ...args,
    });

    const data = await response.json();

    if (!response.ok) {
      reject(data);
    }

    resolve(data as ResponseBody);
  });
};

export default fetcher;
