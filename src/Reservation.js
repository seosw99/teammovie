import {Table} from 'react-bootstrap';
import { useSelector } from 'react-redux'
import MovieNavbar from './MovieNavbar';
import SeatBox from './SeatBox';

function Reservation() {

    let bookings = useSelector(state => state.bookings);
    let shinwoo = useSelector(state => state.user);
    let num = 0;
    return(
        <div>
            <MovieNavbar />
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>seats</th>
                        <th>Member</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((booking, index) => 
                            <tr key={index}>
                                    <td>{shinwoo.user}</td>
                                    <td>영화 제목</td>
                                    <td>{booking.seats}</td>
                                    <td>{booking.user}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <SeatBox seatNum={'A5'}/>
        </div>
    )

}


export default Reservation;