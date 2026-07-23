import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function migrate() {
  try {
    // Connect to MongoDB using your .env URI (currently points to "recall")
    await mongoose.connect(process.env.MONGODB_URI);

    // Source database
    const testDb = mongoose.connection.useDb("test");

    // Destination database
    const recallDb = mongoose.connection.useDb("recall");

    // Collections
    const testReports = testDb.collection("reports");
    const recallReports = recallDb.collection("reports");

    const testCounters = testDb.collection("counters");
    const recallCounters = recallDb.collection("counters");

    // Read reports from test
    const reports = await testReports.find({}).toArray();

    let nextSequence = 1;

    // Fix missing recoveryIds
    const updatedReports = reports.map((report) => {
      if (report.recoveryId) {
        const number = parseInt(report.recoveryId.split("-").pop(), 10);
        if (!isNaN(number) && number >= nextSequence) {
          nextSequence = number + 1;
        }
        return report;
      }

      report.recoveryId = `RCL-${new Date().getFullYear()}-${String(nextSequence).padStart(4, "0")}`;
      nextSequence++;

      return report;
    });

    // Clear destination reports
    await recallReports.deleteMany({});

    // Insert reports
    if (updatedReports.length > 0) {
      await recallReports.insertMany(updatedReports);
    }

    console.log(`✅ Copied ${updatedReports.length} reports`);

    // Clear destination counters
    await recallCounters.deleteMany({});

    // Copy or recreate counter
    const counter = await testCounters.findOne({ _id: "report" });

    await recallCounters.insertOne({
      _id: "report",
      sequence: Math.max(
        counter?.sequence || 0,
        nextSequence - 1
      ),
    });

    console.log("✅ Counter migrated");

    console.log("🎉 Migration completed successfully!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

migrate();