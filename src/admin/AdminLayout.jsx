import { Outlet } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  const user = JSON.parse(localStorage.getItem('user'));
  const theater = user?.theater;

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/admin/shows">Manage Shows</a></li>
          <li><a href="/admin/movies/add">Add Movie</a></li>
          <li><a href="/admin/theaters">Manage Theaters</a></li>
          <li><a href="/admin/bookings">Manage Bookings</a></li>

          {/* Only show Register Theater if not already registered */}
          {!theater && (
            <li><a href="/admin/theaters/signup">Register Theater</a></li>
          )}

          <li><a href="/admin/show/add">Add Show</a></li>
          <li><a href="/admin/signup">Sign up</a></li>
          <li><a href="/admin/login">Log in</a></li>
        </ul>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}