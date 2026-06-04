import React, { useState } from 'react';
import { FaBookmark, FaCaretDown } from 'react-icons/fa';
import './Navbar.css';
import WatchlistModal from '../../othercomponents/WatchlistModal';
import { signOut } from 'firebase/auth';
import { auth } from '../../../fireBase';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <div className='navBar'>

        <img
          className='logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'
          alt='netflix'
        />

        <div className='rightSection'>

          <FaBookmark
            className='savedIcon'
            onClick={() => setOpen(true)}
            style={{ cursor: 'pointer' }}
          />

          <div className='profileContainer'>
            <img
              className='avatar'
              src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
              alt='Profile'
            />
            <FaCaretDown className='caretIcon' />
            
            <div className='dropdownMenu'>
              <div className='dropdownCaret'></div>
              <ul className='dropdownList'>
                <li className='dropdownItem'>
                  <img
                    className='dropdownAvatar'
                    src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                    alt='Kids Profile'
                  />
                  <span>Kids</span>
                </li>
                <li className='dropdownItem'>
                  <span>Manage Profiles</span>
                </li>
                <li className='dropdownItem'>
                  <span>Account</span>
                </li>
                <li className='dropdownItem'>
                  <span>Help Center</span>
                </li>
                <hr className='dropdownDivider' />
                <li className='dropdownItem signoutBtn' onClick={handleLogout}>
                  <span>Sign out of Netflix</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
      {open && <WatchlistModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default Navbar;

