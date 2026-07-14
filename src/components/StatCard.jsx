function StatCard({ label, value, icon, trend }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <p>{label}</p>
        <h3>{value}</h3>
        {trend && <span className="stat-trend">{trend}</span>}
      </div>
    </article>
  )
}

export default StatCard