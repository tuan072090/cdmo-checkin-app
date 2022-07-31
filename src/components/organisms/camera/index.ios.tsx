import React, {useEffect, useRef, useState} from 'react';
import {Box, Spinner} from 'native-base';
import {Typo} from '@/components/atoms/typo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PressBox from '@/components/atoms/press-box';
import {Alert, StyleSheet} from 'react-native';
import {
    Camera,
    CameraDeviceFormat,
    CameraPermissionStatus, CameraRuntimeError, FrameProcessorPerformanceSuggestion, frameRateIncluded, PhotoFile,
    sortFormats,
    useCameraDevices, useFrameProcessor, VideoFile,
} from 'react-native-vision-camera';
import {launchImageLibrary} from 'react-native-image-picker';

type CameraCpnProps = {
    closeCamera: () => void,
    onPhotoChange: (path:string) => void
}
const CameraCpn: React.FC<CameraCpnProps> = ({closeCamera, onPhotoChange}) => {
    const [isActive, setIsActive] = useState(true)
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

    const devices = useCameraDevices()
    const camera = useRef<Camera>(null);

    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermission);
    }, []);

    const _takePhone = async () => {
        try {
            if(!camera.current) return;
            if(!isActive) {
                setIsActive(true)
                return;
            }

            const photo = await camera.current.takePhoto({
                flash: 'auto',
                qualityPrioritization: 'balanced'
            })
            const {path} = photo
            onPhotoChange(path)
            _closeCamera()
        } catch (err) {
            setIsActive(false)
            // @ts-ignore
            Alert.alert(err.message)
        }
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
            _closeCamera()
        })
    }

    const _closeCamera = () => {
        setIsActive(false)
        closeCamera()
    }

    const device = devices.back
    const hasFlash = device?.hasFlash

    return (
        <Box flex={1} position="relative" backgroundColor="black" justifyContent="center" alignItems="center">
            <PressBox onPress={_closeCamera}
                      zIndex={2}
                      shadow={1}
                      style={styles.button}
                      position="absolute"
                      top={5} left={3}
            >
                <FeatherIcon name="x" size={25}/>
            </PressBox>

            {
                cameraPermission !== 'authorized' && <Typo type="caption">Không có quyền Camera</Typo>
            }

            {
                !device && <Spinner color='white'/>
            }

            {
                device && <Camera
                    ref={camera}
                    photo={true}
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={isActive}
                />
            }

            <PressBox onPress={_uploadPhoto}
                      zIndex={2}
                      shadow={1}
                      style={styles.button}
                      position="absolute"
                      bottom={3} left={4}
            >
                <FeatherIcon name="image" size={25}/>
            </PressBox>

            <PressBox onPress={_takePhone}
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
