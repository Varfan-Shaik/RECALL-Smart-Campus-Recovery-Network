export function generateHotspotInsights(reports) {
  const locationMap = {}

  reports.forEach((report) => {
    const location = report.location.trim()

    if (!locationMap[location]) {
      locationMap[location] = {
        location,
        total: 0,
        lost: 0,
        found: 0,
        returned: 0,
      }
    }

    locationMap[location].total += 1

    if (report.status === 'Lost') {
      locationMap[location].lost += 1
    }

    if (report.status === 'Found') {
      locationMap[location].found += 1
    }

    if (report.status === 'Returned') {
      locationMap[location].returned += 1
    }
  })

  return Object.values(locationMap)
    .map((hotspot) => ({
      ...hotspot,
      riskLevel:
        hotspot.lost >= 3
          ? 'High'
          : hotspot.lost >= 2
            ? 'Moderate'
            : 'Low',
    }))
    .sort((first, second) => second.total - first.total)
}