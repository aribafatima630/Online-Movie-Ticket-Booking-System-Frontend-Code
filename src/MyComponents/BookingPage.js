import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookingPage.css';
import BASE_URL from '../config';

export default function BookingPage() {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [numSeats, setNumSeats] = useState(1);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // NEW STATE


    useEffect(() => {
        fetch(`${BASE_URL}/api/shows`)
            .then(res => res.json())
            .then(data => {
                const found = data.find(show => show.movie.movieId == movieId);
                setMovieData(found);
            });
    }, [movieId]);

    const handleBooking = () => {
        if (!selectedTimeSlot) {
            alert("Please select a time slot!");
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if(!storedUser){
          alert("Please Login for Book Ticket");
          return;
        }
        const userName = storedUser.name;

        const ticketPayload = {
        userName: userName, // Replace with logged-in user's name later
        movieName: movieData.movie.movieName,
        theaterName: movieData.screens.theater.theaterName,
        showDate: new Date().toISOString().split("T")[0], // today’s date (or allow selection)
        showTime: selectedTimeSlot.startTime,
        totalTickets: numSeats,
        price: movieData.movie.price * numSeats,
        bookingTime: new Date().toISOString()
    };

    fetch(`${BASE_URL}/api/ticket`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticketPayload)
    })
    .then(res => res.json())
    .then(data => {
        alert(`🎟️ Ticket booked successfully! Ticket ID: ${data.id}`);
        // Optionally navigate to a ticket details page
    })
    .catch(err => {
        console.error("Booking failed:", err);
        alert("Booking failed! Try again.");
    });
};

    if (!movieData) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

    return (
        <div className="booking-page">
          <div className="booking-poster">
            <img src={movieData.movie.bannerImage || movieData.movie.image} alt={movieData.movie.movieName} />
          </div>
      
          <div className="booking-container">
            <h1>Book Tickets for: {movieData.movie.movieName}</h1>
      
            <p><strong>Theater:</strong> {movieData.screens.theater.theaterName}</p>
            <p><strong>Screen:</strong> {movieData.screens.screenName}</p>
            <p><strong>City:</strong> {movieData.screens.theater.address.city}</p>
            <p><strong>Price per seat:</strong> ₹{movieData.movie.price}</p>
      
            <div className="booking-controls">
              <label>Select Time Slot:</label>
              {movieData.time_slot.map(slot => (
                <div key={slot.time_slot_id} className="time-slot-option">
                  <label>
                    <input
                      type="radio"
                      name="timeslot"
                      value={slot.time_slot_id}
                      onChange={() => setSelectedTimeSlot(slot)}
                    />
                    {slot.startTime?.slice(0, 5)} - {slot.endTime?.slice(0, 5)}
                  </label>
                </div>
              ))}
            </div>
      
            <div className="booking-controls">
              <label>Seats:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={numSeats}
                onChange={(e) => setNumSeats(parseInt(e.target.value))}
              />
            </div>
      
            <h3>Total: ₹{movieData.movie.price * numSeats}</h3>
      
            <button className="book-btn" onClick={handleBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      );
}