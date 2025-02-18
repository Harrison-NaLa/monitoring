'use client';
import React, {useContext} from 'react';
import {Flex, Text} from '@radix-ui/themes';
import SpotifyCard from '@/app/components/sp-card/sp-card';
import {SpotifyContext} from '@/contexts/spotify-context';
import {SpotifyAlbumItem, SpotifyResponseApi} from '@/types';
import SkeletonCardList from '@/app/components/skeletons/skeleton-card-list';
import useToastStore from '@/app/core/snack-bar.store';
import {Toast} from 'radix-ui';

const MusicControlList = () => {
    const {datos, albumsData, loading} = useContext(SpotifyContext);
    const {visible, hidden } = useToastStore();

    const safeList = () => {
        return (datos as SpotifyResponseApi).items ?? [];
    }

    const safeAlbumsList = () => {
        return (albumsData as SpotifyResponseApi<SpotifyAlbumItem[]>).items ?? [];
    }

    return (
        <div className="flex flex-col items-cente max-w-full w-full px-4">
            <Text weight="bold" color="gray" className="text-2xl ml-3 mb-3">Guardadas</Text>
            {
                loading
                    ? <SkeletonCardList/>
                    : <Flex gap="2" className="sp_card_container w-full overflow-y-auto">
                        {
                            safeList().map((item, index) => (
                                <SpotifyCard key={index} name={item.track.album.name} url={item.track.album.images[0].url}/>
                            ))
                        }
                    </Flex>
            }
            <Text weight="bold" color="gray" className="text-2xl ml-3 mb-3">Álbumes</Text>
            {
                loading
                    ? <SkeletonCardList/>
                    : <Flex gap="2" className="sp_card_container w-full overflow-y-auto">
                        {
                            safeAlbumsList().map((item, index) => (
                                <SpotifyCard key={index} name={item.album.name} url={item.album.images[0].url}/>
                            ))
                        }
                    </Flex>
            }

            <Toast.Root
                className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
                open={visible}>
                <Toast.Title className="mb-[5px] text-[15px] font-medium text-slate12 [grid-area:_title]">
                    Opción no disponible
                </Toast.Title>
                <Toast.Action
                    className="[grid-area:_action]"
                    asChild
                    altText="Goto schedule to undo"
                >
                    <button className="inline-flex h-[25px] items-center justify-center rounded bg-green2 px-2.5 text-xs font-medium leading-[25px] text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
                    onClick={() => hidden()}>
                        Salir
                    </button>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="fixed top-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
        </div>
    );
};
export default MusicControlList;