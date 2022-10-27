import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';

const navigationStyles = css`
  width: 100%;
  height: 5rem;
  background-color: #e7dcda;
  color: #000000;
  position: fixed;
  z-index: 1;
  padding: 0 3rem;
  margin-bottom: 0 0 1.5rem 0;
  display: flex;
  justify-content: space-between;

  > div {
    align-self: center;
  }

  > div > a {
    text-decoration: none;
    color: #000000;
  }
`;

const dropdown = css`
  position: relative;
  display: block;
  cursor: pointer;

  :hover > div {
    display: block;
  }
`;

const dropdownContent = css`
  display: none;
  position: absolute;
  background-color: #e7dcda;
  min-width: 10rem;
  padding: 1rem;
  z-index: 1;
  right: 3rem;
  border: 1px solid #000;

  > hr {
    border: 1px solid #000;
  }

  > div > a {
    text-decoration: none;
    color: #000;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navigationStyles}>
        <div>
          <Link href="/experiences">
            <a data-test-id="experiences">EXPERIENCES</a>
          </Link>
        </div>
        <div>
          <Image src="/logo.png" alt="Feastful" width="150" height="21" />
        </div>
        <div css={dropdown}>
          <Image
            src="/login.png"
            alt="Icon for login and registration"
            width="21"
            height="21"
          />
          <div css={dropdownContent}>
            <div>
              <Link href="/login">
                <a>LOGIN/REGISTER</a>
              </Link>
            </div>
            <hr />
            <div>
              <Link href="/logout">
                <a>LOGOUT</a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
