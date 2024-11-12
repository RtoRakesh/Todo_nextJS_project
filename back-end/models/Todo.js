const { model, Schema, default: mongoose } = require("mongoose");

const TodoSchema = new Schema({
  text: { type: String, required: true },
  completed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Todo", TodoSchema);
