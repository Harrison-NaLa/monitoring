import React from 'react';
import SkeletonMusicCard from '@/app/components/skeletons/skeleton-music-card';
import {Flex} from '@radix-ui/themes';

const SkeletonCardList = () => {
    return (
        <Flex gap="2" className="sp_card_container w-full overflow-y-auto">
        {
                Array.from({length: 10}).map((_, index) => (
                    <SkeletonMusicCard key={index}/>
                ))
            }
        </Flex>
    );
};

export default SkeletonCardList;