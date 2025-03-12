class MovieManager {
    private movies: Movie[] = [];
    private ratings: Map<string, number[]> = new Map();
  
    addMovie(movie: Movie): void {
      this.movies.push(movie);
      this.ratings.set(movie.id, []);
    }
  
    rateMovie(id: string, rating: number): void {
      if (rating < 1 || rating > 5) {
        console.error("Rating must be between 1 and 5.");
        return;
      }
      const movieRatings = this.ratings.get(id);
      if (movieRatings) {
        movieRatings.push(rating);
      } else {
        console.error("Movie not found.");
      }
    }
  
    getAverageRating(id: string): number | undefined {
      const movieRatings = this.ratings.get(id);
      if (!movieRatings || movieRatings.length === 0) return undefined;
      const total = movieRatings.reduce((sum, r) => sum + r, 0);
      return total / movieRatings.length;
    }
  
    getTopRatedMovies(): Movie[] {
      return this.movies
        .map((movie) => ({
          ...movie,
          avgRating: this.getAverageRating(movie.id) || 0,
        }))
        .sort((a, b) => b.avgRating - a.avgRating);
    }
  
    getMoviesByGenre(genre: string): Movie[] {
      return this.movies.filter((movie) =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
  
    getMoviesByDirector(director: string): Movie[] {
      return this.movies.filter(
        (movie) => movie.director.toLowerCase() === director.toLowerCase()
      );
    }
  
    searchMoviesBasedOnKeyword(keyword: string): Movie[] {
      return this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  
    getMovie(id: string): Movie | undefined {
      return this.movies.find((movie) => movie.id === id);
    }
  
    removeMovie(id: string): void {
      this.movies = this.movies.filter((movie) => movie.id !== id);
      this.ratings.delete(id);
    }
  }
  
  interface Movie {
    id: string;
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
  }
  
  const manager = new MovieManager();
  
  manager.addMovie({
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    releaseYear: 2010,
    genre: "Sci-Fi",
  });
  
  manager.addMovie({
    id: "2",
    title: "Interstellar",
    director: "Christopher Nolan",
    releaseYear: 2014,
    genre: "Sci-Fi",
  });
  
  manager.rateMovie("1", 5);
  manager.rateMovie("1", 4);
  manager.rateMovie("2", 5);
  
  console.log("Top Rated Movies:", manager.getTopRatedMovies());
  console.log("Movies by Nolan:", manager.getMoviesByDirector("Christopher Nolan"));
  console.log("Sci-Fi Movies:", manager.getMoviesByGenre("Sci-Fi"));
  console.log("Search for 'Inception':", manager.searchMoviesBasedOnKeyword("Inception"));
  console.log("Movie Details:", manager.getMovie("1"));
  
  manager.removeMovie("1");
  console.log("After Deleting Inception:", manager.getMoviesByDirector("Christopher Nolan"));
  