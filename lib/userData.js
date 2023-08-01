import { getToken } from "./authenticate";

async function requestWithToken(url, method) {
  const token = await getToken();
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `JWT ${token}`,
    },
  });

  if (response.status === 200) {
    return response.json();
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return requestWithToken(url, 'PUT');
}

export async function removeFromFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return requestWithToken(url, 'DELETE');
}

export async function getFavourites() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  return requestWithToken(url, 'GET');
}

export async function addToHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return requestWithToken(url, 'PUT');
}

export async function removeFromHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return requestWithToken(url, 'DELETE');
}

export async function getHistory() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
  return requestWithToken(url, 'GET');
}