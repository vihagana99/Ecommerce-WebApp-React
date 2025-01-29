import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/shopping.png';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { auth } from '../Config/Config';
import { useNavigate } from 'react-router-dom';

export const Navbar = ({ user, totalProduct }) => {
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
              <Link className='navlink' to='/signup'>SING UP</Link>
            </div>
            <div>
              <Link className='navlink' to='/login'>LOGIN</Link>
            </div>
          </>
        )}

        {user && (
          <>
            <div>
            <Link className='navlink' to='/'> <FaHome size={20} /> </Link>
            </div>
            Hi {user}
            <div className='cart-menu-btn'>
            
              <Link className='navlink' to='/cart'> <FaShoppingCart size={20} /> </Link>
              <span className='cart-indicator'>{totalProduct}</span>
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
