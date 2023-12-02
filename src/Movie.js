import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 영화 객체를 받아옴..
function Movie(props) {

    let [movie, setMovie] = useState(props.movie);

    const navigate = useNavigate();
  
    const handleReservationClick = () => {
      navigate('/Booking', { state: {movie} });
    };
  
    return (
    <div>
        <div className="inner-div">
        <img src={movie.imageUrl} width="200px" alt={movie.title} onClick={() => navigate(`/moviedetail/${movie.movieID}`, {state: { movie }})}/>
        <h4>{movie.title}</h4>
        <button onClick={() => handleReservationClick(movie)}>
          예매
        </button>
      </div>
    </div>
      
    );
  };

export default Movie;