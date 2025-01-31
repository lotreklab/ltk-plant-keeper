import * as FileSystem from 'expo-file-system';

async function convertToBase64(uri: string): Promise<string | null> {
    try {
      // Verifica se l'URI è un file
      if (!uri.startsWith('file://')) {
        throw new Error('Invalid file URI');
      }
  
      // Legge il contenuto del file e lo converte in base64
      return await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  }
  



export default convertToBase64;