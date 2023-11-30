import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { fetchHeroes } from "../../store/slices/heroesSlice";
import { RootState } from "../../store/store";

import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";

const Heroes: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { heroes, status, error, currentPage, totalPage } = useSelector(
    (state: RootState) => state.heroes
  );

  const [searchValue, setSearchValue] = useState("");

  let searchTimeout: NodeJS.Timeout;

  function getUrl(url: string) {
    const parts = url.split("/");
    const id = Number(parts[parts.length - 2]);
    if (!isNaN(id)) {
      return `hero/${id}`;
    } else {
      return "/";
    }
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHeroes({ page: currentPage }));
    }
  }, [dispatch, status, currentPage, searchValue]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      dispatch(fetchHeroes({ page, searchValue }));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((prev) => {
      const value = e.target.value;
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        console.log(e);
        dispatch(fetchHeroes({ page: 1, searchValue: value }));
      }, 500);
      return value;
    });
  };

  return (
    <div className="bg-gray-100	w-100 h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4"> Star Wars heroes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search heroes..."
            value={searchValue}
            onChange={handleSearch}
            className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {status === "loading" && <Loader />}
        {status === "failed" && <div>Error: {error}</div>}
        {status === "succeeded" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {heroes.map((hero, i) => (
                <Link
                  to={getUrl(hero.url)}
                  key={i}
                  className="p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 rounded-md"
                >
                  <div className="text-lg font-bold mb-2">{hero.name}</div>
                  <div className="text-gray-600">{hero.birth_year}</div>
                </Link>
              ))}
            </div>
            <Pagination
              onPageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Heroes;
