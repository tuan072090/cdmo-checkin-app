import React, {useEffect, useRef, useState} from 'react';
import {Box, Spinner} from 'native-base';
import {Typo} from '@/components/atoms/typo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PressBox from '@/components/atoms/press-box';
import {Alert, StyleSheet, PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

type CameraCpnProps = {
    closeCamera: () => void,
    onPhotoChange: (path:string) => void
}
const CameraCpn: React.FC<CameraCpnProps> = ({closeCamera, onPhotoChange}) => {
    const [isActive, setIsActive] = useState(true)

    useEffect(() => {
        setTimeout(function(){
            requestCameraPermission()
        },500)
    }, [])

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message:"App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                _openCamera()
            } else {
                Alert.alert("Bạn đã từ chối truy cập Camera")
            }
        } catch (err) {
            Alert.alert("Không lấy được quyền truy cập Camera")
        }
    };

    const _openCamera = async () => {
        await launchCamera({
            mediaType: 'photo',
            maxWidth: 2048,
            cameraType: 'back',
            saveToPhotos: true
        }, function(data) {
            const {assets} = data
            console.log("assets....", assets)
            if(assets){
                const photo = assets[0]
                if(photo.fileSize &&  photo.fileSize > 5120000){
                    Alert.alert("Dung lượng hình vượt quá 5M")
                    return;
                }
                if(photo.uri) onPhotoChange(photo.uri)
                closeCamera()
            }
        })
    }

    const _uploadPhoto = async () => {
        await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 3
        }, function (data) {
            const {assets} = data

            assets?.forEach((item) => {
                if(item.fileSize &&  item.fileSize > 5120000){
                    Alert.alert("Dung lượng hình vượt quá 5M")
                    return;
                }
                if(item.uri) onPhotoChange(item.uri)
            })
            closeCamera()
        })
    }


    return (
        <Box flex={1} position="relative" backgroundColor="black" justifyContent="center" alignItems="center">
            <PressBox onPress={closeCamera}
                      zIndex={2}
                      shadow={1}
                      style={styles.button}
                      position="absolute"
                      top={5} left={3}
            >
                <FeatherIcon name="x" size={25}/>
            </PressBox>

            <Typo type="body16" color="white" textAlign="center">Chụp hình mới hoặc chọn hình có sẵn từ máy</Typo>


            <PressBox onPress={_uploadPhoto}
                      zIndex={2}
                      shadow={1}
                      style={styles.button}
                      position="absolute"
                      bottom={3} left={4}
            >
                <FeatherIcon name="image" size={25}/>
            </PressBox>

            <PressBox onPress={_openCamera}
                      zIndex={2}
                      shadow={1}
                      style={styles.button}
                      position="absolute"
                      bottom={3}
            >
                <FeatherIcon name={isActive ? "camera" : 'refresh-ccw'} size={25}/>
            </PressBox>
        </Box>
    );
};

export default CameraCpn;

const styles = StyleSheet.create({
    button: {
        width: 46,
        height: 46,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'rgba(255,255,255,1)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
