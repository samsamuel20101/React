const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
    photos: [Photo]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Photo {
    _id: ID
    photoImage: String
    photoAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    photos(username: String): [Photo]
    photo(photoId: ID!): Photo
    userphotos: [Photo]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addPhoto(photoImage: String!): Photo
    addThoughtComment(thoughtId: ID!, commentText: String!): Thought
    addPhotoComment(photoId: ID!, commentText: String!): Photo
    removeThought(thoughtId: ID!): Thought
    removePhoto(photoId: ID!): Photo
    removeComment(photoId: ID!, commentId: ID!): Photo
  }
`;

module.exports = typeDefs;
