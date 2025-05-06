import movieModel from "../../models/movies.model.js";
import actorModel from "../../models/actors.model.js";
import producerModel from "../../models/producer.model.js";

export const movieController = {
  getMovies: async (req, res) => {
    try {
      const movies = await movieModel
        .find({ deletedAt: null })
        .populate("actors")
        .populate("producer");
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  getMovieById: async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ msg: "Movie ID is required" });
    try {
      const movie = await movieModel
        .findOne({ _id: id, deletedAt: null })
        .populate("actors")
        .populate("producer");

      if (!movie) return res.status(404).json({ msg: "Movie not found" });
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  createMovie: async (req, res) => {
    try {
      const { name, yearOfRelease, plot, actors, producer, poster } = req.body;
      const { user } = req;
      console.log({ name, yearOfRelease, plot, actors, producer, poster });

      if (
        !name ||
        !yearOfRelease ||
        !plot ||
        !Array.isArray(actors) ||
        !producer ||
        !poster
      ) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const validActors = await actorModel.find({
        _id: { $in: actors },
        deletedAt: null,
      });
      const validProducer = await producerModel.findOne({
        _id: producer,
        deletedAt: null,
      });

      if (validActors.length !== actors.length) {
        return res
          .status(400)
          .json({ msg: "Some actors are invalid or deleted" });
      }

      if (!validProducer) {
        return res.status(400).json({ msg: "Producer is invalid or deleted" });
      }

      const movie = await movieModel.create({
        name,
        yearOfRelease,
        plot,
        actors,
        producer,
        poster,
        createdBy: user._id,
        UpdatedBy: user._id,
      });

      res.status(201).json({ msg: "Movie created successfully", movie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  editMovie: async (req, res) => {
    const { id } = req.params;
    const { name, yearOfRelease, plot, actorIds, producerId } = req.body;
    const { user } = req;

    if (!id) return res.status(400).json({ msg: "Movie ID is required" });

    try {
      const movie = await movieModel.findOne({ _id: id, deletedAt: null });
      if (!movie) return res.status(404).json({ msg: "Movie not found" });

      const validActors = await actorModel.find({
        _id: { $in: actorIds },
        deletedAt: null,
      });
      const validProducer = await producerModel.findOne({
        _id: producerId,
        deletedAt: null,
      });

      if (validActors.length !== actorIds.length) {
        return res
          .status(400)
          .json({ msg: "Some actors are invalid or deleted" });
      }

      if (!validProducer) {
        return res.status(400).json({ msg: "Producer is invalid or deleted" });
      }

      await movieModel.updateOne(
        { _id: id },
        {
          $set: {
            name,
            yearOfRelease,
            plot,
            actors: actorIds,
            producer: producerId,
            UpdatedBy: user._id,
          },
        }
      );

      res.json({ msg: "Movie updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  deleteMovie: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    if (!id) return res.status(400).json({ msg: "Movie ID is required" });

    try {
      const movie = await movieModel.findOne({ _id: id, deletedAt: null });
      if (!movie) return res.status(404).json({ msg: "Movie not found" });
      await movieModel.updateOne(
        { _id: id },
        { $set: { deletedAt: new Date().toISOString(), deletedBy: user._id } }
      );
      res.json({ msg: "Movie deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};
