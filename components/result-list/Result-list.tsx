import { useContext, type ReactNode } from 'react';
// import { NavLink } from 'react-router-dom';

import styles from './_Result-list.module.scss';

import { ThemeContext, ThemeEnum } from '../../context';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import type { IResultListProps } from '../../types/resultListTypes';
import type { IPlanet } from '../../types/rootTypes';

import { useRouter } from 'next/router';
import { extractLastNumber } from '@/utils/result-list-helpers';

const ResultList = ({
  planets,
  searchParams,
  isDetailedVisible,
  setIsDetailedVisible,
}: IResultListProps): ReactNode => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { details } = router.query;
  const { theme } = useContext(ThemeContext);
  const favoritePlanets = useAppSelector((state) => state.favorite.planets);

  const isFavorite = (planetName: string): boolean => favoritePlanets.some((planet) => planet.name === planetName);

  const addToFavorite = (e: React.MouseEvent, planet: IPlanet): void => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addFavorite(planet));
  };

  const deleteFromFavorite = (e: React.MouseEvent, planet: IPlanet): void => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deleteFavorite(planet));
  };

  return (
    <section className={styles.wrapper_load}>
      {planets?.length ? (
        <nav className={styles.wrapper_load}>
          <ul className={isDetailedVisible ? styles.list_column : styles.list_center}>
            {planets.map((elem) => (
              <li id="planets" key={elem.url}>
                <div
                  // type="button"
                  // href={`planets/${extractLastNumber(elem.url ? elem.url : '')}?q=${searchParams.q || ''}&page=${searchParams.page || '1'}`}
                  // href={`/?q=${searchParams.q || ''}&page=${searchParams.page || '1'}&details=${extractLastNumber(elem.url ? elem.url : '')}`}
                  className={
                    details === extractLastNumber(elem.url ? elem.url : '')
                      ? `${styles.list_item} ${styles.active}`
                      : styles.list_item
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    router.replace(
                      `/?q=${searchParams.q || ''}&page=${searchParams.page || '1'}&details=${extractLastNumber(elem.url ? elem.url : '')}`,
                      undefined,
                      { shallow: true },
                    );
                    setIsDetailedVisible(true);
                  }}
                >
                  <p className={theme === ThemeEnum.Light ? styles.title : `${styles.title} ${styles.dark}`}>
                    {elem.name}
                  </p>
                  <button
                    type="button"
                    name="favorite"
                    className={styles.favoriteBtn}
                    onClick={(e: React.MouseEvent) =>
                      isFavorite(elem.name) ? deleteFromFavorite(e, elem) : addToFavorite(e, elem)
                    }
                  >
                    {isFavorite(elem.name) ? '★' : '☆'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <h2>No results</h2>
      )}
    </section>
  );
};

export default ResultList;
