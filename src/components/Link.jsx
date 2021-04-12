import React from 'react'

export default function Link({
  link: {
    url,
    description,
  } = {},
}) {
  return (
    <div>
      <div>
        {description} {url}
      </div>
    </div>
  );
}
