import React from 'react';
import RecentTips from '../Components/RecentTips';
import UpcomingEvents from '../Components/UpcomingEvents';
import WhyGoGreen from '../Components/WhySoGreen';
import HowItWorks from '../Components/HowItWorks';

const Home = () => {
    return (
        <div className='flex flex-col gap-8'>
            <RecentTips/>
            <UpcomingEvents/>
            <WhyGoGreen/>
            <HowItWorks/>
        </div>
    );
};

export default Home;