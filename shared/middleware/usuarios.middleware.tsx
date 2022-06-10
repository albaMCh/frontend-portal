const API_URL = "https://dummyjson.com";
const ENDPOINT = "users";

export const getUsuarios = async ({ query }: { query?: string } = {}) => {
  let isError = false;
  try {
    const url = `${API_URL}/${ENDPOINT}${query ? "/search?q=" + query : ""}`;
    const res = await fetch(url);
    const data = await res.json();

    return {
      data: data.users,
      isError,
    };
  } catch (e) {
    isError = true;
    return {
      data: [],
      isError,
    };
  }
};

export const getUsuario = async (id: string) => {
  let isError = false;
  try {
    let response = await fetch(`${API_URL}/${ENDPOINT}/${id}`);
    const user = await response.json();

    return {
      data: user,
      isError,
    };
  } catch (e) {
    isError = true;
    return {
      data: null,
      isError,
    };
  }
};
