import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, incrementPage } from '../../store/data-slice';


export const InfiniteLoaderTable = () => {
  const dispatch = useDispatch();
  const { items, status, page } = useSelector((state) => state.data);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData(page));
    }
  }, [status, page, dispatch]);

  const loadMoreItems = () => {
    if (status !== 'loading') {
      dispatch(incrementPage());
      dispatch(fetchData(page + 1));
    }
  };

  return (

  );
};


