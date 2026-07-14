import defaultReports from '../data/reports'

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