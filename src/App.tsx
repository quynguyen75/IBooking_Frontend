import { Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Checkout from "pages/customerFacing/checkout/Checkout";
import Home from "pages/customerFacing/home/Home";
import CreateRoom from "pages/customerFacing/host/CreateRoom";
import ManageRoom from "pages/customerFacing/host/ManageRoom";
import RoomDetail from "pages/customerFacing/roomDetail/RoomDetail";
import Search from "pages/customerFacing/search/Search";
import LoginProvider from "pages/login/LoginProvider";

import RootAdmin from "./pages/admin/root/RootAdmin";
import AuthPage from "./pages/customerFacing/auth/AuthenticatePage";

import "react-toastify/dist/ReactToastify.css";
import { USER_ME_API } from "constant/resource";
import { useContext, useEffect } from "react";
import { UserContext } from "context/UserContext";
import HandlePayment from "pages/customerFacing/checkout/HandlePayment";
import PendingBooking from "pages/customerFacing/pendingBooking/PendingBooking";

function App() {
  const userContext = useContext(UserContext);
  const savedToken = localStorage.getItem("token");

  const getUser = async () => {
    if (savedToken && !userContext.user) {
      try {
        const response = await fetch(USER_ME_API, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (response.ok) {
          const user = await response.json();
          userContext.setUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [savedToken]);

  return (
    <>
      <Switch>
        <Route path="/auth/:type" component={AuthPage} />

        <Route path="/search" component={Search} />

        <Route path="/room/:id" component={RoomDetail} />

        <Route path="/checkout">
          <Checkout />
        </Route>

        <Route path="/handlepayment">
          <HandlePayment />
        </Route>

        <Route path="/pendingBookings">
          <PendingBooking />
        </Route>

        <Route path="/host/create">
          <CreateRoom />
        </Route>

        <Route path="/host/manage">
          <ManageRoom />
        </Route>

        <Route path="/admin" component={RootAdmin} />

        <Route path="/loginProvider/:type" component={LoginProvider} />

        <Route path="/" component={Home} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
