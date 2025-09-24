import React, { useEffect, useState } from "react";
import { Button, Badge, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const BookingManager = () => {
  const now = new Date();
  const formatted = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  const oneHourLater = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  const secondTime = new Date(
    oneHourLater.getTime() - oneHourLater.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  const [CarCount, setCarCount] = useState(0);
  const [BikeCount, setBikeCount] = useState(0);
  const [BusCount, setBusCount] = useState(0);
  const [Vip_carCount, setVip_carCount] = useState(0);
  const [BookingDetails, setBookingDetails] = useState([]);
  const [CurrentType, setCurrentType] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5266/api/Booking/UpcomingCounter?Type=Car`)
      .then((response) => {
        setCarCount(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:5266/api/Booking/UpcomingCounter?Type=VIP_Car`)
      .then((response) => {
        setVip_carCount(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:5266/api/Booking/UpcomingCounter?Type=Bike`)
      .then((response) => {
        setBikeCount(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:5266/api/Booking/UpcomingCounter?Type=Bus`)
      .then((response) => {
        setBusCount(response.data);
      })
      .catch((error) => console.log(error));
  });

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const showData = (type) => {
    setCurrentType(type);
    axios
      .get(
        `http://localhost:5266/api/Booking/UpcomingBookingByType?Type=${type}`
      )
      .then((response) => {
        setBookingDetails(response.data.value);
      })
      .catch((error) => console.log(error));
  };

  const CancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel?")) {
      try {
        const response = await axios.put(
          `http://localhost:5266/api/Booking/CancelledBooking/${id}`,
          id,
          {
            headers: {
              "content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Booking cancelled successfully");
          showData(CurrentType);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const MarkAsPaid = async (id) => {
    if (window.confirm("Confirm this booking has been PAID?")) {
      try {
        const response = await axios.post(
          `http://localhost:5266/api/Booking/PaidBooking/${id}`,
          {}
        );
        if (response.status === 200) {
          console.log("Booking Paid successfully");
          showData(CurrentType);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 ms-sm-auto px-md-4 tab-content pt-3">
          <h2>BookingManager</h2>
          <div className="mt-3 d-flex gap-3 justify-content-between mb-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-fill mx-1 position-relative"
              onClick={() => showData("car")}
            >
              Car
              {CarCount !== 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {CarCount}
                  <span className="visually-hidden">unread messages</span>
                </Badge>
              )}
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="flex-fill mx-1 position-relative"
              // active={selectedVehicle === "Bike"}
              onClick={() => showData("bike")}
            >
              Bike
              {BikeCount !== 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {BikeCount}
                  <span className="visually-hidden">unread messages</span>
                </Badge>
              )}
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="flex-fill mx-1 position-relative"
              // active={selectedVehicle === "Bus"}
              onClick={() => showData("bus")}
            >
              Bus
              {BusCount !== 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {BusCount}
                  <span className="visually-hidden">unread messages</span>
                </Badge>
              )}
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="flex-fill mx-1 position-relative"
              // active={selectedVehicle === "VIP_Car"}
              onClick={() => showData("vip_car")}
            >
              VIP_Car
              {Vip_carCount !== 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {Vip_carCount}
                  <span className="visually-hidden">unread messages</span>
                </Badge>
              )}
            </Button>
          </div>

          <Row xs={1} md={4} className="g-4">
            {BookingDetails.map((b, index) => (
              <Col key={index}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <Card.Title className="text-primary">
                      Slot Number - {b.slotNumber}
                    </Card.Title>
                    <p className="mb-1">
                      <strong>Booking ID:</strong> {b.bookingId}
                    </p>
                    <p className="mb-1">
                      <strong>Location:</strong> {b.locationName}
                    </p>
                    <p className="mb-1">
                      <strong>Start:</strong> {formatDateTime(b.startTime)}
                    </p>
                    <p className="mb-1">
                      <strong>Exit:</strong> {formatDateTime(b.exitTime)}
                    </p>
                  </Card.Body>
                  <Card.Footer className="d-flex gap-2 justify-content-between">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => CancelBooking(b.bookingId)}
                    >
                      Cancel Booking
                    </Button>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => MarkAsPaid(b.bookingId)}
                    >
                      Bill Received
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BookingManager;
