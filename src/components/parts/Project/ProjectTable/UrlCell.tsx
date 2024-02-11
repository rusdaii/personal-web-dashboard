import React from 'react';

import { Tooltip, Link } from '@nextui-org/react';
import { FaExternalLinkAlt } from 'react-icons/fa';

type Props = {
  url: string;
  title: string;
};

const UrlCell = ({ title, url }: Props) => {
  return (
    <Tooltip
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">{title}</div>
          <div className="text-tiny">{url}</div>
        </div>
      }
    >
      <div className="">
        <Link href={url} target="_blank" className="text-default-400">
          <FaExternalLinkAlt className="mr-2" />
          Visit
        </Link>
      </div>
    </Tooltip>
  );
};

export default UrlCell;
