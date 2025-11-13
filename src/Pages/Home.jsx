import React from 'react';
import RecentTips from '../Components/RecentTips';
import UpcomingEvents from '../Components/UpcomingEvents';
import WhyGoGreen from '../Components/WhySoGreen';
import HowItWorks from '../Components/HowItWorks';
import Hero from '../Components/Hero/Hero';

const Home = () => {
    return (
        <div className='flex flex-col gap-8'>
            <Hero/>
            <WhyGoGreen/>
            <HowItWorks/>
            <UpcomingEvents/>
            <RecentTips/>
        </div>
    );
};

export default Home;