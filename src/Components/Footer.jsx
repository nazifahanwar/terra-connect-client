import React from 'react';
import Logo from '../assets/icons8-sustainability-64.png'
import { FaFacebook, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-base-300'>
  <footer className="footer sm:footer-horizontal text-base-content p-10 container mx-auto">
  <aside>
    <div className=''>
        <img src={Logo} alt='Logo' className="h-[80px] w-[80px]" />
    <p className='text-xl playwrite-au-tas text-white pt-2'>
            Terra Connect
    </p>

      <p className='text-white'>Together for a Sustainable Tomorrow</p>
  
    </div>
  </aside>
    <nav className='text-white'>
    <h6 className='footer-title'>Company</h6>
    <a className="link link-hover text-white">About us</a>
    <a className="link link-hover text-white">Contact</a>
    <a className="link link-hover text-white">Jobs</a>
    <a className="link link-hover text-white">Press kit</a>
  </nav>
  <nav className='text-white'>
    <h6 className="footer-title">Apps</h6>
    <a className="link link-hover">Mac</a>
    <a className="link link-hover">Windows</a>
    <a className="link link-hover">iPhone</a>
    <a className="link link-hover">Android</a>
  </nav>
  <nav className='text-white'>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover text-white">Terms of use</a>
    <a className="link link-hover text-white">Privacy policy</a>
    <a className="link link-hover text-white">Cookie policy</a>
    <a className="link link-hover text-white">Accessibility statement</a>
  </nav>
</footer>
<div className='border-t-white border-t-1 container mx-auto p-4 flex justify-between'>
  <p className='text-white text-center'>© 2025 Terra Connect. All rights reserved.</p>
  <div className='flex gap-3'>
        <a><FaInstagram className='text-2xl text-white'/></a>
    <a><FaFacebook className='text-2xl text-white'/></a>
    <a><FaPinterest className='text-2xl text-white'/></a>
    <a><FaYoutube className='text-2xl text-white'/></a>
    </div>
</div>
</div>
    );
};

export default Footer;