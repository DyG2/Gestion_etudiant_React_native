import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
import { getInitials } from '../utils/format';

// Pastille ronde affichant les initiales d'un nom
export default function Avatar({ name, size = 44 }) {
  const dimensions = { width: size, height: size, borderRadius: size / 2 };

  return (
    <View style={[styles.avatar, dimensions]}>
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  initials: {
    fontWeight: '700',
    color: colors.text,
  },
});
