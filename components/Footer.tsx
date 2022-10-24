import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <span>© feastful 2022 | </span>
      <Link href="/credits">
        <span>Credits</span>
      </Link>
      <Link href="/about">
        <span>About</span>
      </Link>
      <Link href="/impressum">
        <span>Impressum</span>
      </Link>
    </footer>
  );
}
