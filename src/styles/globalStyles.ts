import { createGlobalStyle } from '../components/_utils/styledComponents'

export default createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 16px;
    color: ${props => props.theme.text_default};
    background: ${props => props.theme.canvas_ground};
    background: -webkit-linear-gradient(to right, ${props =>
      props.theme.canvas_ground}, ${props => props.theme.canvas_first});
    background: linear-gradient(to right, ${props =>
      props.theme.canvas_ground}, ${props => props.theme.canvas_first});
    
  }
  body {
    height: 100%;
    width: 100%;
  }
  p {
    font-size: 1em;
    font-weight: 400;
  }
  h1 {
    font-size: 1.8em;
    font-weight: 800;
  }
  h2 {
    font-size: 1.6em;
    font-weight: 700;
  }
  h3 {
    font-size: 1.4em;
    font-weight: 600;
  }
  h4, h5, h6 {
    font-size: 1.2em;
    font-weight: 500;
  }
`
