import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_PHOTO = gql`
  mutation addPhoto($photoImage: String!) {
    addPhoto(photoImage: $photoImage) {
      _id
      photoImage
      photoAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_THOUGHT_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addThoughtComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const ADD_PHOTO_COMMENT = gql`
  mutation addComment($photoId: ID!, $commentText: String!) {
    addPhotoComment(photoId: $photoId, commentText: $commentText) {
      _id
      photoAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_PHOTO = gql`
  mutation removePhoto($photoId: ID!) {
    removePhoto(photoId: $photoId) {
      _id
      photoImage
      photoAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($photoId: ID!, $commentId: ID!) {
    removeComment(photoId: $photoId, commentId: $commentId) {
      _id
      photoImage
      photoAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;
