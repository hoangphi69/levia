'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { Style } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function SelectInput({
  value,
  onChange,
}: {
  value: Style;
  onChange: (style: Style) => void;
}) {
  const styles = Object.values(Style);
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Select
      onValueChange={(value) => {
        setSelected(value as Style);
        onChange(value as Style);
      }}
      value={selected}
    >
      <SelectTrigger className="mt-2 text-foreground !text-base">
        <SelectValue placeholder="Chọn bố cục" />
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => (
          <SelectItem key={style} value={style}>
            {style === 'image_only'
              ? 'Hình ảnh'
              : style === 'image_bottom'
              ? 'Hình ảnh dưới'
              : style === 'image_left'
              ? 'Hình ảnh trái'
              : style === 'image_right'
              ? 'Hình ảnh phải'
              : '...'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
