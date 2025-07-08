import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primevue/themes'

// Create a new preset by extending the base Aura preset
export const Theme = definePreset(Aura, {
  // We are only overriding semantic tokens in this case
  semantic: {
    // This is the variable that controls the background color on hover
    // for components like buttons, list items, etc.
    // By setting its value to 'transparent', we remove the effect completely.
    surface: {
      hover: {
        // For light mode
        value: 'transparent',
      },
    },

    // You can also override the text color here if needed,
    // though setting it to black might be better in main.css
    // to avoid theme compilation complexities for a simple change.
    text: {
      color: {
        value: '#000000', // Example: setting default text to black
      },
    },
  },
})

export default Theme
