import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload";
const CLOUDINARY_PRESET = "<your_preset>";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", year: "", producer: "", actors: "", poster: "" });
  const [posterFile, setPosterFile] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get("http://localhost:5000/api/movies");
    setMovies(res.data);
  };

  const handlePosterUpload = async () => {
    const formData = new FormData();
    formData.append("file", posterFile);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    const res = await axios.post(CLOUDINARY_URL, formData);
    return res.data.secure_url;
  };

  const handleSubmit = async () => {
    let posterUrl = "";
    if (posterFile) {
      posterUrl = await handlePosterUpload();
    }
    const actorList = form.actors.split(",").map((a) => a.trim());
    await axios.post("http://localhost:5000/api/movies", {
      name: form.name,
      year: form.year,
      producer: form.producer,
      actors: actorList,
      poster: posterUrl,
    });
    setOpen(false);
    fetchMovies();
  };

  const filteredMovies = movies.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">IMDb Clone</Typography>
        </Toolbar>
      </AppBar>

      <Container>
        <TextField
          fullWidth
          margin="normal"
          label="Search Movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Movie
        </Button>
        <Grid container spacing={2} mt={2}>
          {filteredMovies.map((movie) => (
            <Grid item xs={12} md={4} key={movie._id}>
              <Card>
                <CardMedia component="img" height="140" image={movie.poster} alt={movie.name} />
                <CardContent>
                  <Typography variant="h6">{movie.name}</Typography>
                  <Typography variant="body2">Year: {movie.year}</Typography>
                  <Typography variant="body2">Producer: {movie.producer}</Typography>
                  <Typography variant="body2">Actors: {movie.actors.join(", ")}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Movie</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField fullWidth margin="dense" label="Year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          <TextField fullWidth margin="dense" label="Producer" value={form.producer} onChange={(e) => setForm({ ...form, producer: e.target.value })} />
          <TextField fullWidth margin="dense" label="Actors (comma separated)" value={form.actors} onChange={(e) => setForm({ ...form, actors: e.target.value })} />
          <input type="file" accept="image/*" onChange={(e) => setPosterFile(e.target.files[0])} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
