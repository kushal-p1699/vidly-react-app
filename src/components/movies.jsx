import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./like";
import Pagination from "./Pagination";

const MOVIES_PER_PAGE = 10;

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
  };

  deleteMovieRow = (movie) => {
    console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies, currenPage: this.state.currenPage });
  };

  toggleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies, currenPage: this.state.currenPage });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { movies: allMovies, currentPage } = this.state;

    if (moviesCount === 0) return <p>There is no movies in database</p>;

    const movies = paginate(allMovies, currentPage, MOVIES_PER_PAGE);
    console.log("paginated movies :", movies);

    return (
      <div className="container">
        <p>showing {moviesCount} movies in the table</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {/* {getMovieRows()} */}
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.toggleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.deleteMovieRow(movie)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          itemsCount={moviesCount}
          currentPage={currentPage}
          pageSize={MOVIES_PER_PAGE}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movies;

// paginating without using lodash
// const displayPageNumbers = () => {
//   const totalMovies = allMovies.length;
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalMovies / MOVIES_PER_PAGE); i++) {
//     pageNumbers.push(
//       <li
//         key={i}
//         className={`page-item ${currenPage === i ? "active" : ""}`}
//       >
//         <a
//           className="page-link"
//           onClick={() => {
//             this.setState({ movies: movies, currenPage: i });
//           }}
//         >
//           {i}
//         </a>
//       </li>
//     );
//   }
//   return pageNumbers;
// };

// const getMovieRows = () => {
//   const movieRows = [];
//   const startIndex = (this.state.currenPage - 1) * MOVIES_PER_PAGE;
//   for (
//     let i = startIndex;
//     i < this.state.movies.length && i < startIndex + MOVIES_PER_PAGE;
//     i++
//   ) {
//     const movie = this.state.movies[i];
//     console.log(movie);
//     movieRows.push(
//       <tr key={movie._id}>
//         <td>{movie.title}</td>
//         <td>{movie.genre.name}</td>
//         <td>{movie.numberInStock}</td>
//         <td>{movie.dailyRentalRate}</td>
//         <td>
//           <Like
//             liked={movie.liked}
//             onClick={() => this.toggleLike(movie)}
//           />
//         </td>
//         <td>
//           <button
//             onClick={() => this.deleteMovieRow(movie)}
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     );
//   }

//   return movieRows;
// };
