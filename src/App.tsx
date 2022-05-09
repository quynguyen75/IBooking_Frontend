import Checkout from "pages/customerFacing/checkout/Checkout";
import Home from "pages/customerFacing/home/Home";
import CreateRoom from "pages/customerFacing/host/CreateRoom";
import ManageRoom from "pages/customerFacing/host/ManageRoom";
import RoomDetail from "pages/customerFacing/roomDetail/RoomDetail";
import Search from "pages/customerFacing/search/Search";
import { Route, Switch } from "react-router-dom";

import RootAdmin from "./pages/admin/root/RootAdmin";
import AuthPage from "./pages/customerFacing/auth/AuthenticatePage";

function App() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />

      <Route path="/search" component={Search} />

      <Route path="/room/:id" component={RoomDetail} />

      <Route path="/checkout" component={Checkout} />

      <Route path="/host/create" component={CreateRoom} />
 
      <Route path="/host/manage" component={ManageRoom} />

      <Route path="/admin" component={RootAdmin} />

      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
