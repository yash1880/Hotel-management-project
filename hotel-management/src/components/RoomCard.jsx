import { Card, Button, Badge, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const isAvailable = String(room.status || '').trim().toLowerCase() === 'available';

  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden hotel-card">
      
      <div className="ratio ratio-16x9">
        <Card.Img variant="top" src={room.image} style={{ objectFit: 'cover' }} />
      </div>
      
      <Card.Body className="p-4">
        <Stack direction="horizontal" className="justify-content-between mb-2">
          <h5 className="fw-bold mb-0">{room.type}</h5>
          
          <Badge pill bg={isAvailable ? 'success' : 'danger'} className="px-3 py-2">
            {room.status}
          </Badge>
        </Stack>
        
        <Card.Text className="text-muted small mb-4">
          Featuring high-speed Wi-Fi, premium bedding, and a private balcony with scenic views.
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <span className="fs-3 fw-bold text-dark">Rs {room.price}</span>
            <small className="text-muted">/night</small>
          </div>
          <Button
            as={Link}
            to={`/book/${room.id}`}
            variant="outline-dark"
            className="rounded-pill px-4 fw-semibold"
          >
            Book Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;