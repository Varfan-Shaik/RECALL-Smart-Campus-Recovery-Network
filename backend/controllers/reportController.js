import Report from "../models/reportModel.js";

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);

    res.status(201).json({
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editReport = async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: 'after'
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json({
      message: "Report updated successfully",
      report: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeReport = async (req, res) => {
  try {
    const deleted = await Report.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json({
      message: "Report deleted successfully",
      report: deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};