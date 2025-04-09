import { Header } from "./components/Header/Header";
import { Layout } from "./components/Layout/Layout";
import { Main } from "./components/Main/Main";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <DataProvider>
      <Layout>
        <Header />
        <Main />
      </Layout>
    </DataProvider>
  );
}

export default App;
