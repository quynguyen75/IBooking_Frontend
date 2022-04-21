import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";
import { DataProvider } from "@pankod/refine-strapi-v4";
import strapiAuthProvider from "./authProvider";
import { GeneralList } from "./pages/admin/general/list";
import { GeneralEdit } from "./pages/admin/general/edit";
import { GeneralCreate } from "./pages/admin/general/create";

import Logo from "./assets/img/logo.png";

import { Login } from "./pages/admin/login/index";
import { BookingList } from "pages/admin/booking/list";
import { RoomList } from "pages/admin/rooms/list";
import { RoleList } from "pages/admin/roles/list";
import { Dashboard } from "pages/admin/dashboard/home";
import { UserList } from "pages/admin/users/list";
import { RoomEdit } from "pages/admin/rooms/edit";
import { RoleCreate } from "pages/admin/roles/create";
import { UserEdit } from "pages/admin/users/edit";
import { UserCreate } from "pages/admin/users/create";
import { BookingEdit } from "pages/admin/booking/edit";
import { Title } from "components/Title";
import { RoomCreate } from "pages/admin/rooms/create";
import { BookingCreate } from "pages/admin/booking/create";

const { Link } = routerProvider;

function App() {
  const API_URL = "http://localhost:1337/api";

  const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
  const dataProvider = DataProvider(API_URL, axiosInstance);
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
          },
          {
            name: "User-management",
            list: UserList,
            edit: UserEdit,
            create: UserCreate,
          },
          {
            name: "Room-manangement",
          },
          {
            name: "Booking-management",
          },

          {
            name: "Payment-management",
          },
          {
            name: "room-types",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Room-manangement",
          },
          {
            name: "payment-types",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Payment-management",
          },
          {
            name: "payment-statuses",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Payment-management",
          },
          {
            name: "booking-statuses",
            list: GeneralList,
            edit: GeneralEdit,
            create: GeneralCreate,
            parentName: "Booking-management",
          },

          {
            name: "bookings",
            list: BookingList,
            edit: BookingEdit,
            create: BookingCreate,
            parentName: "Booking-management",
          },
          {
            name: "rooms",
            list: RoomList,
            edit: RoomEdit,
            create: RoomCreate,
            parentName: "Room-manangement",
          },
          {
            name: "roles",
            list: RoleList,
          },
        ]}
        catchAll={<ErrorComponent />}
      />
    </>
  );
}

export default App;
