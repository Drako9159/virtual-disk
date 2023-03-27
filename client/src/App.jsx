import Storage from "./pages/Storage.jsx";
import Movies from "./pages/Movies.jsx";
import Wrapper from "./pages/Wrappers.jsx";
import Layout from "./pages/Layout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Layout>
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Storage />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </Layout>
  );
}
