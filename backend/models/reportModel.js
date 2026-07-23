import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    
    recoveryId: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Lost", "Found"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Lost", "Found", "Returned"],
      default: "Lost",
    },

    color: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;