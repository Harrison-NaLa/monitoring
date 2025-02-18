import MainPage from '@/app/main/page';
import React from 'react';
import HomeContainer from '@/app/(home)/components_/home-container';
import SkeletonMusicCard from '@/app/components/skeletons/skeleton-music-card';

const Home = () => {
    return (
        <div className="layout_inner rounded-xl w-ful">
            <HomeContainer/>
        </div>
    )
}
export default Home;