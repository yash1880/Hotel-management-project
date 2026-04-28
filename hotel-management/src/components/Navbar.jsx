import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Hotel, User, LogOut, LogIn } from 'lucide-react';

const AppNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar 
      expand="lg" 
      sticky="top" 
      variant="dark" 
      className="app-navbar"
     
      style={{ backgroundColor: '#0f172a', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Container className="d-flex align-items-center justify-content-between">
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center brand-logo" style={{ color: 'white' }}>
          <Hotel className="me-2" size={26} style={{ color: '#22c55e' }} />
          <span>GRAND <span style={{ color: '#22c55e' }}>VISTA</span></span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end className="nav-link-custom text-white mx-2">
              Room List
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/book/101" className="nav-link-custom text-white mx-2">
              Book a Room
            </Nav.Link>

            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/admin/reservations" className="nav-link-custom text-white mx-2">
                Manage Bookings
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center">
            {isAuthenticated ? (
              <NavDropdown 
                title={<span className="text-white"><User size={18} className="me-1" /> {user?.name || 'Staff'}</span>} 
                id="user-dropdown"
                menuVariant="dark"
              >
                <NavDropdown.Item as={Link} to="/profile">Profile Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <LogOut size={16} className="me-2" /> Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button 
                variant="outline-light" 
                as={Link} 
                to="/login"
                className="d-flex align-items-center"
                style={{ borderRadius: '50px', padding: '8px 20px', color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
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
