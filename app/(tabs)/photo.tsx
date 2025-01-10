import { CameraView, CameraType, FlashMode, useCameraPermissions, launchImageLibraryAsync } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//TODO: 
// far funzionare il flash, 
// aggiungere pulsante per inviare foto scattata e redirect alla pagina di informazioni,
// far funzionare l'accesso alla galleria e la scelta della foto da inviare

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlash() {
    setFlash((current) => (current === 'off' ? 'on' : 'off'));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          flashMode: flash,
        });
        setSelectedImage(photo.uri);
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  }

  async function openGallery() {
    const result = await launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <View style={styles.fullscreenContainer}>
          {/* Visualizzazione dell'immagine */}
          <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />
          {/* Pulsante per chiudere */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Ionicons name="close-circle" size={50} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} flashMode={flash}>
          {/* Pulsante per il flash */}
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <Ionicons
              name={flash === 'off' ? 'flash-off' : 'flash'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            {/* Anteprima della galleria */}
            <TouchableOpacity style={styles.galleryPreview} onPress={openGallery}>
              <View style={styles.placeholder} />
            </TouchableOpacity>
  
            {/* Pulsante per scattare la foto */}
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <View style={styles.captureCircle} />
            </TouchableOpacity>
  
            {/* Pulsante per cambiare la fotocamera */}
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  fullscreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  camera: {
    flex: 1,
  },
  flashButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  galleryPreview: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  placeholder: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  captureButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  flipButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
