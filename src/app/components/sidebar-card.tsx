import {Box, Button, Card, Text} from '@radix-ui/themes';
import React from 'react';

const SidebarCard = () => {
    return (
        <Box>
            <Card className='gap-3 grid h-fit w-full'>
                    <Text as="p" size="4" weight="bold" color="gray">
                        Crea tu primera playlist
                    </Text>
                    <Text as="p" size="2" color="gray">
                        ¡Es muy fácil! Te vamos a ayudar
                    </Text>
                    <Button variant='solid' color='grass' radius='full' className='w-fit'>
                        Crear playlist
                    </Button>
            </Card>
        </Box>
    )
}

export default SidebarCard;