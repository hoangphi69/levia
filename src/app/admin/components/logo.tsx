'use client';

import logo from '@/../public/logo/logo.svg';
import logoBlack from '@/../public/logo/logo-black.svg';
import logoWhite from '@/../public/logo/logo-white.svg';
import logoText from '@/../public/logo/logo-text.svg';
import logoTextBlack from '@/../public/logo/logo-text-black.svg';
import logoTextWhite from '@/../public/logo/logo-text-white.svg';

import { useTheme } from 'next-themes';
import Image, { ImageProps } from 'next/image';

type DynamicLogo = ImageProps & {
  variant?: 'text' | 'icon';
  theme?: 'light' | 'dark' | 'gold';
};

const Logo: React.FC<DynamicLogo> = ({
  variant = 'icon',
  theme: userTheme,
  ...props
}) => {
  const { theme: currentTheme } = useTheme();

  let src;
  const theme = userTheme || currentTheme;

  if (variant === 'text') {
    if (theme === 'light') src = logoTextBlack;
    else if (theme === 'dark') src = logoTextWhite;
    else src = logoText;
  } else {
    if (theme === 'light') src = logoBlack;
    else if (theme === 'dark') src = logoWhite;
    else src = logo;
  }

  return <Image {...props} src={src} alt="Levia logo" />;
};

export default Logo;
