import { Refine } from "@pankod/refine-core";
import { notificationProvider, Layout, LoginPage } from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";
import { DataProvider } from "@pankod/refine-strapi";
import strapiAuthProvider from "./authProvider";

function App() {
  const API_URL = "your-strapi-api-url";

  const { authProvider, axiosInstance } = strapiAuthProvider(API_URL);
  const dataProvider = DataProvider(API_URL, axiosInstance);
  return (
    <Refine
      routerProvider={routerProvider}
      notificationProvider={notificationProvider}
      Layout={Layout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      LoginPage={LoginPage}
    />
  );
}

export default App;
