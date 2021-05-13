import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "./Link";
import { useHistory } from "react-router";
import { LINKS_PER_PAGE } from "../constants";

export const FEED_QUERY = gql`
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
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

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
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
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
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
      user {
        id
      }
    }
  }
`;

const getQueryVariables = (isNewPage, page) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: "desc" };
  return { take, skip, orderBy };
};

export default function LinkList(props) {
  const history = useHistory();
  const pathName = history.location.pathname;
  const isNewPage = pathName.includes("new");
  const pageIndexParams = pathName.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
  });

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          __typename: prev.feed.__typename,
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
        },
      });
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });

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
