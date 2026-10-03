import React from 'react';

import { cn } from '@/lib/cn';

export interface TagProps {
  name: string;
  index: number;
}

export function Tag({ name, index }: TagProps): React.JSX.Element {
  const colorOptions = [
    'bg-blue-50 text-text-primary',
    'bg-warm-400 text-text-primary',
    'bg-warm-200 text-text-primary',
    'bg-green-50 text-text-primary',
    'bg-purple-50 text-text-primary',
  ];

  const getColorByPosition = (position: number): string => {
    return colorOptions[position % colorOptions.length];
  };

  return (
    <span
      className={cn('text-sm px-3 py-1 rounded-md', getColorByPosition(index))}
    >
      {name}
    </span>
  );
}
