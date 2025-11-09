import React from 'react';
import RecentTips from '../Components/RecentTips';
import UpcomingEvents from '../Components/UpcomingEvents';

const Home = () => {
    return (
        <div className='flex flex-col gap-8'>
            <RecentTips/>
            <UpcomingEvents/>
        </div>
    );
};

export default Home;