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

function App() {
  return (
    <>
      <Switch>
        <Route path="/auth/:type" component={AuthPage} />

        <Route path="/search" component={Search} />

        <Route path="/room/:id" component={RoomDetail} />

        <Route path="/checkout" component={Checkout} />

        <Route path="/host/create" component={CreateRoom} />

        <Route path="/host/manage" component={ManageRoom} />

        <Route path="/loginProvider/:type" component={LoginProvider} />

        <Route path="/admin" component={RootAdmin} />

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
