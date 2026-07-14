import ItemCard from '../components/ItemCard'

function RecentlyViewed() {
  const recentlyViewed =
    JSON.parse(localStorage.getItem('recallRecentlyViewed')) || []

  return (
    <section className="collection-page">
      <div className="collection-heading">
        <p className="eyebrow">RECOVERY HISTORY</p>
        <h1>Recently viewed.</h1>

        <p>
          Return to recovery cases you inspected recently.
        </p>
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="empty-state">
          <span>◎</span>
          <h2>No recently viewed cases.</h2>
          <p>
            Open a recovery case and it will appear here.
          </p>
        </div>
      ) : (
        <div className="items-grid">
          {recentlyViewed.map((report) => (
            <ItemCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecentlyViewed