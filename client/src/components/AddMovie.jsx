import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
  Chip,
} from "@mui/material";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PersonFormDialog from "./AddPerson";

const AddMovie = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    producer: "",
    actors: [],
    poster: "",
    plot: "",
  });
  const [actorsList, setActorsList] = useState([]);
  const [producersList, setProducersList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/movies/${id}`, formData);
        toast.success("Movie updated successfully");
      } else {
        await axios.post("/movies", formData);
        toast.success("Movie added successfully");
        setFormData({
          name: "",
          year: "",
          producer: "",
          actors: [],
          poster: "",
          plot: "",
        });
      }
      console.log("Submitted", formData);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchActorsAndProducers = async () => {
    try {
      const res = await axios.get("/actors");
      setActorsList(res.data);
      const res2 = await axios.get("/producers");
      setProducersList(res2.data);
    } catch (error) {
      console.error("Error fetching actors or producers", error);
    }
  };

  const fetchMovie = async () => {
    if (id) {
      const response = await axios.get(`/movies/${id}`);
      const { name, year, plot, producer, actors, poster } = response.data;

      setFormData({
        name,
        year,
        plot,
        producer: producer._id,
        actors: actors.map((actor) => actor._id),
        poster,
      });
    }
  };

  const addProducer = async (data) => {
    try {
      const res = await axios.post("/producers", data);
      if (res.status === 201) {
        toast.success("Producer added successfully");
        setDialogOpen(false);
        fetchActorsAndProducers();
      }
    } catch (error) {
      console.error("Failed to add producer", error);
    }
  };

  const addActor = async (data) => {
    try {
      const res = await axios.post("/actors", data);
      if (res.status === 201) {
        toast.success("Actor added successfully");
        setDialogOpen(false);
        fetchActorsAndProducers();
      }
    } catch (error) {
      console.error("Failed to add actor", error);
    }
  };

  useEffect(() => {
    fetchActorsAndProducers();
    fetchMovie();
  }, [id]);

  return (
    <Box>
      <Box>
        <Typography>{id ? "Edit Movie" : "Add New Movie"}</Typography>
      </Box>
      <Box>
        <TextField
          fullWidth
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Plot"
          type="text"
          name="plot"
          value={formData.plot}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Poster URL"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
        />
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Producer</InputLabel>
            <Select
              value={formData.producer}
              name="producer"
              label="Producer"
              onChange={handleChange}
            >
              {producersList.map((producer) => (
                <MenuItem key={producer._id} value={producer._id}>
                  {producer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{
              width: 200,
              height: 55,
              backgroundColor: "#FFC107",
              color: "black",
            }}
            variant="contained"
            onClick={() => setDialogOpen(true)}
          >
            New Producer
          </Button>
        </Box>
        {dialogOpen && (
          <PersonFormDialog
            onSubmit={addProducer}
            type="Producer"
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        )}
        <Box display="flex" alignItems="center" gap={2}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Actors</InputLabel>
            <Select
              multiple
              value={formData.actors}
              name="actors"
              onChange={(e) =>
                setFormData({ ...formData, actors: e.target.value })
              }
              input={<OutlinedInput label="Actors" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => {
                    const actor = actorsList.find((a) => a._id === value);
                    return <Chip key={value} label={actor?.name || value} />;
                  })}
                </Box>
              )}
            >
              {actorsList.map((actor) => (
                <MenuItem key={actor._id} value={actor._id}>
                  {actor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{
              width: 200,
              height: 55,
              backgroundColor: "#FFC107",
              color: "black",
            }}
            variant="contained"
            onClick={() => setDialogOpen(true)}
          >
            New Actor
          </Button>
        </Box>
        {dialogOpen && (
          <PersonFormDialog
            onSubmit={addActor}
            type="Actor"
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        )}
        <Box>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#FFC107", color: "black" }}
            onClick={handleSubmit}
          >
            {id ? "Update" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddMovie;
