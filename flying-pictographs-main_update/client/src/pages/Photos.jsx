import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import PhotoList from '../components/PhotoList';

import { QUERY_PHOTOS } from '../utils/queries';

const Home = () => {
  const {data, loading, refetch} = useQuery(QUERY_PHOTOS)
  const photos = data?.photos || [];
  useEffect(()=>{
    refetch()
  }, [])
  return (
    <main>
      <div className="flex-row justify-center">
        <div className=" mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PhotoList
              photos={photos}
              title="Recent Photo Blogs"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
