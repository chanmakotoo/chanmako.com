import styles from '../styles/component/header.module.scss';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>chanmako.com</a>
      </Link>
    </header>
  );
};

export default Header;
