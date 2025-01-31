import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import convertToBase64 from '@/utils/base64Utils';
import axiosClientFile from '@/api/axiosClientFile';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
        cameraRef.current = null;
      }
    };
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button style={styles.permission} onPress={requestPermission} title="Grant Permission" />
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  }

  async function createPlant(file: string) {
    setLoading(true); // Mostra il loader
    try {
      const base64String = await convertToBase64(file);
      const uploadResponse = await putPlant(base64String);
      const token = uploadResponse['access_token'];

      const infoResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(getImage(token));
        }, 10000);
      });

      console.log('File information:', infoResponse);
      return infoResponse;
    } catch (error) {
      console.error('Error in createPlant:', error);
    } finally {
      setLoading(false); // Nasconde il loader
    }
  }

  async function putPlant(imageUri: string) {
    try {
      const response = await axiosClientFile.post(
        '',
        {
          images: [`data:image/jpeg;base64,${imageUri}`],
          similar_images: true,
        },
        {
          params: {
            details: 'common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,best_light_condition,best_soil_type,common_uses,cultural_significance,toxicity,best_watering',
            language: 'en',
            async: true,
          },
        }
      );
      return response;
    } catch (error) {
      console.error('Errore:', error);
    }
  }

  async function getImage(token: string) {
    try {
      const response = await axiosClientFile.get(`/${token}`, {
        params: {
          details: 'common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,best_light_condition,best_soil_type,common_uses,cultural_significance,toxicity,best_watering',
        },
      });
      return response;
    } catch (error) {
      console.error('Errore:', error);
    }
  }

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <View style={styles.fullscreenContainer}>
          {/* Mostra il loader se loading è true */}
          {loading && (
            <View style={styles.loaderOverlay}>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}

          {/* Visualizzazione dell'immagine */}
          <Image source={{ uri: selectedImage }} style={styles.fullscreenImage} />

          {/* Pulsante per chiudere */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Ionicons name="close-circle" size={50} color="white" />
          </TouchableOpacity>

          {/* Pulsante per inviare l'immagine */}
          <TouchableOpacity style={styles.submitButton} onPress={() => createPlant(selectedImage)}>
            <Ionicons name="checkmark-circle" size={50} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} flashMode={flash}>
          {/* Pulsante per il flash */}
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <Ionicons name={flash === 'off' ? 'flash-off' : 'flash'} size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            {/* Pulsante della galleria */}
            <TouchableOpacity style={styles.galleryPreview} onPress={openGallery}>
              <Ionicons name="images" size={30} color="white" />
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
  message: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  permission: {
    backgroundColor: '#2DDA93',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%',
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
    bottom: 40,
    left: 20,
    zIndex: 10,
  },
  submitButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 10,
  },
  camera: {
    flex: 1,
  },
  flashButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
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
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
});
