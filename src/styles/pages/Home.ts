import styled from 'styled-components';
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;

    padding: 0;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100vw;
      height: 7vh;

      margin: 2vh 0;
      padding: 0 4vw;

      h1 {
        font-size: 1.5rem;
      }

      img {
        max-height: 6vh;
      }
    }

    .content-page {
      flex: 1;
      display: flex;
      flex-direction: row;

      & > * {
        flex: 1;
      }
    }

    .container-new-visit {
      flex: 2;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      .new-visit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        label {
          width: 100%;
          max-width: 250px;
          margin-bottom: 0.5rem;

          &.error-message {
            text-align: center;
            color: ${props => props.theme.colors.error};
          }
        }

        select, input, button {
          width: 250px;
          height: 50px;

          background-color: ${props => props.theme.colors.light};

          padding-left: 10px;
          margin-bottom: 1.5rem;

          border-radius: 4px;
        }

        button {
          background: ${props => props.theme.colors.primary};
          color: ${props => props.theme.colors.light};
          font-weight: 700;

          margin-top: 0.5rem;
          border: none;

          &.disabled {
            background: ${props => shade(0.5, props.theme.colors.primary)};
            color: ${props => shade(0.5, props.theme.colors.light)};
          }
        }
      }
    }
  }
`;

export const Footer = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
