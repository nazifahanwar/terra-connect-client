import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/icons8-sustainability-64.png'
import  './Navbar.css'
import userIcon from '../../assets/userIcon.png'
import { AuthContext } from '../../AuthContext/AuthContext';
import { MdMenu } from 'react-icons/md';
import { CiMenuFries } from 'react-icons/ci';
import { toast } from 'sonner';

const Navbar = () => {
  const {user,logOut} = use(AuthContext)
const links =
    <>
    <li><NavLink className='text-white font-semibold' to='/'>Home</NavLink></li>
    <li><NavLink className='text-white font-semibold' to='/challenges'>Challenges</NavLink></li>
    <li><NavLink className='text-white font-semibold' to='/my-activities'>My Activities</NavLink></li>
    </>
const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("You Logged Out successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  
    return (
      <div> 
      <div className='bg-base-300 shadow-sm'>
  <div className='container mx-auto'>
        <div className="navbar">
    <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost  lg:hidden bg-transparent text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm bg-base-300 dropdown-content  rounded-box z-999 mt-3 w-52 p-2 shadow">
        {links}
        {user && 
        <li><button onClick={handleLogOut} className="font-semibold text-white">Log Out</button></li>}
      </ul>
    </div>
    <div className='flex items-center justify-center lg:gap-1'>
        <img src={logo} alt='logo' referrerPolicy="no-referrer" className="h-[40px] w-[40px]" />
    <Link className="mb-2 text-2xl text-white pt-2 font-medium">Terra Connect</Link>

    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <div className='flex'>
        {links}
    </div>
    </ul>
  </div>
  <div className="navbar-end">
     {user ?  (
    <div className="dropdown dropdown-end flex bg-transparent">
      <div className='flex flex-col items-center '>
        <img className="w-10 rounded-full border-2 border-white" referrerPolicy="no-referrer" src={user.photoURL || userIcon} alt='user photo'/>
      </div>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar max-lg:hidden">
        <CiMenuFries className=" text-white text-2xl rounded-full"/>
        
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm bg-base-300 dropdown-content  rounded-box z-9999 mt-3 w-40 p-2 shadow"
      >
        <li>
          <a className="font-semibold text-white">{user.displayName}</a>
        </li>
        <li>
          <button onClick={handleLogOut} className="font-semibold text-red-500">
            Log Out
          </button>
        </li>
      </ul>
    </div>
  ):(

<div><Link to='/register' className=' text-white font-semibold rounded-xl p-2 hover:border-gray-400 hover:border-2' >Register</Link>
    <Link to='/login'className='rounded-xl p-2 bg-white ml-3 text-[#344e41] font-semibold'>Log In</Link></div>)
}   
    </div>
  </div>
  </div>
</div>
 </div>
    )        
};

export default Navbar;