import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    background: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    overflow-x: hidden
  }

  a {
    color: ${props => props.theme.colors.light};
    cursor: pointer;
  }
`
