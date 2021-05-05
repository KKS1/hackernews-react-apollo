import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "./Link";

const tempData = [
  {
    id: "1",
    description: "Prisma gives you a powerful database toolkit 😎",
    url: "https://prisma.io",
  },
  {
    id: "2",
    description: "The best GraphQL client",
    url: "https://www.apollographql.com/docs/react/",
  },
];

export const FEED_QUERY = gql`
  {
    feed {
      count
      links {
        id
        createdAt
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export default function LinkList(props) {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
}
