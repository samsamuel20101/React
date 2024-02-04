import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth'
import { REMOVE_PHOTO } from '../../utils/mutations';
import { QUERY_PHOTOS, QUERY_ME } from '../../utils/queries';

const PhotoList = ({
  photos,
  title,
  showTitle = true,
  showUsername = true,
  username
}) => {
  const [removePhoto, { error }] = useMutation
    (REMOVE_PHOTO, {
      refetchQueries: [
        QUERY_PHOTOS,
          'getPhotos',
        QUERY_ME,
          'me'
      ]
    });
  const deleteClick=async(photoId)=>{
    const { data } = await removePhoto({
      variables: {
        photoId
      },
    });
  }
  if (!photos.length) {
    return (
      <>
        <h3>No Photos Yet</h3>
        {/* <PhotoForm/> */}
      </>
    );
  }

  return (
    <div>
      <div></div>                                 
      {showTitle && <h3>{title}</h3>}
      <div className='row gx-3'>
        {photos &&
          photos.map((photo) => (
            <div key={photo._id} className='col-sm-6 mb-3'>
              <div  className="card ">
                <div className="card-header bg-black text-light p-2 m-0 " style={{display:'flex', justifyContent:'space-between'}}>
                  <h4>
                    {showUsername ? (
                      <Link
                        className="text-white"
                        to={`/profiles/${photo.photoAuthor}`}
                      >
                        {photo.photoAuthor} <br />
                        <span style={{ fontSize: '1rem' }}>
                          Made Photo Blog {photo.createdAt}
                        </span>
                      </Link>
                      
                    ) : (
                      <>
                        <span style={{ fontSize: '1rem' }}>
                          {username} posted this blog on {photo.createdAt}
                        </span>
                      </>
                    )}
                  </h4>
                  {Auth.loggedIn() && Auth.getProfile().data.username === photo.photoAuthor &&
                    <button className="btn btn-lg btn-light m-2" style={{cursor:'pointer'}} onClick={()=>deleteClick(photo._id)}>
                      Delete
                    </button>
                  }
                </div>
                <div className="card-body bg-light " >
                  <img src={photo.photoImage} style={{aspectRatio:'3/2'}} className='w-100'/>
                </div>
                <Link
                  className="btn btn-black btn-block btn-squared"
                  to={`/photos/${photo._id}`}
                >
                  See Profile
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotoList;
