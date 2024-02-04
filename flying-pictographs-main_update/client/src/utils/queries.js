import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
      photos {
        _id
        photoImage
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_PHOTOS = gql`
  query getPhotos {
    photos {
      _id
      photoImage
      photoAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_PHOTO = gql`
  query getSinglePhoto($photoId: ID!) {
    photo(photoId: $photoId) {
      _id
      photoImage
      photoAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_USER_PHOTOS = gql`
  query getUserPhotos($username: String!) {
    photos(photoAuthor: $username) {
      _id
      photoImage
      photoAuthor
      createdAt
    }
  }
`;


export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
      photos {
        _id
        photoImage
        photoAuthor
        createdAt
      }
    }
  }
`;
