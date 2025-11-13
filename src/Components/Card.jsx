import React from 'react';
import { Link } from 'react-router';
const ChallengeCard = ({ challenge }) => {
  const { _id, imageUrl, title, category, description, duration, participants } = challenge;

  return (
    <div className='card bg-white shadow-sm hover:scale-105 transition ease-in-out hover:border-[#22577a] hover:shadow-[0_0_10px_#22577a50]'>
      <figure className='h-40 overflow-hidden'>
        <img className='w-full object-cover bg-cover' src={imageUrl} alt={title} referrerPolicy='no-referrer' />
      </figure>
      <div className='card-body'>
        <div className='flex justify-between items-center'>
          <h2 className='card-title max-sm:text-sm hover:text-[#22577a]'>{title}</h2>
        </div>
        <p className='text-gray-600 mb-2'>{category}</p>
        <p className='text-gray-700 mb-2'>
          {description}
        </p>
        <div className='card-actions justify-between items-center mb-2'>
          <span className='text-sm text-gray-500'>Duration: {duration} days</span>
          <span className='text-sm text-gray-500'>Participants: {participants}</span>
        </div>
        <Link to={`/challenge-details/${_id}`}>
          <button className='p-2 w-full rounded-md bg-[#22577a] cursor-pointer font-medium hover:bg-secondary'>
            <p className='text-white'>View Details</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ChallengeCard;
