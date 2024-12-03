import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "./movieApi";
import { useForm } from "react-hook-form";
import {
  getTheatersPune,
  getTheatersBanglore,
  getTheatersMumbai,
  getTheatersDelhi,
} from "./GeolocationTeaters";
import Model from "./Model";
import { UserContext } from "../pages/userContext";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingData, setBookingData] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const { userId } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const selectedCity = watch("city");
  const selectedTheater = watch("theater");
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const today = new Date();
    const dates = Array.from({ length: 3 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date.toISOString().split("T")[0];
    });
    setDateOptions(dates);
  }, []);

  useEffect(() => {
    const fetchTheaters = async () => {
      let theatersData;
      try {
        switch (selectedCity) {
          case "Pune":
            theatersData = await getTheatersPune();
            break;
          case "Mumbai":
            theatersData = await getTheatersMumbai();
            break;
          case "Delhi":
            theatersData = await getTheatersDelhi();
            break;
          case "Bangalore":
            theatersData = await getTheatersBanglore();
            break;
          default:
            theatersData = [];
        }
        setTheaters(theatersData.features || []);
      } catch (err) {
        console.error("Error fetching theaters:", err);
      }
    };

    if (selectedCity) {
      fetchTheaters();
    }
  }, [selectedCity]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (selectedCity && selectedTheater && selectedDate && selectedTime) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/movie/booked-seats?movieID=${id}&city=${selectedCity}&theater=${selectedTheater}&date=${selectedDate}&time=${selectedTime}`
          );
          const data = await response.json();
          if (data && data.data && data.data.bookedSeats) {
            setBookedSeats(data.data.bookedSeats);
          } else {
            console.error("Invalid response format:", data);
          }
        } catch (err) {
          console.error("Error fetching booked seats:", err);
        }
      }
    };
    if (selectedCity && selectedTheater && selectedDate && selectedTime) {
      fetchBookedSeats();
    }
  }, [selectedCity, selectedTheater, selectedDate, selectedTime, id]);

  useEffect(() => {
    setTotalAmount(selectedSeats.length * 124.97);
  }, [selectedSeats]);

  const onSubmit = (data) => {
    data.seats = selectedSeats;
    data.userId = userId;
    data.movieId = id;
    data.movieName = movie.title;
    data.moviePoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    console.log(data);
    setBookingData(data);
    alert("Pay Now!");
    setIsModalOpen(true);
    console.log(data);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log("Payment details:", paymentData);
    alert("Payment submitted! Your Ticket is booked.");
    setIsModalOpen(false);
  };

  const toggleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  if (error) {
    return <div>Error fetching movie details: {error.message}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const isSeatBooked = (seatNumber) => {
    return bookedSeats.includes(seatNumber.toString());
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="text-center">
            <h1>{movie.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="img-fluid rounded mb-3"
            />
            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(movie.release_date).toDateString()}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <button className="btn btn-primary mt-3" onClick={() => window.history.back()}>
              Back to List
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <h2>Book Your Ticket</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="city">Select City:</label>
              <select id="city" className="form-control" {...register("city", { required: true })}>
                <option value="">Select City</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
              {errors.city && <p className="text-danger">City is required</p>}
            </div>

            <div className="form-group">
              <label htmlFor="theater">Select Theater:</label>
              <select id="theater" className="form-control" {...register("theater", { required: true })}>
                <option value="">Select Theater</option>
                {theaters.map((theater) => (
                  <option
                    key={theater.properties.id}
                    value={theater.properties.name}
                  >
                    {theater.properties.name}
                  </option>
                ))}
              </select>
              {errors.theater && <p className="text-danger">Theater is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="date">Select Date:</label>
              <select id="date" className="form-control" {...register("date", { required: true })}>
                <option value="">Select date</option>
                {dateOptions.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toDateString()}
                  </option>
                ))}
              </select>
              {errors.date && <p className="text-danger">Date is required</p>}
            </div>
            <div className="form-group">
              <label htmlFor="time">Select Time:</label>
              <select id="time" className="form-control" {...register("time", { required: true })}>
                <option value="">Select time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="09:00 PM">09:00 PM</option>
              </select>
              {errors.time && <p className="text-danger">Time is required</p>}
            </div>
            <div className="form-group">
              <label>Select Seats:</label>
              <div className="d-flex flex-wrap">
                {Array.from({ length: 50 }, (_, i) => (
                  <div
                    key={i}
                    className={`seat m-2 p-2 ${
                      selectedSeats.includes(i + 1) ? "bg-primary text-white" : "bg-secondary text-white"
                    } ${isSeatBooked(i + 1) ? "bg-danger" : ""}`}
                    onClick={() =>
                      !isSeatBooked(i + 1) && toggleSeatSelection(i + 1)
                    }
                    style={{ cursor: isSeatBooked(i + 1) ? "not-allowed" : "pointer" }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              {selectedSeats.length === 0 && (
                <p className="text-danger">At least one seat is required</p>
              )}
            </div>
            <p className="total-amount">
              Total Amount: £{totalAmount.toFixed(2)}
            </p>
            <button type="submit" className="btn btn-success mt-3">
              Book Now
            </button>
          </form>
        </div>
      </div>
      <Model
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentSubmit={handlePaymentSubmit}
        totalAmount={totalAmount}
        bookingData={bookingData}
      />
    </div>
  );
};

export default MovieDetail;
