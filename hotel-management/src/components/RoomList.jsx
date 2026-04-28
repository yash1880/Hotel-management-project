import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/roomSlice';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import RoomCard from './RoomCard';

const RoomList = () => {
  const dispatch = useDispatch();
  const { data: rooms, loading } = useSelector((state) => state.rooms);

  
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  
  const processedRooms = useMemo(() => {
    let result = [...rooms];

    
    if (filterStatus !== 'All') {
      const normalizedFilter = filterStatus.trim().toLowerCase();
      result = result.filter(room => String(room.status || '').trim().toLowerCase() === normalizedFilter);
    }

    
    if (filterType !== 'All') {
      const normalizedType = filterType.trim().toLowerCase();
      result = result.filter(room => String(room.type || '').trim().toLowerCase() === normalizedType);
    }

    
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'type') {
      result.sort((a, b) => a.type.localeCompare(b.type));
    }

    return result;
  }, [rooms, filterStatus, filterType, sortBy]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Room Management</h2>

      <Row className="mb-4 g-3 bg-light p-3 rounded shadow-sm">
        <Col md={3}>
          <Form.Group>
            <Form.Label className="small fw-bold">Availability</Form.Label>
            <Form.Select onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="small fw-bold">Room Type</Form.Label>
            <Form.Select onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Suite">Suite</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="small fw-bold">Sort By</Form.Label>
            <Form.Select onChange={(e) => setSortBy(e.target.value)}>
              <option value="none">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="type">Room Type (A-Z)</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {processedRooms.length > 0 ? (
          processedRooms.map((room) => (
            <Col key={room.id} md={6} lg={4} className="mb-4">
              <RoomCard room={room} />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <p className="text-muted">No rooms match your selected filters.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default RoomList;
