import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export default definePreset(Aura, {
  primitive: {
    'yt-red': '#ff0033',
    'yt-blue': '#1E3A8A',
    'yt-gray-lg': '#9ea1a7ff',
    'yt-gray-md': '#6B7280',
    'yt-gray-dk': '#4B5563',
    'yt-black': '#030303',
  },
  semantic: {
    text: {
      color: '{yt-black}',
      secondary: '{yt-gray}',
    },
    colorScheme: {
      light: {
        formField: { hoverBorderColor: '{yt-blue}' },
      },
      dark: { formField: { hoverBorderColor: '{yt-blue}' } },
    },
  },
  // components: {
  //   button: {
  //     background: '{yt-gray-md}',
  //     background: '{yt-red}',
  //     hoverBackground: '{yt-gray-dk}',
  //   },
  //   inputtext: {
  //     focusBorderColor: '{yt-red}',
  //     focusBorder: '{yt-red}',
  //   },
  // },
  options: {
    prefix: 'yt',
    darkModeSelector: '[data-theme="dark"]',
  },
})
