function normalizeText(value = '') {
  return value.toLowerCase().trim()
}

function getWords(value = '') {
  return normalizeText(value)
    .split(/\s+/)
    .filter((word) => word.length > 2)
}

function calculateKeywordScore(firstTitle, secondTitle) {
  const firstWords = getWords(firstTitle)
  const secondWords = getWords(secondTitle)

  if (firstWords.length === 0 || secondWords.length === 0) {
    return 0
  }

  const matchingWords = firstWords.filter((word) =>
    secondWords.some(
      (secondWord) =>
        secondWord.includes(word) || word.includes(secondWord),
    ),
  )

  return Math.min(
    25,
    Math.round((matchingWords.length / firstWords.length) * 25),
  )
}

function calculateDateScore(firstDate, secondDate) {
  const first = new Date(firstDate)
  const second = new Date(secondDate)

  const difference = Math.abs(first - second)
  const days = difference / (1000 * 60 * 60 * 24)

  if (days <= 1) return 15
  if (days <= 3) return 10
  if (days <= 7) return 5

  return 0
}

export function calculateMatchScore(lostItem, foundItem) {
  let score = 0
  const reasons = []

  if (
    normalizeText(lostItem.category) ===
    normalizeText(foundItem.category)
  ) {
    score += 30
    reasons.push('Same item category')
  }

  if (
    lostItem.color &&
    normalizeText(lostItem.color) ===
      normalizeText(foundItem.color)
  ) {
    score += 20
    reasons.push('Matching color')
  }

  const keywordScore = calculateKeywordScore(
    lostItem.title,
    foundItem.title,
  )

  if (keywordScore > 0) {
    score += keywordScore
    reasons.push('Similar item description')
  }

  if (
    normalizeText(lostItem.location) ===
    normalizeText(foundItem.location)
  ) {
    score += 10
    reasons.push('Same campus location')
  }

  const dateScore = calculateDateScore(
    lostItem.date,
    foundItem.date,
  )

  if (dateScore > 0) {
    score += dateScore
    reasons.push('Reported within a close time period')
  }

  return {
    score: Math.min(score, 100),
    reasons,
  }
}

export function generateSmartMatches(reports) {
  const lostItems = reports.filter(
    (report) => report.status === 'Lost',
  )

  const foundItems = reports.filter(
    (report) => report.status === 'Found',
  )

  const matches = []

  lostItems.forEach((lostItem) => {
    foundItems.forEach((foundItem) => {
      const result = calculateMatchScore(lostItem, foundItem)

      if (result.score >= 30) {
        matches.push({
          id: `${lostItem.id}-${foundItem.id}`,
          lostItem,
          foundItem,
          score: result.score,
          reasons: result.reasons,
        })
      }
    })
  })

  return matches.sort(
    (first, second) => second.score - first.score,
  )
}