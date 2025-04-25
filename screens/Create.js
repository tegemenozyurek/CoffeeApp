import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');
// Calculate sizes based on screen dimensions
const SCREEN_PADDING = width * 0.04;
const CIRCLE_SIZE = width < 380 ? width * 0.25 : width * 0.28; // Smaller circles on small screens
const FONT_SCALE = Math.min(width / 400, height / 800); // Responsive font scaling

const CreateScreen = () => {
  const [step, setStep] = useState('temperature');
  const [selection, setSelection] = useState({ 
    temperature: null, 
    origin: null, 
    milk: null, 
    sweetener: null 
  });

  const handleTemperatureSelect = (temp) => {
    setSelection(prev => ({ ...prev, temperature: temp }));
    setStep('origin');
  };

  const handleOriginSelect = (origin) => {
    setSelection(prev => ({ ...prev, origin }));
    setStep('milk');
  };

  const handleMilkSelect = (milk) => {
    setSelection(prev => ({ ...prev, milk }));
    setStep('sweetener');
  };

  const handleSweetenerSelect = (sweetener) => {
    setSelection(prev => ({ ...prev, sweetener }));
    // Add navigation logic here for the next step
  };

  const renderTemperatureSelection = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>How would you like</Text>
        <Text style={styles.titleBold}>your coffee?</Text>
      </View>
      <View style={styles.selectionContainer}>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleTemperatureSelect('hot')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Service/hot.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Hot</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleTemperatureSelect('cold')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Service/cold.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Cold</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderOriginSelection = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Select your coffee's</Text>
        <Text style={styles.titleBold}>origin</Text>
      </View>
      <View style={[styles.selectionContainer, styles.originContainer]}>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleOriginSelect('brazil')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Origin/brazil.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Brazil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => handleOriginSelect('colombian')}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Origin/colombian.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Colombian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => handleOriginSelect('ethiopian')}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Origin/ethiopian.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Ethiopian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => handleOriginSelect('kenya')}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Origin/kenya.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Kenya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => handleOriginSelect('panama')}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Origin/panama.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Panama</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderMilkSelection = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Select your preferred</Text>
        <Text style={styles.titleBold}>milk option</Text>
      </View>
      <View style={[styles.selectionContainer, styles.originContainer]}>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleMilkSelect('standard')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Milk/Standard.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Standard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleMilkSelect('almond')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Milk/Almond.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Almond</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleMilkSelect('soy')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Milk/Soy.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Soy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleMilkSelect('oak')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Milk/Oak.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Oat</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderSweetenerSelection = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>How sweet do you want</Text>
        <Text style={styles.titleBold}>your coffee?</Text>
      </View>
      <View style={[styles.selectionContainer, styles.originContainer]}>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleSweetenerSelect('honey')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Sweetener/honey.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Honey</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleSweetenerSelect('maple')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Sweetener/maple.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Maple</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionContainer}
          onPress={() => handleSweetenerSelect('sugar')}
        >
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/Selection/Sweetener/sugar.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.optionText}>Sugar</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {step === 'temperature' ? renderTemperatureSelection() 
        : step === 'origin' ? renderOriginSelection()
        : step === 'milk' ? renderMilkSelection()
        : renderSweetenerSelection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: height * 0.06,
    paddingHorizontal: SCREEN_PADDING,
  },
  header: {
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: 24 * FONT_SCALE,
    color: '#1F2937',
    fontWeight: '400',
  },
  titleBold: {
    fontSize: 28 * FONT_SCALE,
    color: '#1F2937',
    fontWeight: 'bold',
    marginTop: 4,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: width * 0.03,
    marginTop: height * 0.02,
  },
  originContainer: {
    marginTop: height * 0.01,
  },
  optionContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  imageContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: '#F3F4F6',
    borderRadius: CIRCLE_SIZE / 2,
    padding: CIRCLE_SIZE * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '85%',
    height: '85%',
  },
  optionText: {
    fontSize: 16 * FONT_SCALE,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default CreateScreen;