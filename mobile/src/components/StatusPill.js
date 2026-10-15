import { colors } from '../theme/colors';
import Pill from './Pill';

// Indique que l'utilisateur est connecté à l'API
export default function StatusPill() {
  return <Pill label="Connecté" dotColor={colors.success} />;
}
