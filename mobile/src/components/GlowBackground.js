import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, View } from 'react-native';

import { colors } from '../theme/colors';
import { radius } from '../theme/spacing';

// Valeur animée qui oscille entre 0 et 1 tant que isActive est vrai ;
// reste immobile si l'utilisateur a demandé de réduire les animations
function useOscillation(duration, isActive) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isActive) {
      return undefined;
    }
    const ease = Easing.inOut(Easing.sin);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, { toValue: 1, duration, easing: ease, useNativeDriver: true }),
        Animated.timing(progress, { toValue: 0, duration, easing: ease, useNativeDriver: true }),
      ]),
    );

    AccessibilityInfo.isReduceMotionEnabled().then((isReduced) => {
      if (!isReduced) {
        loop.start();
      }
    });
    return () => loop.stop();
  }, [progress, duration, isActive]);

  return progress;
}

// Déplacement et pulsation d'un halo, en pixels et en échelle
function driftStyle(progress, { x, y, scale }) {
  return {
    transform: [
      { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, x] }) },
      { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, y] }) },
      { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, scale] }) },
    ],
  };
}

// Halos colorés décoratifs, animés lentement derrière le contenu de l'écran visible
export default function GlowBackground({ subtle = false }) {
  const isFocused = useIsFocused();
  const topProgress = useOscillation(7000, isFocused);
  const bottomProgress = useOscillation(9000, isFocused);

  return (
    <View style={[StyleSheet.absoluteFill, subtle && styles.subtle]} pointerEvents="none">
      <Animated.View
        style={[styles.glow, styles.topGlow, driftStyle(topProgress, { x: -60, y: 50, scale: 1.2 })]}
      />
      <Animated.View
        style={[styles.glow, styles.bottomGlow, driftStyle(bottomProgress, { x: 70, y: -60, scale: 1.25 })]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subtle: {
    opacity: 0.55,
  },
  glow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: radius.pill,
  },
  topGlow: {
    top: -140,
    right: -110,
    backgroundColor: colors.primaryGlow,
  },
  bottomGlow: {
    bottom: -160,
    left: -130,
    backgroundColor: colors.purpleGlow,
  },
});
