/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Model = ({
  isOpen,
  onClose,
  onPaymentSubmit,
  totalAmount,
  bookingData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    console.log(data);
    const paymentData = {
      ...data,
      bookingDetails: bookingData, // Include booking data
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/movie/ticket",
        {
          userID: bookingData.userId,
          movieID: bookingData.movieId,
          movieName: bookingData.movieName,
          moviePoster: bookingData.moviePoster,
          seats: bookingData.seats,
          city: bookingData.city,
          theater: bookingData.theater,
          date: bookingData.date,
          time: bookingData.time,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Ticket Created : ", response.data);
      
      onPaymentSubmit(paymentData);
      reset();
      onClose();
      navigate("/MyTickets", { state: { bookingDetails: bookingData } });
    } catch (err) {
      console.error("Error submitting payment:", err);
      alert("There was an error processing your payment.");
    }
  };

  return (
    <div className="modal d-flex align-items-center justify-content-center">
      <div className="modal-dialog">
        <div className="modal-content text-white bg-dark p-4">
          <button type="button" className="close btn btn-light" onClick={onClose}>
            &times;
          </button>
          <p>Great, that’s £{totalAmount.toFixed(2)}!</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-check-label">
                <input
                  type="radio"
                  value="paypal"
                  {...register("paymentMethod")}
                  className="form-check-input"
                />
                UPI
              </label>
              <label className="form-check-label ml-3">
                <input
                  type="radio"
                  value="card"
                  {...register("paymentMethod", { required: true })}
                  className="form-check-input"
                  defaultChecked
                />
                Debit/credit card
              </label>
              {errors.paymentMethod && (
                <div className="text-danger">Payment method is required</div>
              )}
            </div>
            <div className="form-group bg-secondary p-3 rounded">
              <label className="form-label">Card number</label>
              <input
                type="text"
                {...register("cardNumber", {
                  required: true,
                  pattern: /^[0-9]{16}$/,
                })}
                maxLength="16"
                placeholder="1234 5678 9012 3456"
                className="form-control"
              />
              {errors.cardNumber && (
                <div className="text-danger">Valid card number is required</div>
              )}
            </div>
            <div className="form-group bg-secondary p-3 rounded">
              <label className="form-label">Expiry</label>
              <input
                type="text"
                placeholder="MM/YY"
                {...register("expiry", {
                  required: true,
                  pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                })}
                className="form-control"
              />
              {errors.expiry && (
                <div className="text-danger">Valid expiry date is required</div>
              )}
            </div>
            <div className="form-group bg-secondary p-3 rounded">
              <label className="form-label">CVC</label>
              <input
                id="cvv"
                {...register("cvv", { required: true, pattern: /^[0-9]{3}$/ })}
                maxLength="3"
                placeholder="123"
                className="form-control"
              />
              {errors.cvc && (
                <div className="text-danger">Valid CVC is required</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Finish and pay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Model;
