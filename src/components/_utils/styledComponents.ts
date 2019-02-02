// By default every styled component will have the theme prop set to any
// See https://www.styled-components.com/docs/api#typescript
//
// So we re-export the styled function with our custom Theme type
import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'
import theme from '../../styles/theme'

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<typeof theme>

export { css, createGlobalStyle, keyframes, ThemeProvider }
export default styled
