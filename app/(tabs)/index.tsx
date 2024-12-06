import React, { useRef, useState } from 'react';
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
    image: require('@/assets/images/react-logo.png'),
    title: 'Welcome to MyApp',
    description: 'Discover how our app makes your life easier.',
  },
  {
    id: '2',
    image: require('@/assets/images/react-logo.png'),
    title: 'Track Your Progress',
    description: 'Keep an eye on your achievements and goals.',
  },
  {
    id: '3',
    image: require('@/assets/images/react-logo.png'),
    title: 'Get Started Today',
    description: 'Start exploring and enjoy the benefits!',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const flatListRef = useRef<FlatList<Step>>(null);

  const handleNext = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentStep + 1 });
      setCurrentStep((prev) => prev + 1);
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
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
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
        <SafeAreaView style={styles.buttonContainer}>
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
  stepContainer: {
    width: width,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
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
    paddingVertical: 10,
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
