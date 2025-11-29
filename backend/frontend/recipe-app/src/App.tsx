import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./layouts/Footer";
import NavBar from "./layouts/NavBar";
import AddRecipe from "./components/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/recipes" element={<MyRecipes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/editRecipe/:id" element={<EditRecipe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
