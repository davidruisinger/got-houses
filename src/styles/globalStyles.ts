import { createGlobalStyle } from '../components/_utils/styledComponents'

export default createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-family: 'PingFang SC', Helvetica, sans-serif;
    font-size: 16px;
    color: #F0EDDC;
    background: #141E30;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
  }
  body {
    height: 100%;
    width: 100%;
  }
  #__next {
    height: 100%;
    width: 100%;
  }
  p {
    font-size: 1em;
    font-weight: 400;
  }
  h1 {
    font-size: 1.6em;
    font-weight: 600;
  }
  h2 {
    font-size: 1.4em;
    font-weight: 600;
  }
  h3 {
    font-size: 1.2em;
    font-weight: 500;
  }
  h4, h5, h6 {
    font-size: 1.1em;
    font-weight: 400;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.ancient_ivory};
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.4);
  }
  a:active,
  a:focus {
    outline: none;
  }
`
