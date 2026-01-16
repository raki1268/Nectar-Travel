// 统一的主题配置
export const themeConfig = {
  colors: {
    primary: 'bg-stone-900',
    primaryText: 'text-stone-900',
    secondary: 'bg-stone-50',
    secondaryText: 'text-stone-600',
    accent: 'text-amber-600',
    white: 'text-white',
    muted: 'text-stone-500',
    border: 'border-stone-200',
    borderPrimary: 'border-stone-900'
  },
  
  spacing: {
    sectionPy: 'py-16 md:py-20',
    containerPx: 'px-6 md:px-16',
    containerWidth: 'max-w-7xl',
    gapLarge: 'gap-12',
    gapMedium: 'gap-8',
    gapSmall: 'gap-4',
    gapXSmall: 'gap-2'
  },

  typography: {
    h1: 'text-4xl md:text-6xl lg:text-7xl font-serif',
    h2: 'text-2xl md:text-3xl font-serif',
    h3: 'text-xl font-serif',
    h4: 'text-lg font-serif',
    bodyLarge: 'text-lg leading-relaxed',
    bodyBase: 'text-base leading-relaxed',
    bodySmall: 'text-sm leading-relaxed',
    labelSmall: 'text-xs uppercase tracking-wider',
    labelXSmall: 'text-xs uppercase tracking-widest'
  },

  transitions: {
    default: 'transition-colors',
    all: 'transition-all',
    transform: 'transition-transform duration-300',
    shadow: 'transition-shadow',
    opacity: 'transition-opacity'
  },

  shadows: {
    card: 'shadow-lg',
    hover: 'hover:shadow-lg'
  },

  borders: {
    radius: 'rounded-sm',
    radiusCircle: 'rounded-full'
  },

  // 完整的主题对象（与 DetailView 兼容）
  theme: {
    bg: 'bg-stone-50',
    text: 'text-stone-900',
    textMuted: 'text-stone-600',
    accent: 'bg-stone-900',
    accentText: 'text-white',
    border: 'border-stone-200'
  }
};