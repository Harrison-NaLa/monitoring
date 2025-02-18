import {Flex, Skeleton} from '@radix-ui/themes';


const SkeletonMusicCard = () => {
    return (
        <Flex direction='column' className="flex flex-col gap-2 items-start justify-start w-[196px] h-[248px]">
            <Skeleton width="172px" height="144px">Loading</Skeleton>
            <Skeleton width="172px" height="14px">...</Skeleton>
            <Skeleton width="120px" height="14px">...</Skeleton>
        </Flex>
    );
};

export default SkeletonMusicCard;