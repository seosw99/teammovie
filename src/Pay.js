import { useParams, useLocation, useNavigate, useLoaderData } from 'react-router-dom';
import MovieNavbar from './MovieNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import { useEffect, useState } from 'react';
import SeatBox from './SeatBox';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import {Button} from 'react-bootstrap';
import { getScreeningData } from './getScreeningData';

function Pay() {

    let location = useLocation();

    let [title, setTitle] = useState('');
    let [theater, setTheater] = useState('');
    let [time, setTime] = useState('');

    let [fee, setFee] = useState('');
    let [seats, setSeats] = useState([]);


    useEffect(() => {
        setTitle(location.state.title);
        setTheater(location.state.theater);
        setTime(location.state.time);
        setFee(location.state.fee);
        setSeats(location.state.seats);
    }, [location.state])
    
    return (
        <div>
            <MovieNavbar />
            <table style={{border: '1px solid white'}}>
                <tr>
                    <td>Title</td>
                    <td>{title}</td>
                </tr>
                <tr>
                    <td>Theater</td>
                    <td>{theater}</td>
                </tr>
                <tr>
                    <td>Time</td>
                    <td>{time}</td>
                </tr>
                <tr>
                    <td>Seats</td>
                    <td>
                        {
                            seats.map((a, i) => {
                                return (
                                    <span key={i}>{a} </span>
                                )
                            })
                        }
                    </td>
                </tr>
                <tr>
                    <td>Cost</td>
                    <td>{fee}</td>
                </tr>
            </table>
            <Button variant="warning">결제하기</Button>{' '}
        </div>
    )

}

export default Pay