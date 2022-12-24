import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Slider from "../../components/slider/Slider";
import { getAllMovies } from "../../api/movie";
import { CSpinner } from "@coreui/react";
import { Link } from "react-router-dom";
import { HandThumbsUpFill } from "react-bootstrap-icons";
import Footer from "../footer/Footer";

const LandingPage = async () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const initialise = async () => {
    const movies = await getAllMovies();
    setMovieList(movies.data);
    setIsLoading(false);
  };

  const getLoader = () => {
    return (
      isLoading && (
        <div className="d-flex my-5 justify-content-center align-items-center">
          {" "}
          <CSpinner variant="grow" />
        </div>
      )
    );
  };

  useEffect(() => {
    initialise();
  }, []);

  return (
    <div>
      <Navbar />
      <div >
        {getLoader()}

        {!isLoading && (
          <>
            <Slider />

            <div className="container my-4">
              <h5> Recommended Movies</h5>

              {movieList.map((movie) => {
                return (
                  <div className="row">
                    <div className="col-lg-3 col-xs-6 my-2">
                      <Link to={`/movie/${movie._id}/details`}>
                        <div
                          className="d-flex justify-content-center align-items-stretch"
                          style={{ height: "30rem" }}
                        >
                          <div
                            className="card bg-dark"
                            style={{ width: "20rem" }}
                          >
                            <img
                              src={movie.posterUrl}
                              className="card-img-top"
                              alt="movie"
                              style={{ height: "80%" }}
                            />
                            <div className="p-2">
                              <div className="d-flex justify-content-center align-items-center">
                                <HandThumbsUpFill className="text-success" />
                                <i className="text-success px-2"> 58k</i>
                              </div>
                              <p className="text-white px-2 fs-5">
                                {" "}
                                {movie.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
