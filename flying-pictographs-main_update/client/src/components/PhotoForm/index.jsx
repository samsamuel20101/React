import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PHOTO } from '../../utils/mutations';
import { QUERY_PHOTOS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';
import DragImage from './DragImage';

const PhotoForm = () => {
  const [photoImage, setPhotoImage] = useState(null);

  const [addPhoto, { error }] = useMutation
  (ADD_PHOTO, {
    refetchQueries: [
      QUERY_PHOTOS,
      'getPhotos',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPhoto({
        variables: {
          photoImage,
          photoAuthor: Auth.getProfile().data.username,
        },
      });

      // setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>What photos are on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              {/* <textarea
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea> */}
              <DragImage photoImage={photoImage} setPhotoImage={setPhotoImage}/>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Photo
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
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

export default PhotoForm;
