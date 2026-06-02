import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import './Navbar.css';
import WatchlistModal from '../../othercomponents/WatchlistModal';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

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

          <img
            className='avatar'
            src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
            alt=''
          />

        </div>

      </div>
      {open && <WatchlistModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default Navbar;
