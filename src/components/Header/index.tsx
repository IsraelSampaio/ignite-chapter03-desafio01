import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';

import { HeaderProps } from './Header.interface';

import styles from './header.module.scss';
import commonStyles from '../../styles/common.module.scss';

const cx = classNames.bind({ ...styles, ...commonStyles });

export const Header: React.FC<HeaderProps> = ({ isExpanded = false }) => (
  <header
    className={cx('container', 'header', { 'header--expanded': isExpanded })}
  >
    <Link href="/">
      <a>
        <Image src="/images/Logo.svg" alt="logo" width={230} height={25} />
      </a>
    </Link>
  </header>
);

export default Header;
