'use client';

import { useState } from 'react';

const ReadMore = ({ children }: { children: string }) => {
  const text = children;

  const [isReadMore, setIsReadMore] = useState(true);

  const tonggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (text.length < 30) {
    return <p className="text-gray-400 text-sm">{text}</p>;
  }

  return (
    <p className="text-gray-400 text-sm">
      {isReadMore ? text.slice(0, 60) : text}
      <span onClick={tonggleReadMore} className="text-cyan-600 cursor-pointer">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

export default ReadMore;
