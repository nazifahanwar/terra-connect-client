import React from 'react';
import RecentTips from '../Components/RecentTips';
import UpcomingEvents from '../Components/UpcomingEvents';
import WhyGoGreen from '../Components/WhySoGreen';

const Home = () => {
    return (
        <div className='flex flex-col gap-8'>
            <RecentTips/>
            <UpcomingEvents/>
            <WhyGoGreen/>
        </div>
    );
};

export default Home;