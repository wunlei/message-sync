export function fetchWrapper(promise: Promise<Response>) {
  return promise.then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} ${response.statusText}`);
  });
}

export function getURLPath(
  idInstance: string,
  apiTokenInstance: string,
  path: string,
) {
  return `/waInstance${idInstance}/${path}/${apiTokenInstance}`;
}
