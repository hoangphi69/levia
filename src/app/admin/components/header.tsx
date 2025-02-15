import React from 'react';
import Breadcrumb from './breadcrumb';

type HeaderProps = React.ComponentProps<typeof Breadcrumb> & {
  title: string | undefined;
};

export default function Header({ title, ...props }: HeaderProps) {
  return (
    <header className="space-y-4 p-4">
      <Breadcrumb {...props} />
      <h1 className="font-bold text-3xl">{title}</h1>
    </header>
  );
}
