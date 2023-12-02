import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Booking from './Booking';
import List from './List';
import MovieDetail from './MovieDetail';
import { Provider } from "react-redux";
import store from './store.js'
import Reservation from './Reservation';
import SelectSeats from './SelectSeats';
import Pay from './Pay.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/list" element={<List />} />
          <Route path="/moviedetail/:id" element={<MovieDetail />} />
          <Route path="/reservation" element={<Reservation />}  />
          <Route path='/selectseats' element={<SelectSeats />} />
          <Route path='/pay' element={<Pay />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
