import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addReservation } from '../store/reservationSlice';
import { fetchRooms } from '../store/roomSlice';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

const ReservationForm = () => {
  const { id } = useParams(); // Get room ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const rooms = useSelector((state) => state.rooms.data ?? []);
  const roomFromStore = rooms.find((r) => String(r.id) === String(id));
  const [selectedRoomId, setSelectedRoomId] = useState(id || (rooms[0] && String(rooms[0].id)));
  const [room, setRoom] = useState(roomFromStore);
  const [roomLoading, setRoomLoading] = useState(!roomFromStore);

  // Local state for form fields
  const [formData, setFormData] = useState({
    guestName: '',
    checkIn: '',
    checkOut: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!rooms || rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [dispatch, rooms.length]);

  useEffect(() => {
    if ((!selectedRoomId || selectedRoomId === '') && rooms.length > 0) {
      setSelectedRoomId(String(rooms[0].id));
    }
  }, [rooms, selectedRoomId]);

  useEffect(() => {
    if (roomFromStore) {
      setRoom(roomFromStore);
      setRoomLoading(false);
      return;
    }

    if (!selectedRoomId) {
      return;
    }

    setRoomLoading(true);
    fetch(`http://localhost:5000/rooms/${selectedRoomId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Room not found');
        return res.json();
      })
      .then((data) => {
        setRoom(data);
        setRoomLoading(false);
      })
      .catch(() => {
        setRoom(null);
        setRoomLoading(false);
      });
  }, [selectedRoomId, roomFromStore]);

  const handleRoomSelect = (e) => {
    setSelectedRoomId(e.target.value);
  };

  // Implement the makeReservation function
  const makeReservation = (e) => {
    e.preventDefault();

    const reservationData = {
      ...formData,
      roomId: selectedRoomId,
      roomType: room?.type,
      totalPrice: room?.price, // You could calculate nights * price here
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    // Dispatch the Redux thunk
    dispatch(addReservation(reservationData))
      .unwrap() // RTK helper to handle the promise result
      .then(() => {
        alert("Reservation successful!");
        navigate('/admin/reservations'); // Redirect to list
      })
      .catch((err) => {
        alert("Failed to save reservation: " + err);
      });
  };

  return (
    <Container className="my-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">
            Booking Details: {room?.type ? `${room.type} (Room ${id})` : `Room ${id}`}
          </h4>
          {room?.price && (
            <small className="text-white-75">
              Price: Rs {room.price}/night
            </small>
          )}
        </Card.Header>
        <Card.Body>
          {roomLoading ? (
            <div className="alert alert-info">Loading selected room details...</div>
          ) : room ? (
            <div className="mb-4 text-center">
              <img
                src={room.image}
                alt={room.type}
                className="img-fluid rounded-3 mb-3"
                style={{ maxHeight: '250px', objectFit: 'cover', width: '100%' }}
              />
            </div>
          ) : (
            <div className="alert alert-warning">
              Selected room details are not available.
            </div>
          )}
          <Form onSubmit={makeReservation}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Select Room</Form.Label>
                  <Form.Select value={selectedRoomId} onChange={handleRoomSelect} required>
                    <option value="">Choose a room</option>
                    {rooms.map((roomOption) => (
                      <option key={roomOption.id} value={roomOption.id}>
                        {`Room ${roomOption.id} — ${roomOption.type} (${roomOption.status})`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Guest Name</Form.Label>
                  <Form.Control 
                    name="guestName"
                    required 
                    type="text" 
                    placeholder="Enter guest name" 
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    name="email"
                    required 
                    type="email" 
                    placeholder="guest@example.com" 
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Check-in Date</Form.Label>
                  <Form.Control 
                    name="checkIn"
                    required 
                    type="date" 
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Check-out Date</Form.Label>
                  <Form.Control 
                    name="checkOut"
                    required 
                    type="date" 
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid gap-2 mt-4">
              <Button variant="success" type="submit" size="lg">
                Confirm Reservation
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReservationForm;