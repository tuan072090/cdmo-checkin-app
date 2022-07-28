import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
    Camera,
    CameraDeviceFormat,
    CameraPermissionStatus, CameraRuntimeError, FrameProcessorPerformanceSuggestion, frameRateIncluded, PhotoFile,
    sortFormats,
    useCameraDevices, useFrameProcessor, VideoFile,
} from 'react-native-vision-camera';
import {PinchGestureHandler, PinchGestureHandlerGestureEvent, TapGestureHandler} from 'react-native-gesture-handler';
import {Box, Button, Pressable, Spinner} from 'native-base';
import {Typo} from '@/components/atoms/typo';
import {Linking, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import Reanimated, {
    Extrapolate,
    interpolate,
    useAnimatedGestureHandler,
    useAnimatedProps,
    useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {CaptureButton} from '@/screens/camera/components/CaptureButton';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
    zoom: true,
});
const MAX_ZOOM_FACTOR = 20;
const SCALE_FULL_ZOOM = 3;

const CameraScreen: React.FC = () => {
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
    const [loading, setLoading] = useState(false);
    const camera = useRef<Camera>(null);
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const navigation = useNavigation();
    const zoom = useSharedValue(0);
    const isPressingButton = useSharedValue(false);

    // check if camera page is active
    const isFocussed = useIsFocused();

    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const [enableHdr, setEnableHdr] = useState(false);
    const [flash, setFlash] = useState<'off' | 'on'>('off');
    const [enableNightMode, setEnableNightMode] = useState(false);

    // camera format settings
    const devices = useCameraDevices();
    const device = devices[cameraPosition];
    const supportsFlash = device?.hasFlash ?? false;
    const formats = useMemo<CameraDeviceFormat[]>(() => {
        if (device?.formats == null) {
            return [];
        }
        return device.formats.sort(sortFormats);
    }, [device?.formats]);

    //#region Animated Zoom
    // This just maps the zoom factor to a percentage value.
    // so e.g. for [min, neutr., max] values [1, 2, 128] this would result in [0, 0.0081, 1]
    const minZoom = device?.minZoom ?? 1;
    const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

    const cameraAnimatedProps = useAnimatedProps(() => {
        const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);
        return {
            zoom: z,
        };
    }, [maxZoom, minZoom, zoom]);
    //#endregion

    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermission);
    }, []);

    //#region Memos
    const [is60Fps, setIs60Fps] = useState(true);
    const fps = useMemo(() => {
        if (!is60Fps) {
            return 30;
        }

        if (enableNightMode && !device?.supportsLowLightBoost) {
            // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
            return 30;
        }

        const supportsHdrAt60Fps = formats.some((f) => f.supportsVideoHDR && f.frameRateRanges.some((r) => frameRateIncluded(r, 60)));
        if (enableHdr && !supportsHdrAt60Fps) {
            // User has enabled HDR, but HDR is not supported at 60 FPS.
            return 30;
        }

        const supports60Fps = formats.some((f) => f.frameRateRanges.some((r) => frameRateIncluded(r, 60)));
        if (!supports60Fps) {
            // 60 FPS is not supported by any format.
            return 30;
        }
        // If nothing blocks us from using it, we default to 60 FPS.
        return 60;
    }, [device?.supportsLowLightBoost, enableHdr, enableNightMode, formats, is60Fps]);

    const format = useMemo(() => {
        let result = formats;
        if (enableHdr) {
            // We only filter by HDR capable formats if HDR is set to true.
            // Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
            result = result.filter((f) => f.supportsVideoHDR || f.supportsPhotoHDR);
        }

        // find the first format that includes the given FPS
        return result.find((f) => f.frameRateRanges.some((r) => frameRateIncluded(r, fps)));
    }, [formats, fps, enableHdr]);

    const requestCameraPermission = useCallback(async () => {
        setLoading(true);
        console.log('Requesting camera permission...');
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);

        if (permission === 'denied') {
            await Linking.openSettings();
        }
        setCameraPermission(permission);
        setLoading(false);
    }, []);

    //#region Callbacks
    const setIsPressingButton = useCallback(
        (_isPressingButton: boolean) => {
            isPressingButton.value = _isPressingButton;
        },
        [isPressingButton],
    );
    // Camera callbacks
    const onError = useCallback((error: CameraRuntimeError) => {
        console.error(error);
    }, []);

    const onInitialized = useCallback(() => {
        console.log('Camera initialized!');
        setIsCameraInitialized(true);
    }, []);

    const onMediaCaptured = useCallback(
        (media: PhotoFile, type: 'photo' | 'video') => {
            console.log("media type", type)
            const {path: imagePath, width, height} = media

            console.log("imagePath...", imagePath)
            console.log("image width...", width)
            console.log("image height...", height)
        },
        [navigation],
    );

    const onFlipCameraPressed = useCallback(() => {
        setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
    }, []);

    const onFlashPressed = useCallback(() => {
        setFlash((f) => (f === 'off' ? 'on' : 'off'));
    }, []);
    //#endregion

    //#region Pinch to Zoom Gesture
    // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
    // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
    const onPinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, { startZoom?: number }>({
        onStart: (_, context) => {
            context.startZoom = zoom.value;
        },
        onActive: (event, context) => {
            // we're trying to map the scale gesture to a linear zoom here
            const startZoom = context.startZoom ?? 0;
            const scale = interpolate(event.scale, [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM], [-1, 0, 1], Extrapolate.CLAMP);
            zoom.value = interpolate(scale, [-1, 0, 1], [minZoom, startZoom, maxZoom], Extrapolate.CLAMP);
        },
    });
    //#endregion
    const frameProcessor = useFrameProcessor((frame) => {
        'worklet';
    }, []);

    const onFrameProcessorSuggestionAvailable = useCallback((suggestion: FrameProcessorPerformanceSuggestion) => {
        console.log(`Suggestion available! ${suggestion.type}: Can do ${suggestion.suggestedFrameProcessorFps} FPS`);
    }, []);

    if (!cameraPermission || cameraPermission !== 'authorized') {
        return (
            <Box flex={1} alignItems="center" p={5}>
                <Typo type="caption">Bạn vui lòng cấp quyền truy cập Camera</Typo>
                <Button mt={3} onPress={requestCameraPermission}>
                    {loading ? <Spinner color="white"/> : 'Cấp quyền'}
                </Button>
            </Box>
        );
    }

    return (
        <Box flex={1} alignItems="center" position="relative">
            {device != null && (
                <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={isFocussed}>
                    <Reanimated.View style={StyleSheet.absoluteFill}>
                        <TapGestureHandler numberOfTaps={1}>
                            <ReanimatedCamera
                                ref={camera}
                                style={StyleSheet.absoluteFill}
                                device={device}
                                format={format}
                                fps={fps}
                                hdr={enableHdr}
                                lowLightBoost={device.supportsLowLightBoost && enableNightMode}
                                isActive={isFocussed}
                                onInitialized={onInitialized}
                                onError={onError}
                                enableZoomGesture={false}
                                animatedProps={cameraAnimatedProps}
                                photo={true}
                                video={false}
                                audio={false}
                                frameProcessor={device.supportsParallelVideoProcessing ? frameProcessor : undefined}
                                orientation="portrait"
                                frameProcessorFps={1}
                                onFrameProcessorPerformanceSuggestionAvailable={onFrameProcessorSuggestionAvailable}
                            />
                        </TapGestureHandler>
                    </Reanimated.View>
                </PinchGestureHandler>
            )}

            <CaptureButton
                style={styles.captureButton}
                camera={camera}
                onMediaCaptured={onMediaCaptured}
                cameraZoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                flash={supportsFlash ? flash : 'off'}
                enabled={isCameraInitialized && isFocussed}
                setIsPressingButton={setIsPressingButton}
            />

            <Box style={styles.rightButtonRow}>
                {supportsFlash && (
                    <Pressable style={styles.button} onPress={onFlashPressed}>
                        <FeatherIcon name={flash === 'on' ? 'zap' : 'zap-off'} color="white" size={24} />
                    </Pressable>
                )}
            </Box>
        </Box>
    );
};

export default CameraScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    captureButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20,
    },
    rightButtonRow: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    text: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        marginBottom: 15,
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
