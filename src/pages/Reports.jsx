import { useEffect, useState } from 'react'
import api from '../services/api'
import ItemCard from '../components/ItemCard'

function Reports() {
  const [reports, setReports] = useState([])
  const [restoredMessage, setRestoredMessage] = useState('')

  const [search, setSearch] = useState(
    () => sessionStorage.getItem('recallReportSearch') || '',
  )

  const [statusFilter, setStatusFilter] = useState(
    () => sessionStorage.getItem('recallStatusFilter') || 'All',
  )

  const [sortOrder, setSortOrder] = useState(
    () => sessionStorage.getItem('recallSortOrder') || 'Newest',
  )

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get('/reports')

        console.log('API Response:', response.data)

        setReports(response.data)
      } catch (error) {
        console.error('Failed to fetch reports:', error)
      }
    }

    fetchReports()
  }, [])

  const filteredReports = reports
    .filter((report) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        report.title.toLowerCase().includes(searchText) ||
        report.location.toLowerCase().includes(searchText) ||
        (report.recoveryId || report._id)
          .toLowerCase()
          .includes(searchText)

      const matchesStatus =
        statusFilter === 'All' ||
        report.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((first, second) => {
      if (sortOrder === 'Name') {
        return first.title.localeCompare(second.title)
      }

      return new Date(second.createdAt) - new Date(first.createdAt)
    })

  return (
    <section className="reports-page">
      <div className="reports-heading">
        <p className="eyebrow">CAMPUS RECOVERY RECORDS</p>
        <h1>Browse recovery signals.</h1>
        <p>
          Search lost and found reports across the RECALL network.
        </p>
      </div>

      <div className="reports-controls">
        <input
          type="search"
          placeholder="Search item, location or Recovery ID..."
          value={search}
          onChange={(event) => {
            const value = event.target.value
            setSearch(value)
            sessionStorage.setItem('recallReportSearch', value)
          }}
        />

        <select
          value={statusFilter}
          onChange={(event) => {
            const value = event.target.value
            setStatusFilter(value)
            sessionStorage.setItem('recallStatusFilter', value)
          }}
        >
          <option>All</option>
          <option>Lost</option>
          <option>Found</option>
          <option>Returned</option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => {
            const value = event.target.value
            setSortOrder(value)
            sessionStorage.setItem('recallSortOrder', value)
          }}
        >
          <option>Newest</option>
          <option>Name</option>
        </select>
      </div>

      {restoredMessage && (
        <div className="success-message">
          {restoredMessage}
        </div>
      )}

      {filteredReports.length === 0 ? (
        <div className="empty-state">
          <span>⌕</span>
          <h2>No recovery signals found.</h2>
          <p>Try changing your search or filter.</p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredReports.map((report) => (
            <ItemCard
              key={report._id}
              report={report}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Reports