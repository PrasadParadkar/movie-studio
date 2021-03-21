import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/pagination';
import './movie-container.css';

const MovieContainer = () => {
  //Maintaining state for movies data
  const [movies, setMovies] = useState([]);
  //Maintaining state for pagination purposes
  const [pagination, setPagination] = useState({
    totalPages: 0,
    limit: 8,
    currentPage: 0,
    moviesData: [],
    firstPage: true,
    lastPage: false
  });

  //Event handler for Next page button click event
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

  //Event handler for Previous page button click event
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

  //Event handler for page selection event
  const changePageHandler = (index) => {
    setPagination({
      ...pagination,
      currentPage: index,
      firstPage: index === 0 ? true : false,
      lastPage: index === pagination.totalPages - 1 ? true : false
    });
  }

  //useEffect to fetch data from API
  useEffect(() => {
    async function fetchMovies() {
      const data = await fetch('https://ghibliapi.herokuapp.com/films')
        .then(resp => resp.json())
        .then(data => data)
        .catch(err => { throw new Error('Something went wrong') });
      setPagination({ ...pagination, moviesData: data });
    }
    fetchMovies();
  }, []);

  //useEffect to set movies data to display on the screen 
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