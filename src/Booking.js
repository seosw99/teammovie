import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getScreeningData } from './getScreeningData';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MovieNavbar from './MovieNavbar';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function Booking() {

  let [screeningData, setScreeningData] = useState([]);

  let [filteredData, setFilteredData] = useState([]);

  let movies = useSelector((state) => state.movies);

  let navigate = useNavigate();

  let {id} = useParams();

  let location = useLocation();

  function filterMovie() {
    let result = screeningData.filter((screenInfo) => {
        return screenInfo.title.includes(selMovie) 
        && screenInfo.time.includes(selDate) 
        && screenInfo.theater.includes(selTheater);
    });
    setFilteredData(result);
  }

  // 영화관 종류 저장하는 state
  let [theaters, setTheaters] = useState([]);

  const loadScreeningData = async() => {
    let res = await getScreeningData();
    setScreeningData(res);
    initMovie();
  };



  // 선택한 영화를 저장하는 state
  let [selMovie, setSelMovie] = useState('');

  // 선택한 영화관을 저장하는 state
  let [selTheater, setSelTheater] = useState('');

  // 선택한 날짜를 저장하는 state
  let [selDate, setSelDate] = useState('');

  function chooseMovie(e) {
    setSelMovie(
      (selMovie == e.target.textContent) ?
      "":
      e.target.textContent
    )
  }

  function chooseTheater(e) {
    setSelTheater(
      (selTheater == e.target.textContent) ?
      "":
      e.target.textContent
    )
  }

  function chooseDate(e) {
    setSelDate(
      (selDate == e.target.textContent) ?
      "":
      e.target.textContent
    )
  }
  
  function booking(id) {
     const bookInfo = window.confirm('예약하시겠습니까?');

     if (bookInfo) {
        navigate('/selectseats', {state : {id}});
     }
  }

  // Movie 컴포넌트에 있는 예매 버튼을 누르고 왔을 때 처음 그 영화를 선택해 주는 함수..
  function initMovie() {
    if (location.state != null)
    {
      setSelMovie(location.state.movie.title);
    }
  }

  useEffect(() => {
    loadScreeningData();
  }, [location.state])

  useEffect(() => {
    filterMovie();
  }, [selMovie, selTheater, selDate]);



  return (
    <>
      <MovieNavbar />
      <h1 style={{ marginBottom : '30px'}}>Booking Page</h1>
      <Container className='border'>
        <Row className='border'>
          <Col xs={3} md={2} style={{ height : '100px'}} className='border'>{screeningData.length}, Movie : {selMovie}, Theater : {selTheater}, Date : {selDate}</Col>
          <Col xs={15} md={10} className='border'>
            {
              <div>
                <span style={{marginRight : '20px'}} onClick={chooseDate}>2023-12-12</span><span style={{marginRight : '20px'}} onClick={chooseDate}>2023-12-13</span><span onClick={chooseDate}>2023-12-14</span>
              </div>
            }
          </Col>
        </Row>
        <Row className='border'>
          <Col className='border'>Movies</Col>
          <Col className='border'>Theaters</Col>
          <Col className='border'>Total : {filteredData.length}</Col>
        </Row>
        <Row className='border'>
          <Col className='border'>
            {
              movies.length != 0 ? movies.map((a, i) => {
                return (
                  <h6 onClick={chooseMovie} key={i}>{a.title}</h6>
                )
              }) : <span>상영 정보 로딩중..</span>
            }
          </Col>
          <Col className='border'>
            {
              <div>
                <h6 onClick={chooseTheater}>E-Gong Gwan</h6>
                <h6 onClick={chooseTheater}>Simjeon Gwan</h6>
                <h6 onClick={chooseTheater}>Shalom Gwan</h6>
              </div>
              
            }
          </Col>
          <Col className='border' style={{height : '300px', overflowY : 'auto'}}>
            {
              filteredData.map((a, i) => {
                return (
                  <div key={i}>
                    <div onClick={()=>booking(a.id)}><button>{a.title} : {a.theater} : {a.time.substring(11, 24)}</button></div>
                  </div>
                )
              })
            }
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Booking;