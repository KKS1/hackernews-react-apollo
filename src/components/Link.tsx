import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import AppContext from '../AppContext';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { FEED_QUERY } from './LinkList';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import ConfirmationModal from './ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {avatarVar} from '../cache';
import {appState} from '../utils/appState';

export interface LINK_INTERFACE {
  id?: string;
  createdAt?: string;
  description?: string;
  url?: string;
  postedBy?: {
    id?: string;
    name?: string;
  };
  votes?: [
    {
      id?: string;
      user?: {
        id?: string;
      };
    }
  ];
}

export interface FEED_INTERFACE {
  count?: string;
  links?: [LINK_INTERFACE];
}

export interface FEED_RESULT_INTERFACE {
  feed: FEED_INTERFACE;
}

const StyledLinkSubSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;
  align-items: center;
`;

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        description
        url
        postedBy {
          id
          name
          email
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
        name
        email
      }
    }
  }
`;

const DELETE_LINK_MUTATION = gql`
  mutation DELETE_LINK($id: ID!) {
    deleteLink(id: $id) {
      id
      description
      url
      createdAt
    }
  }
`;

export default function Link(props: any) {
  const { link, onDelete = () => {} } = props;
  const { appState: appContextState, setAppState } = useContext(AppContext);
  const authToken = appContextState.token;
  const history = useHistory();

  const [deletePrompt, setDeletePrompt] = useState(false);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { vote } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };

      const cacheQueryResult = cache.readQuery<FEED_RESULT_INTERFACE>({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      let feed: FEED_INTERFACE | undefined = cacheQueryResult?.feed;

      if (!feed) {
        return;
      }

      const updatedLinks = feed?.links?.map((feedLink) => {
        if (feedLink.id === link.id && feedLink?.votes instanceof Array) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });
      cache.writeQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  const [
    deleteLink,
    { loading: deleting, error: deleteError, data: deletedLink },
  ] = useMutation(DELETE_LINK_MUTATION, {
    variables: {
      id: link.id,
    },
    update: (cache, { data: { deleteLink } }) => {
      const deletedLinkId = cache.identify(deleteLink);
      cache.evict({ id: deletedLinkId });
      onDelete(deleteLink);
      // history.go(0); // window.location.reload() // also does the same
    },
  });

  const deleteLinkHandler = (e: object | undefined, proceed = false) => {
    setDeletePrompt(false);
    
    avatarVar('');

    appState({...appState(), someInfo: ''});

    if (proceed) {
      deleteLink().catch((err) => alert(err.message));
    }
  };

  const onDeleteClick = (e: React.SyntheticEvent) => {
    setDeletePrompt(true); 
    avatarVar('in trouble.....');
    appState({...appState(), someInfo: 'someone is thinking of deleting a link....'});
  };

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{props.index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: 'pointer' }}
            onClick={(e) => vote()}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div>
          {link.avatar}
        </div>
        {authToken && (
          <StyledLinkSubSection>
            <div className="f6 lh-copy gray">
              {link.votes.length} votes | by{' '}
              {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
              {timeDifferenceForDate(link.createdAt)}
            </div>
            <div>
              <Button
                outline
                color="link"
                size="sm"
                title="Delete Link"
                onClick={onDeleteClick}
              >
                <FontAwesomeIcon
                  icon="trash"
                  aria-label="Delete Link"
                  title="Delete Link"
                />
              </Button>
            </div>
          </StyledLinkSubSection>
        )}
      </div>

      <ConfirmationModal isOpen={deletePrompt} onClose={deleteLinkHandler} />
    </div>
  );
}
