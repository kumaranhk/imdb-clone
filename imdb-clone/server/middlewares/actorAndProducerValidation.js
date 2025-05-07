export const actorAndProducerValidation = (req, res, next) => {
  const { body } = req;

  if (!body?.name || !body?.dob || !body?.gender) {
    return res.status(400).json({ msg: "Name, gender, and Date of Birth are required" });
  }
  if (!["male", "female", "others"].includes(body.gender)) {
    return res.status(400).json({ msg: "Invalid gender" });
  }
  const dobDate = new Date(body.dob);
  if (dobDate > new Date()) {
    return res.status(400).json({ msg: "Invalid Date of Birth" });
  }

  next();
  
};
