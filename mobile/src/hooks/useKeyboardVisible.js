import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// Indique si le clavier est affiché (pour masquer la barre d'onglets)
export function useKeyboardVisible() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setIsVisible(false));
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isVisible;
}
