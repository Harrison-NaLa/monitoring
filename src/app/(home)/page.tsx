import React from 'react';
import HomeContainer from '@/app/(home)/components_/home-container';
import {Toast} from 'radix-ui';
import useToastStore from '@/app/core/snack-bar.store';

const Home = () => {
    return (
        <div className="layout_inner rounded-xl w-ful">
            <HomeContainer/>
        </div>
    )
}
export default Home;