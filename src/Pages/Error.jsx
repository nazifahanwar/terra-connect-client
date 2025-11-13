import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='min-h-screen'>
           <main class="grid min-h-full place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
  <div class="text-center">
    <p class="text-base font-semibold text-white">404</p>
    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Page not found</h1>
    <p class="mt-6 text-lg font-medium text-pretty text-white sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
<Link to='/'>      <a href="#" class="rounded-md bg-base-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Go back home</a></Link>
      
    </div>
  </div>
</main>
 
        </div>
    );
};

export default Error;