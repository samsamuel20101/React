// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_PHOTO } from '../utils/queries';

const SinglePhoto = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { photoId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PHOTO, {
    // pass URL parameter
    variables: { photoId: photoId },
  });

  const photo = data?.photo || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {photo.photoAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {photo.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          <img src={photo.photoImage} style={{aspectRatio:'8/5'}} className='w-100'/>
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={photo.comments} photoId={photo._id}/>
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm photoId={photo._id} />
      </div>
    </div>
  );
};

export default SinglePhoto;
