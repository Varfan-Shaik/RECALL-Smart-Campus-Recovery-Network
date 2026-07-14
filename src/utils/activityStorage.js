export function getActivities() {
  return (
    JSON.parse(localStorage.getItem('recallActivities')) || []
  )
}

export function addActivity(type, message) {
  const activities = getActivities()

  const newActivity = {
    id: Date.now(),
    type,
    message,
    time: new Date().toLocaleString(),
  }

  const updatedActivities = [
    newActivity,
    ...activities,
  ].slice(0, 10)

  localStorage.setItem(
    'recallActivities',
    JSON.stringify(updatedActivities),
  )

  return updatedActivities
}