import React, { useState } from 'react';
import { useLocation } from 'react-router';

export default function List() {
  const location = useLocation(); //구글링 했습니다.
  const params = new URLSearchParams(location.search); //구글링 했습니다.
  const movieId = params.get('movieId');
  const day = params.get('day');
  const week = params.get('week');

  const [movies, setMovies] = useState([
    { id: 0, title: '다크 나이트', reserved: true },
    { id: 1, title: '서울의 봄', reserved: true },
    { id: 2, title: '헝거 게임', reserved: true },
    { id: 3, title: '그대들은 어떻게 살것인가', reserved: true },
  ]);

  // Cancel Reservation = 예약 취소
  const onCancelReservation = (id) => {
    setMovies((prevMovies) => {
      return prevMovies.map((movie) => {
        if (movie.id === id) {
          return { ...movie, reserved: false };
        }
        return movie;
      });
    });
  };

  // 함수를 이용하여 예매 정보가 있는지 확인, 구글링 했습니다.
  const reservedMovie = movies.find((movie) => {
    console.log(
      'movie.id:',
      movie.id,
      'Number(movieId):',
      Number(movieId),
      'movie.reserved:',
      movie.reserved
    );
    return movie.id === Number(movieId) && movie.reserved;
  });

  return (
    <div>
      {reservedMovie && (
        <div>
          <div>
            {week} • {day}일에 예매한 영화: {reservedMovie.title}
            <button onClick={() => onCancelReservation(Number(movieId))}>
              예매 취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
