import "./App.css";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Page/Home/Home";
import PokemonDetails from "./Page/PokemonDetails/PokemonDetails";
import Search from "./Components/Search/Search";
import Bookmarks from "./Components/Bookmarks/Bookmarks";

function App() {

  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/details/:id",
      element: <PokemonDetails />
    },
    {
      path: "/search",
      element: <Search />
    },
    {
      path: "/bookmarks",
      element: <Bookmarks />
    }
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
