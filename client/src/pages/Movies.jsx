import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  CardActions,
} from "@mui/material";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  // console.log(user)

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get("/movies");
    console.log(res.data);
    setMovies(res.data);
  };
  const handleDelete = async (id) => {
    const res = await axios.delete(`/movies/${id}`);
    if (res.status === 200) {
      toast.success("Movie deleted successfully");
      fetchMovies();
    }
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 3,
          }}
        >
          <Typography variant="h5">Movies</Typography>
          <Button
            variant="contained"
            sx={{
              height: 60,
              width: 150,
              backgroundColor: "#FFC107",
              color: "black",
            }}
            onClick={() => navigate("/add-movie")}
          >
            Add Movie
          </Button>
        </Box>
        <Grid container spacing={2} mt={2}>
          {movies.map((movie) => (
            <Grid item xs={12} md={4} key={movie._id}>
              <Card sx={{ height: "100%", maxHeight: "500px" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.poster}
                  alt={movie.name}
                />
                <CardContent>
                  <Typography variant="h6">{movie.name}</Typography>
                  <Typography variant="body2">
                    Year: {movie.yearOfRelease}
                  </Typography>
                  <Typography variant="body2">
                    Producer: {movie.producer?.name}
                  </Typography>
                  <Typography variant="body2">
                    Actors: {movie.actors.map((val) => val.name).join(", ")}
                  </Typography>
                </CardContent>
                {user && (
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#FFC107", color: "black" }}
                      onClick={() => navigate(`/edit-movie/${movie._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red", color: "white" }}
                      onClick={() => handleDelete(movie._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
