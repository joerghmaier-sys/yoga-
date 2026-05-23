export const Colors = {
  // Primary Brand Colors
  saffron: '#E8762B',    // Orange/Primär
  deepTeal: '#1A6B6B',   // Sekundär
  gold: '#C9962A',       // Akzent
  cream: '#FAFAF7',      // Hintergrund
  grey: '#888888',       // Text

  // Extended Palette
  darkBg: '#0F0F0F',     // Dunkel
  mediumGrey: '#555555',
  lightGrey: '#CCCCCC',
  white: '#FFFFFF',

  // Status
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  headline: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
};

export const Theme = {
  colors: Colors,
  spacing: Spacing,
  typography: Typography,
};
