import { useState, useEffect } from "react";
import {
  getPopularMovies,
  getSearchQueryMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "./movieApi";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let movieData;
        if (query) {
          movieData = await getSearchQueryMovies(query);
        } else {
          switch (selectedCategory) {
            case "topRated":
              movieData = await getTopRatedMovies();
              break;
            case "trending":
              movieData = await getTrendingMovies();
              break;
            case "upcoming":
              movieData = await getUpcomingMovies();
              break;
            case "popular":
            default:
              movieData = await getPopularMovies();
              break;
          }
        }
        setMovies(movieData.results);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovies();
  }, [query, selectedCategory]);

  const handleSelectMovie = async (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (error) {
    return <div>Error fetching movies: {error.message}</div>;
  }

  return (
    <Container className="my-4">
      <header className="d-flex justify-content-center mb-4">
        <Form className="d-flex align-items-center gap-3 w-75">
          <Form.Control
            type="text"
            placeholder="Search for a movie, TV show, or person..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Form.Select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="popular">Popular</option>
            <option value="topRated">Top Rated</option>
            <option value="trending">Trending</option>
            <option value="upcoming">Upcoming</option>
          </Form.Select>
        </Form>
      </header>

      <Row className="gy-4">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="img-fluid"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-center">{movie.title}</Card.Title>
                  <Card.Text className="text-muted text-center">
                    {new Date(movie.release_date).toDateString()}
                  </Card.Text>
                  <Button
                    variant="success"
                    className="mt-auto"
                    onClick={() => handleSelectMovie(movie.id)}
                  >
                    Select Movie
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No movies to display</div>
        )}
      </Row>
    </Container>
  );
};

export default Movies;
