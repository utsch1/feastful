import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '../database/users';

type Props = {
  user?: User;
};

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
    flex: 1;
  }

  > div > a {
    text-decoration: none;
    color: #000000;
  }
`;

const logo = css`
  text-align: center;
`;

const dropdown = css`
  position: relative;
  display: block;
  cursor: pointer;
  text-align: end;

  :hover > div {
    display: block;
  }
`;

const dropdownContent = css`
  display: none;
  position: absolute;
  background-color: #e7dcda;
  min-width: 12rem;
  padding: 1rem;
  z-index: 1;
  right: 0.1rem;
  border: 1px solid #000;
  text-align: center;

  > hr {
    border: 0.5px solid #000;
  }

  > div > a {
    text-decoration: none;
    color: #000;
  }
`;

export default function Header(props: Props) {
  return (
    <header>
      <nav css={navigationStyles}>
        <div>
          <Link href="/experiences">
            <a data-test-id="experiences">EXPERIENCES</a>
          </Link>
        </div>
        <div css={logo}>
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
            {props.user ? (
              <>
                <div>
                  <Link href="/account">
                    <a>ACCOUNT</a>
                  </Link>
                </div>
                <hr />
                <div>
                  <a href="/logout">LOGOUT</a>
                </div>
              </>
            ) : (
              <div>
                <Link href="/login">
                  <a>LOGIN / REGISTER</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
