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
    border-radius: 0 4px 4px 0;

    h2 {
      color: ${props => lighten(.01, props.theme.colors.primary)};
    }

    img {
      max-height: 150px;
    }

    h2, img {
      margin-bottom: 1rem;
    }

    h3, .times, .day-item {
      margin-bottom: 0.5rem;
    }

    .times, .day-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    span {
      font-size: 1.05rem;
    }
  }

@keyframes open-museum-card {
  from {
    transform: translateX(-30vw);
  }

  to {
    transform: translateX(0vw);
  }
}

@keyframes close-museum-card {
  from {
    transform: translateX(0vw);
  }

  to {
    transform: translateX(-30vw);
  }
}

&#open-museum-details {
  animation: open-museum-card 2s;
}

&#close-museum-details {
  animation: close-museum-card 1s;
}
`;
