import { Text } from "native-base";
import React, { useEffect } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";

const CamaraDevice = () => {
    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back;
  console.log("devices", devices);
  const openCamara = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      const microphonePermission = await Camera.getMicrophonePermissionStatus();

      console.log("cameraPermission", cameraPermission);
      console.log("microphonePermission", microphonePermission);
    } catch (err) {
      console.log("openCamara err", err);
    }
  };
  useEffect(() => {
    openCamara();
  }, []);
  return (
    <Text>test camara</Text>
    // <Camera
    //   //  style={StyleSheet.absoluteFill}
    //   device={device}
    //   isActive={true}
    // />
  );
};

export default CamaraDevice;
