import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/pagination';
import './movie-container.css';

const MovieContainer = () => {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    limit: 8,
    currentPage: 0,
    moviesData: [],
    firstPage: true,
    lastPage: false
  });

  const nextPageHandler = () => {
    setPagination((prevState) => {
      if (prevState.currentPage + 1 >= pagination.totalPages) {
        return pagination;
      }
      return {
        ...pagination,
        currentPage: prevState.currentPage + 1,
        firstPage: prevState.currentPage + 1 < 0 ? true : false,
        lastPage: prevState.currentPage + 1 === pagination.totalPages - 1 ? true : false
      };
    });
  }

  const prevPageHandler = () => {
    setPagination((prevState) => {
      if (prevState.currentPage - 1 < 0) {
        return pagination;
      }
      return {
        ...pagination,
        currentPage: prevState.currentPage - 1,
        firstPage: prevState.currentPage - 1 === 0 ? true : false,
        lastPage: prevState.currentPage - 1 < pagination.totalPages ? false : true
      };
    });
  }

  const changePageHandler = (index) => {
    setPagination({
      ...pagination,
      currentPage: index,
      firstPage: index === 0 ? true : false,
      lastPage: index === pagination.totalPages - 1 ? true : false
    });
  }

  useEffect(() => {
    async function fetchMovies() {
      const data = await fetch('https://ghibliapi.herokuapp.com/films')
        .then(resp => resp.json())
        .then(data => data);
      setPagination({ ...pagination, moviesData: data });
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(pagination.moviesData.length / pagination.limit);
    setPagination({ ...pagination, totalPages })
    const data = pagination.moviesData.slice(pagination.limit * pagination.currentPage, (pagination.limit * pagination.currentPage) + pagination.limit);
    setMovies(data);
  }, [pagination.moviesData, pagination.currentPage]);

  return (
    <>
      { movies.length > 0 &&
        <>
          <div className="movie-wrapper">
            {
              movies.map(movie => {
                return (
                  <div key={movie.id} className="movie-card">
                    <p className="movie-card__header">{movie.title}</p>
                    <p className="movie-card__body">{movie.description}</p>
                    <div className="movie-card__footer">
                      <p>{`Year ${movie.release_date}`}</p>
                      <p>{`${movie.running_time} Mins`}</p>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <Pagination nextPageHandler={nextPageHandler} prevPageHandler={prevPageHandler} changePageHandler={changePageHandler}
            totalPages={pagination.totalPages} first={pagination.firstPage} last={pagination.lastPage} />
        </>
      }
    </>
  )
}

export default MovieContainer;