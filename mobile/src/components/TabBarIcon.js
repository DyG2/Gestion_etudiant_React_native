import { Ionicons } from '@expo/vector-icons';

// Icône d'onglet : pleine si active, contour sinon
export default function TabBarIcon({ name, color, focused }) {
  return <Ionicons name={focused ? name : `${name}-outline`} size={22} color={color} />;
}
