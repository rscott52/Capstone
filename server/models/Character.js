import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  character: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 -]*$/
  }
});

const Character = mongoose.model("Character", characterSchema);

export default Character;
