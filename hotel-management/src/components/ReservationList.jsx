import { useEffect } from 'react';
import { Table, Badge, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, cancelReservation } from '../store/reservationSlice';

const ReservationList = () => {
  const dispatch = useDispatch();
  const reservationState = useSelector((state) => state.reservations || {});
  const reservations = reservationState.data ?? [];
  const loading = reservationState.loading ?? false;

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleCancel = (id) => {
    if (!window.confirm('Cancel this reservation?')) return;
    dispatch(cancelReservation(id));
  };
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold">Reservations</h2>
          <p className="text-muted">Manage your current guest list and check-ins</p>
        </div>
        <Button variant="dark" className="mb-2">Export Data</Button>
      </div>

      <Table hover responsive className="align-middle bg-white shadow-sm rounded-3 overflow-hidden">
        <thead className="bg-light">
          <tr className="text-muted small text-uppercase">
            <th className="py-3 ps-4">Guest</th>
            <th className="py-3">Room</th>
            <th className="py-3">Stay Dates</th>
            <th className="py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                Loading reservations...
              </td>
            </tr>
          ) : reservations.length > 0 ? (
            reservations.map((res) => (
              <tr key={res.id}>
                <td className="ps-4 fw-semibold">{res.guestName}</td>
                <td>
                  <Badge bg="secondary" className="bg-opacity-10 text-secondary">
                    Room {res.roomId}
                  </Badge>
                </td>
                <td className="text-muted small">{res.checkIn} - {res.checkOut}</td>
                <td className="text-center">
                  <Button
                    variant="link"
                    className="text-danger p-0 fw-bold text-decoration-none"
                    onClick={() => handleCancel(res.id)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReservationList;