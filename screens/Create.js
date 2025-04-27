import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, FlatList, Animated as RNAnimated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Extrapolate,
  Easing
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isTablet = width >= 768;
const CARD_SIZE = isTablet ? width * 0.38 : isSmallDevice ? width * 0.62 : width * 0.54;

// More realistic prices for Turkey
const PRICES = {
  temperature: { hot: 0, cold: 5 },
  size: { small: 0, medium: 10, large: 18 },
  origin: { brazil: 45, colombian: 55, ethiopian: 65, kenya: 70, panama: 80 },
  milk: { none: 0, standard: 12, almond: 18, soy: 15, oak: 15 },
  sweetener: { none: 0, honey: 8, maple: 9, sugar: 5 },
  syrup: { caramel: 30, chocolate: 30, coconut: 30, mint: 30, nut: 30, vanilla: 30 }
};

const OPTIONS = {
  temperature: [
    { id: 'hot', label: 'Hot', image: require('../images/Selection/Service/hot.png'), price: PRICES.temperature.hot },
    { id: 'cold', label: 'Cold', image: require('../images/Selection/Service/cold.png'), price: PRICES.temperature.cold }
  ],
  size: [
    { id: 'small', label: 'Small', icon: 'S', price: PRICES.size.small },
    { id: 'medium', label: 'Medium', icon: 'M', price: PRICES.size.medium },
    { id: 'large', label: 'Large', icon: 'L', price: PRICES.size.large }
  ],
  origin: [
    { id: 'brazil', label: 'Brazil', image: require('../images/Selection/Origin/Brazil.png'), price: PRICES.origin.brazil },
    { id: 'colombian', label: 'Colombian', image: require('../images/Selection/Origin/Colombian.png'), price: PRICES.origin.colombian },
    { id: 'ethiopian', label: 'Ethiopian', image: require('../images/Selection/Origin/Ethiopian.png'), price: PRICES.origin.ethiopian },
    { id: 'kenya', label: 'Kenya', image: require('../images/Selection/Origin/Kenya.png'), price: PRICES.origin.kenya },
    { id: 'panama', label: 'Panama', image: require('../images/Selection/Origin/Panama.png'), price: PRICES.origin.panama }
  ],
  milk: [
    { id: 'none', label: 'None', icon: 'close-circle', price: PRICES.milk.none },
    { id: 'standard', label: 'Standard', image: require('../images/Selection/Milk/Standard.png'), price: PRICES.milk.standard },
    { id: 'almond', label: 'Almond', image: require('../images/Selection/Milk/Almond.png'), price: PRICES.milk.almond },
    { id: 'soy', label: 'Soy', image: require('../images/Selection/Milk/Soy.png'), price: PRICES.milk.soy },
    { id: 'oak', label: 'Oat', image: require('../images/Selection/Milk/Oak.png'), price: PRICES.milk.oak }
  ],
  sweetener: [
    { id: 'none', label: 'None', icon: 'close-circle', price: PRICES.sweetener.none },
    { id: 'honey', label: 'Honey', image: require('../images/Selection/Sweetener/honey.png'), price: PRICES.sweetener.honey },
    { id: 'maple', label: 'Maple', image: require('../images/Selection/Sweetener/maple.png'), price: PRICES.sweetener.maple },
    { id: 'sugar', label: 'Sugar', image: require('../images/Selection/Sweetener/sugar.png'), price: PRICES.sweetener.sugar }
  ],
  syrup: [
    { id: 'caramel', label: 'Caramel', image: require('../images/Selection/Syrup/caramel.png'), price: PRICES.syrup.caramel },
    { id: 'chocolate', label: 'Chocolate', image: require('../images/Selection/Syrup/chocolate.png'), price: PRICES.syrup.chocolate },
    { id: 'coconut', label: 'Coconut', image: require('../images/Selection/Syrup/coconut.png'), price: PRICES.syrup.coconut },
    { id: 'mint', label: 'Mint', image: require('../images/Selection/Syrup/mint.png'), price: PRICES.syrup.mint },
    { id: 'nut', label: 'Nut', image: require('../images/Selection/Syrup/nut.png'), price: PRICES.syrup.nut },
    { id: 'vanilla', label: 'Vanilla', image: require('../images/Selection/Syrup/vanilla.png'), price: PRICES.syrup.vanilla }
  ]
};

