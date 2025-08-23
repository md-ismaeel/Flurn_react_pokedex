import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Page/Home/Home";
import PokemonDetails from "./Page/PokemonDetails/PokemonDetails";
import Search from "./Page/Search/Search";
import Bookmarks from "./Page/Bookmarks/Bookmarks";
import NotFound from "./Page/NotFound/NotFound";
import Login from "./Page/Authentication/Login/Login";
import Register from "./Page/Authentication/Register/Register";
import ResetPassword from "./Page/Authentication/ResetPassword/ResetPassword";
import ConfirmEmail from "./Page/Authentication/EmailConformation/ConfirmEmail";

function App() {
  const { isLogin } = useSelector((state) => state?.pokeDex);
  console.log("isUserLogin", isLogin);

  const loggedInRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/details/:id",
      element: <PokemonDetails />,
      errorElement: <NotFound />,
    },
    {
      path: "/search",
      element: <Search />,
      errorElement: <NotFound />,
    },
    {
      path: "/search/details/:id",
      element: <PokemonDetails />,
      errorElement: <NotFound />,
    },
    {
      path: "/bookmarks",
      element: <Bookmarks />,
      errorElement: <NotFound />,
    },
    {
      path: "/bookmarks/details/:id",
      element: <PokemonDetails />,
      errorElement: <NotFound />,
    },
  ]);

  // const loggedOutRoutes = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: "/sign-up",
  //     element: <Register />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: "/confirm-email/:token",
  //     element: <ConfirmEmail />,
  //     errorElement: <NotFound />,
  //   },
  //   {
  //     path: "/resetPassword",
  //     element: <ResetPassword />,
  //     errorElement: <NotFound />,
  //   },
  // ]);

  return (
    <>
      <RouterProvider router={loggedInRoutes} />
    </>
  );
}

export default App;
