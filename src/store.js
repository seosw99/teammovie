import { configureStore, createSlice } from '@reduxjs/toolkit'
import { getData } from './getData';
import { useEffect } from 'react';

let movieArr = [
    {"movieID" : 0, "title" : "Godfather", "imageUrl" : "https://raw.githubusercontent.com/mittinu/movies/main/Images/godfather.jpeg"},
    {"movieID" : 1, "title" : "Spiderman", "imageUrl" : "https://raw.githubusercontent.com/mittinu/movies/main/Images/spiderman.webp"},
    {"movieID" : 2, "title" : "Avengers", "imageUrl" : "https://raw.githubusercontent.com/mittinu/movies/main/Images/avengers.webp"},
    {"movieID" : 3, "title" : "Home Alone", "imageUrl" : "https://raw.githubusercontent.com/mittinu/movies/main/Images/homealone.webp"}
];

let bookingArr = [
    {"id" : 32, "user" : "ShinWoo", "seats" : ["b3", "b4"]},
    {"id" : 75, "user" : "JongHyun", "seats" : ["d5", "d6", "d7"]},
    {"id" : 32, "user" : "JunHo", "seats" : ["c3"]},
]

const loadMovie = async() => {
    let result = await getData();
  };

// useState 와 유사.. 이런 state 하나를 slice 라고 부름..
let user = createSlice({
    name : 'user',
    initialState : 'shinwoo',
    reducers : {
        changeName(state) {
            return state + 99
        }
    }
});

 export let { changeName } = user.actions;

let movies = createSlice({
    name : 'movies',
    initialState : movieArr
})

let bookings = createSlice({
    name : "bookings",
    initialState : bookingArr
})




export default configureStore({
    // 만든 slice 를 여기에 등록..
    reducer : {
        user : user.reducer,
        movies : movies.reducer,
        bookings : bookings.reducer
    }
})

// useEffect(() => {
//     loadMovie();
//   }, []);