const STEPS = ['temperature', 'size', 'origin', 'milk', 'sweetener', 'syrup'];

const CreateScreen = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [selection, setSelection] = useState({ temperature: null, size: null, origin: null, milk: null, sweetener: null, syrup: null });
  const [total, setTotal] = useState(0);
  const [started, setStarted] = useState(false);
  const totalAnim = useRef(new RNAnimated.Value(0)).current;
  const introOpacity = useRef(new RNAnimated.Value(1)).current;
  const stepsOpacity = useRef(new RNAnimated.Value(0)).current;
  const [showSummary, setShowSummary] = useState(false);
  const summaryOpacity = useRef(new RNAnimated.Value(0)).current;

  // Animate total price
  useEffect(() => {
    let newTotal = 0;
    STEPS.forEach((step) => {
      const sel = selection[step];
      if (sel && PRICES[step][sel] !== undefined) newTotal += PRICES[step][sel];
    });
    RNAnimated.timing(totalAnim, {
      toValue: newTotal,
      duration: 500,
      useNativeDriver: false
    }).start();
    setTotal(newTotal);
  }, [selection]);

  // Animations for step transitions
  const stepAnim = useSharedValue(0);
  useEffect(() => {
    stepAnim.value = withTiming(stepIndex, { duration: 500, easing: Easing.out(Easing.exp) });
  }, [stepIndex]);

  // Animate intro/steps transition
  const handleStart = () => {
    RNAnimated.timing(introOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).start(() => {
      setStarted(true);
      RNAnimated.timing(stepsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }).start();
    });
  };

  const handleSelect = (step, id) => {
    setSelection((prev) => ({ ...prev, [step]: id }));
    if (stepIndex < STEPS.length - 1) {
      setTimeout(() => setStepIndex(stepIndex + 1), 350);
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  // Show summary after last step
  useEffect(() => {
    if (started && stepIndex === STEPS.length - 1 && selection[STEPS[STEPS.length - 1]]) {
      setTimeout(() => {
        setShowSummary(true);
        RNAnimated.timing(summaryOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
      }, 400);
    } else {
      setShowSummary(false);
      summaryOpacity.setValue(0);
    }
  }, [stepIndex, started, selection]);

  // Card animation for selection
  const AnimatedCard = ({ item, selected, onPress, index, step }) => {
    const scale = useSharedValue(1);
    const shadow = useSharedValue(0.15);
    useEffect(() => {
      if (selected) {
        scale.value = withSpring(1.12, { damping: 8 });
        shadow.value = withTiming(0.35, { duration: 300 });
      } else {
        scale.value = withSpring(1, { damping: 8 });
        shadow.value = withTiming(0.15, { duration: 300 });
      }
    }, [selected]);
    const stylez = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      shadowOpacity: shadow.value
    }));
    return (
      <Animated.View style={[styles.card, stylez]}>
        <TouchableOpacity style={styles.cardTouchable} activeOpacity={0.8} onPress={onPress}>
          {item.image ? (
            <Image source={item.image} style={styles.cardImage} resizeMode="contain" defaultSource={item.image} />
          ) : step === 'size' ? (
            <View style={styles.sizeIconCircle}>
              <Text style={styles.sizeIconText}>{item.icon}</Text>
      </View>
          ) : (
            <View style={styles.cardIconBg}>
              <Ionicons name={item.icon} size={CARD_SIZE * 0.6} color="#bbb" />
          </View>
          )}
          <Text style={styles.cardLabel}>{item.label}</Text>
          <Text style={styles.cardPrice}>+{item.price}₺</Text>
          {selected && (
            <View style={styles.selectedMark}>
              <Ionicons name="checkmark-circle" size={28} color="#5AA871" />
          </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Step title
  const stepTitles = {
    temperature: 'Temperature',
    size: 'Size',
    origin: 'Origin',
    milk: 'Milk',
    sweetener: 'Sweetener',
    syrup: 'Syrup',
  };

  // FlatList optimizations for faster image loading
  // NOTE: For best performance, optimize your PNG/JPG files to be under 200 KB and use reasonable resolution (e.g. 400x400).
  const MemoizedAnimatedCard = React.memo(AnimatedCard);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Intro Section */}
        {!started && (
          <RNAnimated.View style={[styles.introWrap, { opacity: introOpacity, transform: [{ translateY: introOpacity.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }] }>
            <View style={styles.introBgCircle} />
            <View style={styles.logoRow}>
              <Image source={require('../images/logo.png')} style={styles.logo} resizeMode="contain" />
              <Text style={styles.logoText}>Cowee</Text>
      </View>
            <View style={styles.introCard}>
              <Text style={styles.introDesc}>Start creating your own coffee! Select your favorite ingredients, see the price instantly, and personalize your drink.</Text>
              <TouchableOpacity style={styles.createBtn} activeOpacity={0.85} onPress={handleStart}>
                <Text style={styles.createBtnText}>Create</Text>
        </TouchableOpacity>
          </View>
          </RNAnimated.View>
        )}
        {/* Steps Section */}
        {started && !showSummary && (
          <RNAnimated.View style={{ flex: 1, opacity: stepsOpacity, transform: [{ translateY: stepsOpacity.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }}>
            <View style={styles.headerRow}>
              {stepIndex > 0 && (
                <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
                  <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
              )}
              <Text style={styles.headerTitle}>{stepTitles[STEPS[stepIndex]]}</Text>
              <View style={{ width: 36 }} />
          </View>
            <View style={styles.stepperRow}>
              {STEPS.map((s, i) => (
                <View key={s} style={[styles.stepDot, stepIndex === i && styles.stepDotActive]} />
              ))}
          </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <RNAnimated.Text style={styles.totalValue}>
                {totalAnim.interpolate({ inputRange: [0, 1000], outputRange: [0, 1000] }).__getValue().toFixed(2)} ₺
              </RNAnimated.Text>
          </View>
            <Animated.View style={styles.optionsWrap}>
              <FlatList
                data={OPTIONS[STEPS[stepIndex]]}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={7}
                removeClippedSubviews={true}
                renderItem={({ item, index }) => (
                  <MemoizedAnimatedCard
                    item={item}
                    selected={selection[STEPS[stepIndex]] === item.id}
                    onPress={() => handleSelect(STEPS[stepIndex], item.id)}
                    index={index}
                    step={STEPS[stepIndex]}
                  />
                )}
              />
            </Animated.View>
          </RNAnimated.View>
        )}
        {/* Order Summary Section */}
        {showSummary && (
          <RNAnimated.View style={[styles.summaryWrap, { opacity: summaryOpacity, transform: [{ translateY: summaryOpacity.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }] }>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Order Summary</Text>
              <ScrollView style={{ maxHeight: 320 }} contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                {STEPS.map((step) => {
                  const opt = OPTIONS[step].find(o => o.id === selection[step]);
                  if (!opt) return null;
                  return (
                    <View key={step} style={styles.summaryRow}>
                      {opt.image ? (
                        <Image source={opt.image} style={styles.summaryImg} resizeMode="cover" />
                      ) : (
                        <View style={styles.summaryIconBg}>
                          <Ionicons name={opt.icon} size={38} color="#bbb" />
          </View>
                      )}
                      <Text style={styles.summaryLabel}>{opt.label}</Text>
                      <Text style={styles.summaryPrice}>+{opt.price}₺</Text>
          </View>
                  );
                })}
              </ScrollView>
              <View style={styles.summaryTotalRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>{total.toFixed(2)} ₺</Text>
          </View>
              <TouchableOpacity style={styles.addCartBtn} activeOpacity={0.85} onPress={() => {}}>
                <Ionicons name="cart" size={26} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.addCartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
          </RNAnimated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f6f9',
  },
  container: {
    flex: 1,
    paddingTop: isSmallDevice ? 10 : 24,
    paddingHorizontal: isSmallDevice ? 0 : 0,
    backgroundColor: '#f7f6f9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 22 : 28,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  stepDotActive: {
    backgroundColor: '#5F4330',
    width: 18,
    borderRadius: 9,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 2,
  },
  totalLabel: {
    fontSize: 18,
    color: '#705642',
    fontWeight: '500',
    marginRight: 8,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5F4330',
    letterSpacing: 1,
  },
  optionsWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  flatListContent: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.7,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 40,
    marginHorizontal: 22,
    marginVertical: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.19,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
    position: 'relative',
  },
  cardTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  cardImage: {
    width: '100%',
    height: '80%',
    borderRadius: 32,
    marginTop: 10,
    marginBottom: 8,
  },
  cardIconBg: {
    width: '100%',
    height: '80%',
    borderRadius: 32,
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: isSmallDevice ? 16 : 18,
    fontWeight: '600',
    color: '#3A2A1B',
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 15,
    color: '#8C6B51',
    fontWeight: '500',
    marginBottom: 2,
  },
  selectedMark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
  },
  introWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: '#f7f6f9',
    width: '100%',
  },
  introBgCircle: {
    position: 'absolute',
    top: '18%',
    left: '50%',
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: width * 0.55,
    backgroundColor: '#f3e7d7',
    opacity: 0.45,
    transform: [{ translateX: -width * 0.55 }],
    zIndex: 0,
  },
  logoRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
    zIndex: 2,
  },
  logo: {
    width: isSmallDevice ? 150 : 210,
    height: isSmallDevice ? 110 : 160,
    marginBottom: 10,
    marginRight: 0,
  },
  logoText: {
    fontSize: isSmallDevice ? 64 : 100,
    fontWeight: 'bold',
    color: '#5F4330',
    letterSpacing: 2,
    marginBottom: 0,
  },
  introCard: {
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 32,
    paddingVertical: 36,
    paddingHorizontal: isSmallDevice ? 18 : 36,
    alignItems: 'center',
    marginTop: 18,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    zIndex: 2,
  },
  introDesc: {
    fontSize: isSmallDevice ? 20 : 26,
    color: '#705642',
    textAlign: 'center',
    marginBottom: 36,
    marginTop: 0,
    fontWeight: '500',
    lineHeight: isSmallDevice ? 28 : 34,
  },
  createBtn: {
    backgroundColor: '#5F4330',
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 64,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    marginTop: 8,
  },
  createBtnText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 2,
  },
  summaryWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(247,246,249,0.98)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 32,
    paddingHorizontal: isSmallDevice ? 18 : 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    minWidth: isSmallDevice ? 280 : 380,
    maxWidth: 420,
  },
  summaryTitle: {
    fontSize: isSmallDevice ? 26 : 32,
    fontWeight: 'bold',
    color: '#5F4330',
    marginBottom: 18,
    letterSpacing: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  summaryImg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    marginRight: 12,
  },
  summaryIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryLabel: {
    fontSize: 18,
    color: '#3A2A1B',
    fontWeight: '600',
    flex: 1,
  },
  summaryPrice: {
    fontSize: 18,
    color: '#8C6B51',
    fontWeight: '500',
    marginLeft: 8,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  summaryTotalLabel: {
    fontSize: 22,
    color: '#705642',
    fontWeight: '700',
  },
  summaryTotalValue: {
    fontSize: 28,
    color: '#5F4330',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  addCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5F4330',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  addCartBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sizeIconCircle: {
    width: '100%',
    height: '80%',
    borderRadius: 32,
    backgroundColor: '#f3e7d7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#5F4330',
  },
  sizeIconText: {
    fontSize: CARD_SIZE * 0.45,
    fontWeight: 'bold',
    color: '#5F4330',
    textAlign: 'center',
  },
});

export default CreateScreen;