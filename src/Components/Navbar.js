import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/shopping.png';
import { FaShoppingCart } from 'react-icons/fa'; // Correct import from react-icons
import { auth } from '../Config/Config';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <div className='navbar'>
      <div className='leftside'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
      </div>
      <div className='rightside'>
        {!user && (
          <>
            <div>
              <Link className='navlink' to='/signup'>
                SING UP
              </Link>
            </div>
            <div>
              <Link className='navlink' to='/login'>
                LOGIN
              </Link>
            </div>
          </>
        )}

        {user && (
          <>
            <div>
              <Link className='navlink' to='/'>
                Hi {user}
              </Link>
            </div>
            <div className='cart-menu-btn'>
              <Link className='navlink' to='/cart'>
                <FaShoppingCart size={20} /> {/* Shopping cart icon from react-icons */}
              </Link>
            </div>
            <div className='btn btn-danger btn-md' onClick={handleLogout}>
              LOGOUT
            </div>
          </>
        )}
      </div>
    </div>
  );
};
