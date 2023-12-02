import { useState } from "react";
import { useSelector } from "react-redux";
import MovieNavbar from './MovieNavbar';
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";

let reservedMovies = [];

// 영화 객체를 받아옴..
function MovieDetail() {

    let {id} = useParams();

    let location = useLocation();

    let navigate = useNavigate();

    let movies = useSelector(state => state.movies);

    let movie = movies[id];

    let age = 25;

    const handleReservationClick = () => {
        navigate('/Booking', { state: { movie } });
      };
    
    return (
        <div className="container">
            <MovieNavbar />
            <div className="row">
                <div className="col-md-6">
                    <img src= {movie.imageUrl} height="500px"/>
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5" style={{color:"white"}}>{movie.title}</h4>
                    <p>Description</p>
                    <button bg="black" onClick={handleReservationClick}>Buy Ticket</button>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;