import React from 'react';
import RecentTips from '../Components/RecentTips';
import UpcomingEvents from '../Components/UpcomingEvents';
import WhyGoGreen from '../Components/WhySoGreen';
import HowItWorks from '../Components/HowItWorks';
import Hero from '../Components/Hero/Hero';
import ActiveChallenges from '../Components/ActiveChallenges';
import CommunityStats from '../Components/CommunityStats';

const Home = () => {
    return (
        <div className='flex flex-col gap-8'>
            <Hero/>
            <WhyGoGreen/>
            <CommunityStats/>
            <HowItWorks/>
            <ActiveChallenges/>
            <UpcomingEvents/>
            <RecentTips/>
        </div>
    );
};

export default Home;