import defaultReports from '../data/reports'
import { addActivity } from './activityStorage'

export function getReports() {
  const savedReports = localStorage.getItem('recallReports')

  if (savedReports) {
    return JSON.parse(savedReports)
  }

  localStorage.setItem(
    'recallReports',
    JSON.stringify(defaultReports),
  )

  return defaultReports
}

export function saveReports(reports) {
  localStorage.setItem('recallReports', JSON.stringify(reports))
}

export function generateRecoveryId(reports) {
  const highestNumber = reports.reduce((highest, report) => {
    const number = Number(report.id.split('-').pop())

    return number > highest ? number : highest
  }, 0)

  return `RCL-2026-${String(highestNumber + 1).padStart(4, '0')}`
}

export function updateReport(updatedReport) {
  const reports = getReports()

  const updatedReports = reports.map((report) =>
    report.id === updatedReport.id ? updatedReport : report,
  )

  saveReports(updatedReports)

  addActivity(
    'Edited',
    `${updatedReport.title} recovery case was updated.`,
  )

  return updatedReports
}

export function deleteReport(reportId) {
  const reports = getReports()

  const deletedReport = reports.find(
    (report) => report.id === reportId,
  )

  if (deletedReport) {
    localStorage.setItem(
      'recallLastDeletedReport',
      JSON.stringify(deletedReport),
    )

    addActivity(
      'Deleted',
      `${deletedReport.title} recovery case was deleted.`,
    )
  }

  const updatedReports = reports.filter(
    (report) => report.id !== reportId,
  )

  saveReports(updatedReports)

  return updatedReports
}

export function undoDeleteReport() {
  const deletedReport = JSON.parse(
    localStorage.getItem('recallLastDeletedReport'),
  )

  if (!deletedReport) return null

  const reports = getReports()

  const alreadyExists = reports.some(
    (report) => report.id === deletedReport.id,
  )

  if (!alreadyExists) {
    saveReports([deletedReport, ...reports])

    addActivity(
      'Restored',
      `${deletedReport.title} recovery case was restored.`,
    )
  }

  localStorage.removeItem('recallLastDeletedReport')

  return deletedReport
}