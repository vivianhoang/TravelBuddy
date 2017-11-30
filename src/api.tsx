export function apiCall(params: {endPoint: string, request: any}) {
  const { endPoint, request } = params;
  const body = JSON.stringify(request);
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    json: true,
    body,
  };
  const endPointUrl = `https://travel-buddy-project.herokuapp.com/${endPoint}`;
  return new Promise((resolve, reject) => {
    fetch(endPointUrl, options)
      .then(response => {
        resolve(response.json());
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function createOffer(params: {name: string}): Promise<{}> {
  const { name } = params;
  const request = {
    name,
  };
  return apiCall({endPoint: 'createOffer', request}) as Promise<{}>;
}

export function signIn(params: {name: string}): Promise<{}> {
  const { name } = params;
  const request = {
    name,
  };
  return apiCall({endPoint: 'signIn', request}) as Promise<{}>;
}