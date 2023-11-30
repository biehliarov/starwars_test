import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { fetchHeroById } from "../../store/slices/heroesSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Loader from "../../components/Loader";

const HeroInfo: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { hero, status, error } = useSelector(
    (state: RootState) => state.heroes
  );

  useEffect(() => {
    const parseId = Number(id);
    dispatch(fetchHeroById(parseId));
  }, [dispatch, id]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{hero.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-lg font-bold mb-2">Personal Information</div>
          <div>
            <strong>Birth Year:</strong> {hero.birth_year}
          </div>
          <div>
            <strong>Gender:</strong> {hero.gender}
          </div>
          <div>
            <strong>Eye Color:</strong> {hero.eye_color}
          </div>
          <div>
            <strong>Hair Color:</strong> {hero.hair_color}
          </div>
          <div>
            <strong>Skin Color:</strong> {hero.skin_color}
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-lg font-bold mb-2">Physical Attributes</div>
          <div>
            <strong>Height:</strong> {hero.height} cm
          </div>
          <div>
            <strong>Mass:</strong> {hero.mass} kg
          </div>
        </div>
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="text-lg font-bold mb-2">Other Information</div>
          <div>
            <strong>Homeworld:</strong> {hero.homeworld}
          </div>
          <div>
            <strong>URL:</strong> {hero.url}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded-md">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default HeroInfo;
