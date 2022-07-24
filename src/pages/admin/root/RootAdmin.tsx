import React, { useEffect } from "react";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";
import { DataProvider } from "@pankod/refine-strapi-v4";
import strapiAuthProvider from "../../../authProvider";
import { GeneralList } from "pages/admin/general/list";
import { GeneralEdit } from "pages/admin/general/edit";
import { GeneralCreate } from "pages/admin/general/create";

import Logo from "../../../assets/img/logo.png";

import { Login } from "pages/admin/login";
import { BookingList } from "pages/admin/booking/list";
import { RoomList } from "pages/admin/rooms/list";
import { RoleList } from "pages/admin/roles/list";
import { Dashboard } from "pages/admin/dashboard/home";
import { UserList } from "pages/admin/users/list";
import { RoomEdit } from "pages/admin/rooms/edit";
import { UserEdit } from "pages/admin/users/edit";
import { UserCreate } from "pages/admin/users/create";
import { BookingEdit } from "pages/admin/booking/edit";
import { Title } from "components/Title";
import { RoomCreate } from "pages/admin/rooms/create";
import { BookingCreate } from "pages/admin/booking/create";

import { root } from "constant/resource";
import { useHistory } from "react-router-dom";
import { Container, Typography, useMediaQuery } from "@mui/material";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

const { Link } = routerProvider;

const RootAdmin = () => {
  const { authProvider, axiosInstance } = strapiAuthProvider(root);
  const dataProvider = DataProvider(root, axiosInstance);
  const history = useHistory();
  const isMin900px = useMediaQuery("(min-width: 900px)");

  if (!isMin900px) {
    return (
      <>
        <Header />
        <Container
          sx={{
            padding: "100px 0",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            Xin lỗi, giao diện chưa hỗ trợ điện thoại
          </Typography>
        </Container>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Title title="Admin" />
      <Refine
        routerProvider={routerProvider}
        notificationProvider={notificationProvider}
        Layout={Layout}
        dataProvider={dataProvider}
        authProvider={authProvider}
        LoginPage={Login}
        Title={() => (
          <Link to="/">
            <img
              style={{
                width: "100%",
              }}
              src={Logo}
              alt="IBooking"
            />
          </Link>
        )}
        resources={[
          {
            name: "Dashboard",
            list: Dashboard,
            options: {
              route: "admin/",
            },
          },
          {
            name: "User-management",
            list: UserList,
            edit: UserEdit,
            create: UserCreate,
            options: {
              route: "admin/user-management",
            },
          },
          {
            name: "Room-manangement",
            options: {
              route: "admin/room-management",
            },
          },
          {
            name: "Booking-management",
            options: {
              route: "admin/booking-management",
            },
          },

          {
            name: "Payment-management",
            options: {
              route: "admin/payment-management",
            },
          },
          {
            name: "room-types",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Room-manangement",
            options: {
              route: "admin/room-types",
            },
          },
          {
            name: "payment-types",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Payment-management",
            options: {
              route: "admin/payment-types",
            },
          },
          {
            name: "payment-statuses",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Payment-management",
            options: {
              route: "admin/payment-statuses",
            },
          },
          {
            name: "booking-statuses",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Booking-management",
            options: {
              route: "admin/booking-statuses",
            },
          },

          {
            name: "bookings",
            list: BookingList,
            edit: BookingEdit,
            create: BookingCreate,
            parentName: "Booking-management",
            options: {
              route: "admin/bookings",
            },
          },
          {
            name: "rooms",
            list: RoomList,
            edit: RoomEdit,
            create: RoomCreate,
            parentName: "Room-manangement",
            options: {
              route: "admin/rooms",
            },
          },
          {
            name: "roles",
            list: RoleList,
            options: {
              route: "admin/roles",
            },
          },
        ]}
        catchAll={<ErrorComponent />}
      />
    </>
  );
};

export default RootAdmin;
