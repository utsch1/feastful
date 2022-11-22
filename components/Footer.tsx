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
  }

  > :last-child {
    float: right;
    margin-right: 3rem;
  }

  > span > a {
    margin-left: 0.75rem;
    text-decoration: none;
    color: #000000;
  }
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <span>© UTE GREINER 2022</span>
    </footer>
  );
}
