import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';
import PrivateRoute from './components/PrivateRoute';
import RoomList from './components/RoomList';
import AppNavbar from './components/Navbar';

function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<ReservationForm />} />

        {/* Protected Routes */}
        <Route 
          path="/admin/reservations" 
          element={
            <PrivateRoute>
              <ReservationList />
            </PrivateRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;