import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Hero {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

interface HeroesState {
  heroes: Hero[];
  hero: Hero;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPage: number;
}

const initialState: HeroesState = {
  heroes: [],
  hero: {} as Hero,
  status: "idle",
  error: null,
  currentPage: 1,
  totalPage: 1,
};

interface FetchHeroesPayload {
  page: number;
  searchValue?: string;
}

export const fetchHeroById = createAsyncThunk(
  "heroes/fetchHeroById",
  async (id: number) => {
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);
    return response.data as Hero;
  }
);

export const fetchHeroes = createAsyncThunk(
  "heroes/fetchHeroes",
  async ({ page, searchValue }: FetchHeroesPayload) => {
    const response = await axios.get(
      `https://swapi.dev/api/people/?page=${page}&search=${searchValue}`
    );
    return {
      heroes: response.data.results,
      totalPage: Math.ceil(response.data.count / 10),
    };
  }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.heroes = action.payload.heroes;
        state.totalPage = action.payload.totalPage;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })
      .addCase(fetchHeroById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHeroById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hero = action.payload;
      })
      .addCase(fetchHeroById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default heroesSlice.reducer;
