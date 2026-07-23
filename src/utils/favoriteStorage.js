export function getFavorites() {
  return JSON.parse(localStorage.getItem('recallFavorites')) || []
}

export function isFavorite(reportId) {
  return getFavorites().some((item) => item._id === reportId)
}

export function toggleFavorite(report) {
  const favorites = getFavorites()

  const exists = favorites.some(
    (item) => item._id === report._id,
  )

  const updatedFavorites = exists
    ? favorites.filter(
        (item) => item._id !== report._id,
      )
    : [report, ...favorites]

  localStorage.setItem(
    'recallFavorites',
    JSON.stringify(updatedFavorites),
  )

  return updatedFavorites
}