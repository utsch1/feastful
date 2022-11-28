import { css } from '@emotion/react';

const footerStyles = css`
  width: 100%;
  height: 3rem;
  background-color: #e7dcda;
  color: #000000;
  display: flex;
  justify-content: space-between;

  > span {
    margin-left: 3rem;
    align-self: center;

    @media (max-width: 600px) {
      margin-left: 1rem;
    }
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <span>© UTE GREINER 2022</span>
    </footer>
  );
}
