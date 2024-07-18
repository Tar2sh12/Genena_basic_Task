import mongoose from "mongoose";
const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      unique:true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    groupid:{
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Group",
    }
  },
  { timestamps: true }
);
export default mongoose.models.Customer || model("Customer", customerSchema);
