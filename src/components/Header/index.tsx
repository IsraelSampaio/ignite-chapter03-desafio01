import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';
import styles from './header.module.scss';
import commonStyles from '../../styles/common.module.scss';

const cx = classNames.bind([styles, commonStyles]);

export const Header: React.FC = () => (
  <header className={cx('container', 'header')}>
    <Link href="/">
      <a>
        <Image src="/images/Logo.svg" alt="logo" width={238} height={25} />
      </a>
    </Link>
  </header>
);

export default Header;
