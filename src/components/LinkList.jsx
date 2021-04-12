import React from 'react'
import Link from './Link';

const tempData = [
  {
    id: '1',
    description:
      'Prisma gives you a powerful database toolkit 😎',
    url: 'https://prisma.io'
  },
  {
    id: '2',
    description: 'The best GraphQL client',
    url: 'https://www.apollographql.com/docs/react/'
  },
];

export default function LinkList(props) {
  const linksToRender = tempData;

  return (
    <div>
      {linksToRender.map(link => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  )
}
