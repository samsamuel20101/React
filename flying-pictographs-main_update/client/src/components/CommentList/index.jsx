import { useMutation } from '@apollo/client';

import Auth from '../../utils/auth'
import { REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_SINGLE_PHOTO } from '../../utils/queries';

const CommentList = ({ comments = [] , photoId}) => {
  const [removeComment, { error }] = useMutation
    (REMOVE_COMMENT, {
      refetchQueries: [
        QUERY_SINGLE_PHOTO,
          'getSinglePhoto',
      ]
    });
  const deleteClick=async(commentId)=>{
    const { data } = await removeComment({
      variables: {
        photoId,
        commentId
      },
    });
  }
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3 bg-dark text-light" style={{display:'flex', justifyContent:'space-between'}}>
              <div className="p-3 ">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
              {Auth.loggedIn() && Auth.getProfile().data.username === comment.commentAuthor &&
              <div style={{display:'flex', alignItems:'center'}}>
                <button className="btn btn-lg btn-light m-2" style={{cursor:'pointer'}} onClick={()=>deleteClick(comment._id)}>
                  Delete
                </button>
              </div>
              }
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
