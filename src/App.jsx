import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import DashboardLayout from './layouts/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ReportItem from './pages/ReportItem'
import Reports from './pages/Reports'
import ItemDetails from './pages/ItemDetails'
import EditReport from './pages/EditReport'
import SmartMatches from './pages/SmartMatches'
import ClaimVerification from './pages/ClaimVerification'
import HotspotInsights from './pages/HotspotInsights'
import Favorites from './pages/Favorites'
import RecentlyViewed from './pages/RecentlyViewed'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Safety from './pages/Safety'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/items/:id/edit" element={<ProtectedRoute><EditReport /></ProtectedRoute>}/>
        <Route path="/claim/:id" element={<ProtectedRoute><ClaimVerification /></ProtectedRoute>} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="matches" element={<SmartMatches />} />
        <Route path="hotspots" element={<HotspotInsights />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="recent" element={<RecentlyViewed />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route
        path="/report-item"
        element={
          <ProtectedRoute>
            <ReportItem />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App