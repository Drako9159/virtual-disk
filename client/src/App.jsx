import Storage from "./pages/Storage.jsx";
import Wrapper from "./pages/Wrappers.jsx";
import Layout from "./pages/Layout.jsx";
export default function App() {
  return (
    <Layout>
      <Wrapper>
        <Storage />
      </Wrapper>
    </Layout>
  );
}
