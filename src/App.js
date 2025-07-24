import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from './MyComponents/Movies';
import MovieDetail from './MyComponents/MovieDetail';
import BookingPage from "./MyComponents/BookingPage";
import SignupPage from "./MyComponents/SignupPage";
import Login from "./MyComponents/Login";
import SearchResults from './MyComponents/SearchResults';

import AdminDashboard from "./admin/AdminDashboard";
import AddMovie from "./admin/AddMovie";
import ManageTheaters from "./admin/ManageTheaters";
import AdminLayout from "./admin/AdminLayout";
import UserLayout from "./Layouts/UserLayout";
import TheaterSignup from "./admin/TheaterSignup";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import AddShow from "./admin/AddShow";
import ManageShows from "./admin/ManageShows";
import ManageBookings from "./admin/ManageBookings";

function App() {
  return (
    <Router>
      <Routes>
        {/* User Layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Movies />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie/:movieName" element={<MovieDetail />} />
          <Route path="/book/:movieId" element={<BookingPage />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/shows" element={<ManageShows />} />
          <Route path="/admin/movies/add" element={<AddMovie />} />
          <Route path="/admin/theaters" element={<ManageTheaters />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="/admin/theaters/signup" element={<TheaterSignup />} />
          <Route path="/admin/show/add" element={<AddShow />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;