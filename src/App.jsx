import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Page/Home/Home";
import PokemonDetails from "./Page/PokemonDetails/PokemonDetails";
import Search from "./Page/Search/Search";
import Bookmarks from "./Page/Bookmarks/Bookmarks";
import NotFound from "./Page/NotFound/NotFound";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";


function App() {
  const { isLogin } = useSelector((state) => state.PokemonSlice)

  const loggedInRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />
    },
    {
      path: "/details/:id",
      element: <PokemonDetails />,
      errorElement: <NotFound />
    },
    {
      path: "/search",
      element: <Search />,
      errorElement: <NotFound />
    },
    {
      path: "/search/details/:id",
      element: <PokemonDetails />,
      errorElement: <NotFound />
    },
    {
      path: "/bookmarks",
      element: <Bookmarks />,
      errorElement: <NotFound />
    },
    {
      path: "/bookmarks/details/:id",
      element: <PokemonDetails />,
      errorElement: <NotFound />
    }
  ]);

  const loggedOutRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFound />
    }, {
      path: "/register",
      element: <Register />,
      errorElement: <NotFound />
    }
  ])


  return (
    <>
      <RouterProvider router={isLogin ? loggedInRoutes : loggedOutRoutes} />
    </>
  );
}

export default App;
