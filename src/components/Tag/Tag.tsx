import React from 'react';

import clsx from 'clsx';

interface TagProps {
  name: string;
  index: number;
}

function Tag({ name, index }: TagProps): React.JSX.Element {
  const colorOptions = [
    'bg-blue-50 text-blue-200',
    'bg-warm-400 text-blue-200',
    'bg-warm-200 text-blue-200',
    'bg-green text-blue-200',
    'bg-purple text-blue-200',
  ];

  const getColorByPosition = (position: number): string => {
    return colorOptions[position % colorOptions.length];
  };

  return (
    <span
      className={clsx(
        'text-sm px-3 py-1 rounded-md',
        getColorByPosition(index),
      )}
    >
      {name}
    </span>
  );
}

export default Tag;
