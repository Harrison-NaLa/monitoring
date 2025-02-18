import React from 'react';
import Image from 'next/image';
import {Button, Text} from '@radix-ui/themes';
import {Play} from 'lucide-react';
import {SpotifyTrackItem} from '@/types';

const SpotifyCard = ({name, url}: { name: string, url: string }) => {
    return (
        <div className="sp_card w-[196px] h-[248px] min-w-[196px] flex flex-col p-3 gap-2 rounded-md relative cursor-pointer">
            <Image
                src={url}
                alt="panel"
                width={154}
                height={154}
                className="self-center w-full bg-green-100 rounded-md"
            />
            <Text as="p" className="text-gray-50 ">
                {name}
            </Text>
            <div className='play_overlay flex justify-end cursor-pointer rounded-md size-full absolute'>
                <Button radius='full' variant='solid' className='color_green sp_card_play grid padding-0 mr-4 size-[40px]'>
                    <Play fill='black'  />
                </Button>
            </div>
        </div>
    )
}

export default SpotifyCard;