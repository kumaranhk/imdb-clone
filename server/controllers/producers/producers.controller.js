import producerModel from "../../models/producer.model.js";

export const producerController = {
  getProducers: async (req, res) => {
    try {
      const producers = await producerModel.find({ deletedAt: null });
      res.json(producers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getProducerById: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ msg: "Id is required" });

    try {
      const producer = await producerModel.findOne({
        _id: id,
        deletedAt: null,
      });
      if (!producer) return res.status(404).json({ msg: "Producer not found" });
      res.json(producer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  createProducer: async (req, res) => {
    const { name, dob, gender, bio } = req.body;
    const { user } = req;
    try {
      const producer = await producerModel.create({
        name,
        dob,
        gender,
        bio,
        createdBy: user._id,
        UpdatedBy: user._id,
      });
      res.status(201).json({ msg: "Producer created successfully", producer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  editProducer: async (req, res) => {
    const { id } = req.params;
    const { name, dob, gender, bio } = req.body;
    const { user } = req;
    if (!id)
      return res
        .status(400)
        .json({ msg: "Id is required for updating the producer" });

    try {
      const producer = await producerModel.findOne({
        _id: id,
        deletedAt: null,
      });
      if (!producer) return res.status(404).json({ msg: "Producer not found" });

      await producerModel.updateOne(
        { _id: id },
        { $set: { name, dob, gender, bio, UpdatedBy: user._id } }
      );
      res.json({ msg: "Producer updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  deleteProducer: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    if (!id)
      return res
        .status(400)
        .json({ msg: "Id is required for deleting the producer" });

    try {
      const producer = await producerModel.findOne({
        _id: id,
        deletedAt: null,
      });
      if (!producer) return res.status(404).json({ msg: "Producer not found" });

      await producerModel.updateOne(
        { _id: id },
        { $set: { deletedAt: new Date().toISOString(), deletedBy: user._id } }
      );
      res.json({ msg: "Producer deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};
