import axios from "axios";

const BASE_URL = "https://swapi.dev/api/people";

export const fetchHeroById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const fetchHeroes = async (page: number, searchValue?: string) => {
  const response = await axios.get(
    `${BASE_URL}/?page=${page}&search=${searchValue}`
  );
  return {
    heroes: response.data.results,
    totalPage: Math.ceil(response.data.count / 10),
  };
};
