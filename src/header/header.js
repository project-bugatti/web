import React from 'react';
import { Link } from 'react-router-dom'
import {FaChevronRight, FaComment, FaRegImage, FaUser} from 'react-icons/fa';

const Header = () => {
  const navbarItems = [
    {
      route: '/',
      title: 'media',
      icon: <FaRegImage/>
    },
    {
      route: '/quotes',
      title: 'quotes',
      icon: <FaComment/>
    },
    {
      route: '/members',
      title: 'members',
      icon: <FaUser/>
    }
  ];

  return (
    <nav className="bg-grey-lightest">

      { /* Title - The GC */ }
      <div className="flex justify-center pt-4">
        <Link to="/media" className="no-underline">
          <div>
            <span className="font-sans text-grey-darkest text-2xl font-semibold">The GC</span>
            <span className="text-sm text-grey-dark px-0"><FaChevronRight/></span>
          </div>
        </Link>
      </div>

      {/* Navbar Items */}
      <div className="flex justify-center py-4">
        {
          navbarItems.map( (item) =>
            <Link to={item.route} key={item.title} className="w-32 text-center text-grey-dark no-underline text-base hover:text-grey-darker">
              <div className="flex flex-col items-center font-sans">
                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-grey text-grey-lightest mb-1">
                  {item.icon}
                </div>
                <p>{item.title}</p>
              </div>
            </Link>
          )
        }
      </div>
    </nav>
  )
};

export default Header;