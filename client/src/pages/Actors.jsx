import { Box, Typography, Button, Chip } from "@mui/material";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PersonFormDialog from "../components/AddPerson";

const Actors = () => {
  const [actorsList, setActorsList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchActors = async () => {
    const res = await axios.get("/actors");
    setActorsList(res.data);
  };

  useEffect(() => {
    fetchActors();
  }, []);
  const addActor = async (data) => {
    const res = await axios.post("/actors", data);
    if (res.status === 201) {
      toast.success("Actor added successfully");
      setDialogOpen(false);
      fetchActors();
    }
  };
  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",my :3}}>
        <Typography variant="h5">Actors</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
          sx={{backgroundColor: "#FFC107", color: "black"}}

        >
          Add Actor
        </Button>
      </Box>
      <PersonFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={addActor}
        type="Actor"
      />
      <Box sx={{ mt: 2 }}>
        {actorsList.map((actor) => (
          <Chip key={actor._id} label={actor.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
    </Box>
  );
};

export default Actors;
