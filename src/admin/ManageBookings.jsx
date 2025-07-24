import { useEffect, useState } from "react";
import axios from "axios";
import './ManageBookings.css';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const theaterName = user?.theater?.theaterName?.trim();
    if (theaterName) {
      axios
        .get(`http://localhost:8080/api/ticket/byTheater?theaterName=${encodeURIComponent(theaterName)}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Failed to load bookings", err));
    }
  }, [user?.theater?.theaterName]);

  return (
    <div className="bookings-container">
      <h2 className="bookings-title">🎟 Bookings for {user?.theater?.theaterName}</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings-msg">No bookings found yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Movie</th>
                <th>Date</th>
                <th>Time</th>
                <th>Tickets</th>
                <th>Total Price</th>
                <th>Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.movieName}</td>
                  <td>{booking.showDate}</td>
                  <td>{booking.showTime}</td>
                  <td>{booking.totalTickets}</td>
                  <td>₹{booking.price}</td>
                  <td>{new Date(booking.bookingTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}