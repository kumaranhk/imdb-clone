import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem
  } from "@mui/material";
  import { useState } from "react";
  
  const genders = ["male", "female", "other"];
  
  const PersonFormDialog = ({ open, onClose, onSubmit, type }) => {
    const [formData, setFormData] = useState({
      name: "",
      dob: "",
      gender: "",
      bio: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      onSubmit(formData);
      setFormData({ name: "", dob: "", gender: "", bio: "" });
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Add New {type}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            type="date"
            name="dob"
            label="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            select
            name="gender"
            label="Gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {g[0].toUpperCase() + g.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="dense"
            label="Bio (optional)"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default PersonFormDialog;
  