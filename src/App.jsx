import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home";
import PokemonDetails from "./Page/PokemonDetails/PokemonDetails";
import Search from "./Page/Search/Search";
import Bookmarks from "./Page/Bookmarks/Bookmarks";
import NotFound from "./Page/NotFound/NotFound";
import { useEffect } from "react";

function App() {

  const routers = createBrowserRouter([
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
    }
  ]);


  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
