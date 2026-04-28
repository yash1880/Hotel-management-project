import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Badge, Card } from 'react-bootstrap';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
   
    fetch(`http://localhost:5000/rooms/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data));
  }, [id]);

  if (!room) return <p className="text-center mt-5">Loading room details...</p>;

  const isAvailable = String(room.status || '').trim().toLowerCase() === 'available';

  return (
    <Container className="mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        &larr; Back to Rooms
      </Button>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Room #{room.id}</h1>
            <Badge bg={isAvailable ? 'success' : 'danger'}>
              {room.status}
            </Badge>
          </div>
          <hr />
          <h3>Type: {room.type}</h3>
          <p className="lead">Price per night: <strong>Rs {room.price}</strong></p>
          <p>Description: Luxury stay with premium amenities and 24/7 service.</p>
          <Button variant="primary" size="lg" disabled={!isAvailable}>
            Book This Room
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RoomDetails;