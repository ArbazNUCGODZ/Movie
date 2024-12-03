import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../pages/userContext";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

const MyTicket = () => {
  const { userId } = useContext(UserContext);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/movie/ticket/${userId}`
        );
        setTickets(response.data.data.tickets);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    if (userId) {
      fetchTickets();
    }
  }, [userId]);

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/movie/ticket/${ticketId}`
      );
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      alert("Ticket is canceled");
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-light text-center mb-4">My Tickets</h2>
      {tickets.map((ticket) => (
        <Card key={ticket._id} className="mb-3 shadow-sm">
          <Card.Body className="position-relative">
            <div className="position-absolute top-0 end-0 bg-danger text-white p-2 rounded">
              Booked
            </div>
            <Row className="align-items-center">
              <Col xs={12} md={3}>
                <Card.Img
                  src={ticket.moviePoster}
                  alt={ticket.movieName}
                  className="img-fluid rounded"
                />
              </Col>
              <Col xs={12} md={9}>
                <Card.Title>{ticket.movieName}</Card.Title>
                <Card.Text>
                  <strong>City:</strong> {ticket.city}
                </Card.Text>
                <Card.Text>
                  <strong>Date:</strong> {new Date(ticket.date).toDateString()}
                </Card.Text>
                <Card.Text>
                  <strong>Theater:</strong> {ticket.theater}
                </Card.Text>
                <Card.Text>
                  <strong>Time:</strong> {ticket.time}
                </Card.Text>
                <Card.Text>
                  <strong>Seats:</strong> {ticket.seats.join(", ")}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => deleteTicket(ticket._id)}
                >
                  Cancel Ticket
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default MyTicket;
