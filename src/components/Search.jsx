import React, { useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import {debounce} from 'lodash';
import Link from "./Link";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
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
  }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const [executeSearch, {data}] = useLazyQuery(FEED_SEARCH_QUERY);

  const delayedSearch = useCallback(
    debounce(searchString => executeSearch({
      variables: { filter: searchString },
    }), 500), 
  []);

  useEffect(() => {
    delayedSearch(searchFilter)
  }, [searchFilter, executeSearch, delayedSearch])

  return (
    <>
      <div>
        Search
        <input 
          type="text" 
          onChange={e => setSearchFilter(e.target.value)}
        />
        <button onClick={e=> 
          executeSearch({
            variables: { filter: searchFilter, },
          })}>
          Apply
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
