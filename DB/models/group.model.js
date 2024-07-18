import mongoose from "mongoose";
const { Schema, model } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);
export default mongoose.models.Group || model("Group", groupSchema);