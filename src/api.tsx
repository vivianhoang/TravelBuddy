import * as models from './models'

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

export function findMatch(params: {name: string, city: models.City}): Promise<{}> {
  const { name, city } = params;
  const request = {
    name,
    city
  };
  return apiCall({endPoint: 'findMatch', request}) as Promise<{}>;
}

export function resetMatch(params: {username: string}): Promise<{}> {
  const { username } = params;
  const request = {
    username,
  };
  return apiCall({endPoint: 'resetMatch', request}) as Promise<{}>;
}