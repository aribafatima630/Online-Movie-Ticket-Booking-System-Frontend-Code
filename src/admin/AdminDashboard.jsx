import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const adminName = user?.name || 'Admin';
  const theater = user?.theater;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Welcome to Admin Dashboard</h1>
        <div className="admin-info">
          <span>{theater?.theaterName || 'Admin'}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-sections">
        <Link to="/admin/shows" className="dashboard-card">
          🎬 Manage Shows
        </Link>
        <Link to="/admin/movies/add" className="dashboard-card">
          ➕ Add Movie
        </Link>
        <Link to="/admin/theaters" className="dashboard-card">
          🏢 Manage Theaters
        </Link>
        <Link to="/admin/show/add" className="dashboard-card">
          🎥 Add Show
        </Link>

         {theater && (
            <Link to="/admin/bookings" className="dashboard-card">
              🎟 Manage Bookings
            </Link>
         )}

        {/* Conditionally render Register Theater only if theater is not present */}
        {!theater && (
          <Link to="/admin/theaters/signup" className="dashboard-card">
            🏛 Register Theater
          </Link>
        )}
      </div>
    </div>
  );
}
