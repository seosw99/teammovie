import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MovieNavbar from './MovieNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';
import { useEffect, useState } from 'react';
import SeatBox from './SeatBox';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import {Button} from 'react-bootstrap';
import { getScreeningData } from './getScreeningData';

function SelectSeats() {

    let navigate = useNavigate();

    let location = useLocation();

    let [title, setTitle] = useState('');
    let [theater, setTheater] = useState('');
    let [time, setTime] = useState('');

    let [screenID, setScreenID] = useState(0);


    const loadScreeningData = async() => {
        let data = await getScreeningData();
        data.forEach(si => {
            if (si.id == location.state.id)
            {
                setTitle(si.title);
                setTheater(si.theater);
                setTime(si.time);
                setScreenID(si.id);
            }
        });
      };

    let rowArr = ['A', 'B', 'C', 'D', 'E'];

    let colArr = ['1', '2', '3', '4', '5'];

    let [adult, setAdult] = useState(0);

    let [child, setChild] = useState(0);

    let [people, setPeople] = useState(0);

    let [fee, setFee] = useState(0);

    let [bookedSeat, setBookedSeat] = useState([]);

    let [testText, setTestText] = useState('');

    // let [adultFee, setAudltFee] = useState(15000);
    // let [childFee, setChildFee] = useState(10000);

    let adultFee = 15000;
    let childFee = 10000;

    function AdultChange(plusminus) {
        setAdult(adult + plusminus);
        TotalFee(adult + plusminus, child);
    }

    function ChildChange(plusminus) {
        setChild(child + plusminus);
        TotalFee(adult, child + plusminus);
    }

    function TotalPeople() {
        setPeople(adult + child);
    }

    function TotalFee(adult, child) {
        let ret = adult * adultFee + child * childFee;
        setFee(ret);
    }

    function ClickSeat(seatNum) {
        if (bookedSeat.includes(seatNum))
        {   
            let index = bookedSeat.indexOf(seatNum);
            let arr = [...bookedSeat];
            arr.splice(index, 1);
               
            setBookedSeat(arr);
            // bookedSeat.splice(index, seatNum.length);
        }
        else if (bookedSeat.length < adult + child)
        {
            let arr = [...bookedSeat];
            arr.push(seatNum);

            setBookedSeat(arr);
        }
    
        setTestText(seatNum);
    }

    function ClearSeats() {
        setBookedSeat([]);
    }

    function Confirm() {
        navigate('/pay', { state : {id : screenID, seats : bookedSeat, adult : adult, child : child, fee : fee, title : title, theater : theater, time : time}});
    }

    useEffect(() => {
        loadScreeningData();
      }, [location.state, location.state.id])

    return(
        <div className='fullHeight'>
            <MovieNavbar />
            <h3>Title : {title}, Theater : {theater}, Date-Time : {time}</h3>
            <Row>
                <Col xs={12} md={8} style={{height: '500px'}}>
                    <Container style={{margin:'30px'}}>
                        <span style={{margin: '10px'}}><button onClick={() => AdultChange(-1)}>-</button>Adult : {adult} <button onClick={() => AdultChange(1)}>+</button></span>
                        <span style={{margin: '10px'}}><button onClick={() => ChildChange(-1)}>-</button>Child :  {child}<button onClick={() => ChildChange(1)}>+</button></span>
                        <span style={{margin: '10px'}}>Select Seats : {bookedSeat.length}</span>
                        <span style={{margin: '10px'}}>Select Text : {testText}</span>
                        <span><button onClick={ClearSeats}>Clear</button></span>
                    </Container>
                    
                    <Container className="d-flex align-items-center" style={{background:'grey',textAlign: 'center', height:'100px', width: '500px'}} >
                        <h1 className="mx-auto">SCREEN</h1>
                    </Container>
                    <Container style={{width: '500px'}}>
                        {
                            rowArr.map((row, rowIndex) => {
                                return (
                                <Row key={rowIndex} style={{margin: '20px'}}>
                                    {
                                        colArr.map((col, colIndex) => {
                                            let seatID = row + col;
                                            return (
                                                <Col key={colIndex}><SeatBox seatNum={seatID} onClick={ClickSeat} isClicked={bookedSeat.includes(seatID)}/></Col>
                                            )
                                        })
                                    }
                                </Row>
                                )
                            })
                        }
                    </Container>
                </Col>
                <Col xs={6} md={4} style={{background:'white', color:'black'}}>
                    <div><h3>Adult : {adult}</h3></div>
                    <div><h3>Child : {child}</h3></div>
                    <hr/>
                    <h1>Total : {adult + child}</h1>
                    <h1>Cost : {fee}</h1>
                    <hr /> 
                    <span>Seats : </span>
                    {
                        bookedSeat.map((a, i) => {
                            return (
                                <span key={i}>{a} </span>
                            )
                        })
                    }
                    <div>
                        <Button variant="primary" size='lg' onClick={Confirm}>Confirm</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
};

export default SelectSeats;