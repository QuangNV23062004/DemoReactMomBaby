import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const baseURLBill = "https://6684c67c56e7503d1ae11cfd.mockapi.io/Bill";

export default function Dashboard() {
  const [bills, setBills] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderStatusCounts, setOrderStatusCounts] = useState({});
  const [revenue, setRevenue] = useState([]);
  useEffect(() => {
    fetch(baseURLBill)
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
        processStatistics(data);
      })
      .catch((error) => console.error("Error fetching bills:", error));
  }, []);

  const processStatistics = (data) => {
    const revenueData = data.reduce((acc, bill) => {//go through each bill
      const date = new Date(bill.checkoutDate * 1000).toLocaleDateString();//get date
      if (!acc[date]) { 
        acc[date] = 0; //set initial value
      }
      acc[date] += bill.total;//add the bill value
      return acc;
    }, {});

    const revenueArray = Object.entries(revenueData).map(
      ([timestamp, total]) => ({
        timestamp,
        total,
      })
      
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort by date;
    //object to array of object
    setRevenue(revenueArray);

    const totalRev = data.reduce((sum, bill) => sum + bill.total, 0);//0 is initial value
    setTotalRevenue(totalRev);

    const statusCounts = data.reduce((acc, bill) => {
      acc[bill.status] = (acc[bill.status] || 0) + 1;
      return acc;
    }, {});
    setOrderStatusCounts(statusCounts);
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container style={{backgroundColor: "whitesmoke",padding: 10,borderRadius: 5}}>
      <h1>Dashboard</h1>
      <Row>
        <Col md={12}>
          <Card style={{ width: "100%", height: "100%" }}>
            <Card.Body>
              <Card.Title>Revenue Over Time</Card.Title>
              <BarChart
                width={800}
                height={300}
                data={revenue}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}₫`} />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>

              <Card.Text>Total Revenue: {totalRevenue}₫</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
