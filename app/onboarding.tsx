import React, { useRef, useState } from 'react';
import { useNavigation } from 'expo-router';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Ensure this is installed and imported

const { width } = Dimensions.get('window');

type Step = {
  id: string;
  image: any; // Use `string` if using remote URIs instead of `require`
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: '1',
    image: require('@/assets/images/onboard-1.png'),
    title: 'Identify Plants',
    description: 'You can identify the plants you don\'t know through your camera',
  },
  {
    id: '2',
    image: require('@/assets/images/onboard-2.png'),
    title: 'Learn Many Plants Species',
    description: 'Let\'s learn about the many plant species that exist in this world',
  },
  {
    id: '3',
    image: require('@/assets/images/onboard-3.png'),
    title: 'Read Many Articles About Plant',
    description: 'Let\'s learn more about beautiful plants and read many articles about plants and gardening',
  },
];

export default function OnBoardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const flatListRef = useRef<FlatList<Step>>(null);
  const navigation = useNavigation();

  const handleNext = () => {
    if (flatListRef.current && currentStep < steps.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentStep + 1 });
      setCurrentStep((prev) => prev + 1);
    }
    if (currentStep == steps.length - 1) {
      navigation.navigate('homepage' as never);
    }
  };

  const renderStep = ({ item }: { item: Step }) => (
    <View style={styles.stepContainer}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {steps.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentStep === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerinner} edges={['top', 'left', 'right']}>
        <FlatList
          data={steps}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderStep}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / width
            );
            setCurrentStep(index);
          }}
          ref={flatListRef}
        />
        {renderDots()}
        <SafeAreaView>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'GET STARTED' : 'NEXT'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerinner: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '15%',
    marginBottom: '10%',
  },
  stepContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 60,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 23,
  },
  description: {
    fontSize: 16,
    color: '#6A6F7D',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#DBDBDB',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2DDA93',
  },
  nextButton: {
    backgroundColor: '#2DDA93',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
