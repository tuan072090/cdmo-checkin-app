import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Box, Text} from 'native-base';

import {ScreenHeaderTypes} from './screenHeader.types';
import PressBox from '../../atoms/press-box';
import {ChevronLeftIcon} from '@/components/atoms/icons/CommonIcons';

const ScreenHeader: React.FC<ScreenHeaderTypes> = ({
                                                       title,
                                                       hasBackButton = true,
                                                       rightComponent,
                                                       children,
                                                       ...props
                                                   }) => {
    const navigation = useNavigation();

    return (
        <Box
            width="100%"
            flexDirection="row"
            alignContent="center"
            p={2}
            {...props}
            safeAreaTop={true}
        >
            {/* left content */}
            <Box flex={1}>
                {hasBackButton && (
                    <PressBox onPress={() => navigation.goBack()} py={3} width="100%">
                        <ChevronLeftIcon size={6}/>
                    </PressBox>
                )}
            </Box>

            {title && (
                <Text
                    flex={4}
                    numberOfLines={1}
                    textAlign="center"
                    fontSize="md"
                    fontWeight="semibold"
                    py={3}
                >
                    {title}
                </Text>
            )}

            {/* right content*/}
            <Box flex={1} justifyContent="center" alignItems="flex-end">
                {rightComponent}
            </Box>
        </Box>
    );
};

const HeaderLeft = () => {
};

export default ScreenHeader;
