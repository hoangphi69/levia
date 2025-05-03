import { Input } from '@/components/shadcn/input';
import React, { useState } from 'react';

export default function CurrencyInput({
  value,
  onChange,
  ...props
}: React.ComponentProps<typeof Input> & {
  value: string;
  onChange: (value: string) => void;
}) {
  const [inputValue, setInputValue] = useState(value);

  const formatCurrency = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    const formattedValue = formatCurrency(rawValue);
    setInputValue(formattedValue);
    onChange(rawValue);
  };

  return (
    <Input type="text" value={inputValue} onChange={handleChange} {...props} />
  );
}
