import type React from 'react';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from './storeHooks';
import { getCurrentPage, getMaxPage } from '../routes/root/root-helpers';
import { useGetPlanetsQuery } from '../store/apiSlice';
import { setPlanets } from '../store/planetsSlice';
import type { IPageState, IResponse, ISearchParams } from '../types/rootTypes';

const useGetPlanets = (
  setPageState: React.Dispatch<React.SetStateAction<IPageState>>,
): [IResponse | undefined, boolean, boolean] => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const fetchParam: ISearchParams = useMemo(
    () => ({
      searchValue: searchParams.get('q') || '',
      pageNumber: Number(searchParams.get('page')) || 1,
    }),
    [searchParams],
  );

  const { data, isLoading, isFetching } = useGetPlanetsQuery(fetchParam);

  useEffect(() => {
    if (data?.results) {
      dispatch(setPlanets(data.results));
      setPageState((prev) => ({ ...prev, currentPage: getCurrentPage(data), maxPage: getMaxPage(data.count) }));
    }
  }, [data, dispatch, setPageState]);

  return [data, isLoading, isFetching];
};

export default useGetPlanets;
