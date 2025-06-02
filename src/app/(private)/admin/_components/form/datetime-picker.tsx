'use client';

import { Button } from '@/components/shadcn/button';
import { Calendar } from '@/components/shadcn/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn/popover';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DateTimePicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) {
  const [date, setDate] = useState<Date>(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setDate(value), [value]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onChange(selectedDate);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === 'hour') {
        newDate.setHours(parseInt(value));
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value));
      }
      setDate(newDate);
      onChange(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-start mt-2 w-full max-w-[300px] flex text-left text-base ${
            !date && 'text-muted-foreground'
          }`}
        >
          <CalendarIcon className="mr-2 w-4 h-4" />
          {date ? (
            <span>
              <span className="inline-block mr-2 pr-2 border-r">
                {format(date, 'dd/MM/yyyy')}
              </span>
              <span>{format(date, 'HH:mm')}</span>
            </span>
          ) : (
            <span>
              <span className="inline-block mr-2 pr-2 border-r">
                DD/MM/YYYY
              </span>
              <span>hh:mm</span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 w-auto">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            locale={vi}
            initialFocus
          />
          <div className="flex sm:flex-row flex-col sm:divide-x divide-y sm:divide-y-0 sm:h-[325px]">
            <div className="w-64 sm:w-auto overflow-y-auto no-scrollbar">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      date && date.getHours() === hour ? 'default' : 'ghost'
                    }
                    className="sm:w-full aspect-square shrink-0"
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-64 sm:w-auto overflow-y-auto no-scrollbar">
              <div className="flex sm:flex-col p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      date && date.getMinutes() === minute ? 'default' : 'ghost'
                    }
                    className="sm:w-full aspect-square shrink-0"
                    onClick={() =>
                      handleTimeChange('minute', minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
