'use client';
import React, {useContext} from 'react';
import {Flex, Text} from '@radix-ui/themes';
import SpotifyCard from '@/app/components/sp-card/sp-card';
import {SpotifyContext} from '@/contexts/spotify-context';
import {SpotifyResponseApi} from '@/types';
import SkeletonCardList from '@/app/components/skeletons/skeleton-card-list';

const MusicControlList = () => {
    const {datos, loading} = useContext(SpotifyContext);

    const safeList = () => {
        return (datos as SpotifyResponseApi).items ?? [];
    }

    return (
        <div className="flex flex-col items-cente max-w-full w-full px-4">
            <Text weight="bold" color="gray" className="text-2xl ml-3 mb-3">Tracks</Text>
            {
                loading
                    ? <SkeletonCardList/>
                    : <Flex gap="2" className="sp_card_container w-full overflow-y-auto">
                        {
                            safeList().map((item, index) => <SpotifyCard item={item}
                                                                                                          key={index}/>)
                        }
                    </Flex>
            }
        </div>
    );
};
export default MusicControlList;