import Counter from "../models/counterModel.js";

export const generateCaseId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    "report",
    {
      $inc: { sequence: 1 },
    },
    {
      new: true,
      upsert: true,
    }
  );

  const year = new Date().getFullYear();

  return `RCL-${year}-${String(counter.sequence).padStart(4, "0")}`;
};