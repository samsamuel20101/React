const { User, Thought, Photo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts').populate('photos');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts').populate('photos');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    photos: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Photo.find(params).sort({ createdAt: -1 });
    },
    userphotos: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Photo.find({ photoAuthor: username }).sort({ createdAt: -1 });
    },
    photo: async (parent, { photoId }) => {
      return Photo.findOne({ _id: photoId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts').populate('photos');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

    addPhoto: async (parent, { photoImage }, context) => {
      
      if (context.user) {
        const photo = await Photo.create({
          photoImage,
          photoAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { photos: photo._id } }
        );

        return photo;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },

    addThoughtComment: async (parent, { thoughtId, commentText }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    addPhotoComment: async (parent, { photoId, commentText }, context) => {
      if (context.user) {
        return Photo.findOneAndUpdate(
          { _id: photoId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },

    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },

    removePhoto: async (parent, { photoId }, context) => {
      if (context.user) {
        const photo = await Photo.findOneAndDelete({
          _id: photoId,
          photoAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { photos: photo._id } }
        );

        return photo;
      }
      throw AuthenticationError;
    },

    removeComment: async (parent, { photoId, commentId }, context) => {
      if (context.user) {
        return Photo.findOneAndUpdate(
          { _id: photoId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
