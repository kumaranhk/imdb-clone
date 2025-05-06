import { Box, Typography, Button, Chip } from "@mui/material";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PersonFormDialog from "../components/AddPerson";

const Producers = () => {
  const [ProducerList, setProducerList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchActors = async () => {
    const res = await axios.get("/producers");
    setProducerList(res.data);
  };

  useEffect(() => {
    fetchActors();
  }, []);
  const addProducer = async (data) => {
    const res = await axios.post("/producers", data);
    if (res.status === 201) {
      toast.success("Producer added successfully");
      setDialogOpen(false);
      fetchActors();
    }
  };
  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center",my :3}}>
        <Typography variant="h5">Producers</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
          sx={{backgroundColor: "#FFC107", color: "black"}}
        >
          Add Producer
        </Button>
      </Box>
      <PersonFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={addProducer}
        type="Actor"
      />
      <Box sx={{ mt: 2 }}>
        {ProducerList.map((actor) => (
          <Chip key={actor._id} label={actor.name} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
    </Box>
  );
};

export default Producers;
