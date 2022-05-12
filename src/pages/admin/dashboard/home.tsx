import { Card, Col, Row, Typography, Icons } from "@pankod/refine-antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useFetch from "hooks/useFetch";
import React from "react";

import { Bar, Line, Pie } from "react-chartjs-2";
import { formatMoney } from "utils/money";
import { BOOKING_ANALYST_API, ROOM_ANALYST_API } from "constant/resource";

const { Title: TypographyTitle } = Typography;

const { HomeOutlined, AccountBookOutlined, RiseOutlined } = Icons;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
  ArcElement
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CountCard: React.FC<{
  heading: string;
  value: string | number;
  icon: any;
}> = ({ heading, value, icon }) => {
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Col span={16}>
          <TypographyTitle level={5} type="secondary">
            {heading}
          </TypographyTitle>
          <TypographyTitle
            level={2}
            style={{
              paddingLeft: "0.4rem",
            }}
          >
            {value}
          </TypographyTitle>
        </Col>

        <Col>
          <div
            style={{
              padding: "1rem",
              borderRadius: "50%",
              backgroundColor: "#584fea",
            }}
          >
            {icon}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const BookingCountChart: React.FC = () => {
  const [status, bookingAnalystData] = useFetch(BOOKING_ANALYST_API);

  const currentMonth = new Date().getMonth();

  return (
    <CountCard
      heading="Booking Count"
      value={
        bookingAnalystData &&
        bookingAnalystData.bookingAnalyst[currentMonth].bookingCount
      }
      icon={
        <AccountBookOutlined
          style={{
            fontSize: "2rem",
            color: "white",
          }}
        />
      }
    />
  );
};

const ProfitInMonth: React.FC = () => {
  const [status, bookingAnalystData] = useFetch(BOOKING_ANALYST_API);

  const currentMonth = new Date().getMonth();
  return (
    <CountCard
      heading={`Profit in ${
        bookingAnalystData &&
        bookingAnalystData.bookingAnalyst[currentMonth].month
      }`}
      value={
        bookingAnalystData &&
        formatMoney(bookingAnalystData.bookingAnalyst[currentMonth].totalProfit)
      }
      icon={
        <RiseOutlined
          style={{
            color: "white",
            fontSize: "2rem",
          }}
        />
      }
    />
  );
};

const ProfitChart: React.FC = () => {
  const [status, bookingAnalystData] = useFetch(BOOKING_ANALYST_API);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Profit in ${bookingAnalystData && bookingAnalystData.year}`,
      },
    },
  };

  const formatedData = {
    labels,
    datasets: [
      {
        label: "Profit",
        data: labels.map((month, index) => {
          return bookingAnalystData
            ? bookingAnalystData.bookingAnalyst[index].totalProfit
            : 0;
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return (
    <Card>
      <Line options={options} data={formatedData} />
    </Card>
  );
};

const RoomChart: React.FC = () => {
  const [status, roomAnalyst] = useFetch(ROOM_ANALYST_API);

  return (
    <CountCard
      heading="Room Count"
      value={roomAnalyst?.count}
      icon={
        <HomeOutlined
          style={{
            fontSize: "2rem",
            color: "white",
          }}
        />
      }
    />
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div>
      <Row gutter={24}>
        <Col span={8}>
          <RoomChart />
        </Col>

        <Col span={8}>
          <BookingCountChart />
        </Col>

        <Col span={8}>
          <ProfitInMonth />
        </Col>
      </Row>

      <div
        style={{
          padding: "2rem 0",
        }}
      >
        <ProfitChart />
      </div>
    </div>
  );
};
