import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_THOUGHT_COMMENT, ADD_PHOTO_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ thoughtId, photoId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addThoughtComment, { error:thoughtError }] = useMutation(ADD_THOUGHT_COMMENT);
  const [addPhotoComment, { error:photoError }] = useMutation(ADD_PHOTO_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if(thoughtId){
        const { data } = await addThoughtComment({
          variables: {
            thoughtId,
            commentText,
            commentAuthor: Auth.getProfile().data.username,
          },
        });
      }
      else if(photoId){
        const { data } = await addPhotoComment({
          variables: {
            photoId,
            commentText,
            commentAuthor: Auth.getProfile().data.username,
          },
        });
      }

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your thoughts on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || (thoughtId&&thoughtError) || (photoId&&photoError)? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {thoughtId&&thoughtError && <span className="ml-2">{thoughtError.message}</span>}
            {photoId&&photoError && <span className="ml-2">{photoError.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
