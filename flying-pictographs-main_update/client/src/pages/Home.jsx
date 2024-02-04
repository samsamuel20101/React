import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import PhotoList from '../components/PhotoList';

import { QUERY_THOUGHTS, QUERY_PHOTOS } from '../utils/queries';

const Home = () => {
  const { loading:thoughtLoading, data:thoughtData , refetch} = useQuery(QUERY_THOUGHTS);
  const { loading:photoLoading, data:photoData } = useQuery(QUERY_PHOTOS);
  const thoughts = thoughtData?.thoughts || [];
  const photos = photoData?.photos || [];
  useEffect(()=>{
    refetch()
  }, [])
  return (
    <main>
      <div className="flex-row justify-center">
        {/* <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
        </div> */}
        <div className="col-12 col-md-10 mb-3">
          {thoughtLoading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Recent Thought Blogs"
            />
          )}
        </div>
        {/* <div className="col-12 col-md-6 mb-3">
          {photoLoading ? (
            <div>Loading...</div>
          ) : (
            <PhotoList
              photos={photos}
              title="Recent Photo Blogs"
            />
          )}
        </div> */}
      </div>
    </main>
  );
};

export default Home;
