import { css } from '@emotion/react';
import Link from 'next/link';

const navigationStyles = css`
  width: 100%;
  height: 80px;
  background-color: #e7dcda;
  padding: 30px 70px 30px 120px;
  position: fixed;
  z-index: 3;
  margin-bottom: 10px;
  display: flex;
`;

export default function Header() {
  return (
    <header>
      <nav css={navigationStyles}>
        <div>
          <Link href="/experiences">
            <a data-test-id="experiences">explore experiences</a>
          </Link>
        </div>
        <Link href="/about">ABOUT US</Link>
      </nav>
    </header>
  );
}
