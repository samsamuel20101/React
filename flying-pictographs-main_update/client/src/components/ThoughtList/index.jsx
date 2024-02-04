import { Link } from 'react-router-dom';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
  username
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <div></div>                                 
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-black text-white p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-white"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Made Blog Post {thought.createdAt}
                  </span>
                </Link>
                
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    {username} posted this blog on {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-black btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              See Profile
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
