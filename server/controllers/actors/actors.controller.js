import actorModel from "../../models/actors.model.js";

export const actorController = {
  getActors: async (req, res) => {
    try {
      const actors = await actorModel.find({ deletedAt: null });
      // const req = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=19109432');
      // const data = await req.json();
      // console.log(data);
      res.json(actors);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  getActorById: async (req, res) => {
    const { id } = req.params;
    try {
      const actor = await actorModel.findOne({ _id: id, deletedAt: null });
      if (!actor) return res.status(404).json({ msg: "Actor not found" });
      res.json(actor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  createActor: async (req, res) => {
    const { body } = req;
    const { user } = req;
    try {
      const actor = await actorModel.create({
        name: body.name,
        dob: body.dob,
        gender: body.gender,
        bio: body.bio,
        createdBy: user._id,
        UpdatedBy: user._id,
      });

      res.json({ msg: "Actor created successfully", actor });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  editActor: async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const { user } = req;
    try {
      if (!id)
        return res
          .status(400)
          .json({ msg: "Id required for updataing the actor" });
      const actor = await actorModel.findOne({ _id: id, deletedAt: null });
      if (!actor) res.status(404).json({ msg: "Actor does not found" });
      await actorModel.updateOne(
        { _id: id },
        {
          $set: {
            name: body.name,
            dob: body.dob,
            gender: body.gender,
            bio: body.bio,
            UpdatedBy: user._id,
          },
        }
      );
      res.json({ msg: "Actor updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  deleteActor: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    try {
      if (!id)
        return res
          .status(400)
          .json({ msg: "Id required for deleting the actor" });
      const actor = await actorModel.findOne({ _id: id, deletedAt: null });
      if (!actor) res.status(404).json({ msg: "Actor does not found" });
      await actorModel.updateOne(
        { _id: id },
        {
          $set: {
            deletedAt: new Date().toISOString(),
            deletedBy: user._id,
          },
        }
      );
      res.json({ msg: "Actor Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};
