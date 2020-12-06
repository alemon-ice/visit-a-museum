import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.dark};

  width: 10vw;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${props => props.theme.colors.light};

    width: 100%;

    padding: 3rem 2rem;
    border-radius: 4px 0 0 4px;

    h2 {
      color: ${props => lighten(.01, props.theme.colors.primary)};
    }

    img {
      max-height: 150px;
    }

    h2, img {
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
    }

    h3, .visits, .visit-item {
      margin-bottom: 0.6rem;
    }

    .visits, .visit-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .visits p + p {
      margin-top: 0.3rem;
    }
  }

@keyframes open-museum-visits {
  from {
    transform: translateX(+30vw);
  }

  to {
    transform: translateX(0vw);
  }
}

@keyframes close-museum-visits {
  from {
    transform: translateX(0vw);
  }

  to {
    transform: translateX(+30vw);
  }
}

&#open-museum-visits {
  animation: open-museum-visits 2s;
}

&#close-museum-visits {
  animation: close-museum-visits 1s;
}
`;
