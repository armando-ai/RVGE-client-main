const test: Record<string, string> = {};

export const request = async <T>(
  url: string,
  options: {
    method:
      | "get"
      | "post"
      | "patch"
      | "delete"
      | "GET"
      | "POST"
      | "PATCH"
      | "DELETE";
    headers: { [key: string]: string };
    body?: any;
  }
) => {
  const { method, headers, body } = options;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method.toUpperCase(),
    headers: headers,
    body: JSON.stringify(body),
  });

  return await (<T>response.json());
};
