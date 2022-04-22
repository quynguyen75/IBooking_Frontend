import Home from "pages/customerFacing/home/Home";
import { Route, Switch } from "react-router-dom";

import RootAdmin from "./pages/admin/root/RootAdmin";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/admin" exact>
        <RootAdmin />
      </Route>
    </Switch>
  );
}

export default App;
