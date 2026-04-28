import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Hotel, List, User, LogOut, LogIn } from 'lucide-react';

const AppNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar expand="lg" sticky="top" className="shadow-sm py-3 app-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center brand-logo">
          <Hotel className="me-2" size={26} />
          <span>GRAND <span className="brand-highlight">VISTA</span></span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end className="nav-link-custom">
              Room List
            </Nav.Link>
            
            {/* Show Reservation Form Link to everyone (Guest View) */}
            <Nav.Link as={NavLink} to="/book/101" className="btn btn-outline-light rounded-pill px-4 ms-2 nav-button-link">
              Book a Room
            </Nav.Link>

            {/* Admin-only Links */}
            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/admin/reservations" className="nav-link-custom d-flex align-items-center">
                
                Manage Bookings
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center">
            {isAuthenticated ? (
              <>
                {/* User Profile Dropdown */}
                <NavDropdown 
                  title={<span><User size={18} className="me-1" /> {user?.name || 'Staff'}</span>} 
                  id="user-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/profile">Profile Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    <LogOut size={16} className="me-2" />
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button 
                variant="outline-light" 
                size="sm" 
                as={Link} 
                to="/login"
                className="d-flex align-items-center login-button"
              >
                <LogIn size={16} className="me-2" />
                Staff Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;