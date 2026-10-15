// Palette unique de l'application (thème sombre) : aucune couleur écrite en dur ailleurs
export const colors = {
  background: '#0B0B0D',
  surface: '#1C1C1E',
  surfaceAlt: '#2C2C2E',
  surfaceHighlight: '#48484A',
  tabBar: '#161618',
  border: '#2C2C2E',
  primary: '#2F6BFF',
  primaryPressed: '#2557D6',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  success: '#30D158',
  warning: '#FF9F0A',
  danger: '#FF453A',
  dangerPressed: '#D63A31',
  dangerMuted: 'rgba(255, 69, 58, 0.12)',
  purple: '#8E5CF6',
  primaryGlow: 'rgba(47, 107, 255, 0.22)',
  primaryRing: 'rgba(47, 107, 255, 0.35)',
  purpleGlow: 'rgba(142, 92, 246, 0.16)',
};

const ACCENT_COLORS = [colors.primary, colors.success, colors.warning, colors.purple];

// Couleur stable associée à un libellé (une filière par exemple)
export function getAccentColor(label) {
  const hash = [...label].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ACCENT_COLORS[hash % ACCENT_COLORS.length];
}
