import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent.jsx";
import { InitialDataProvider } from "./ssr/InitialDataContext.jsx";

function App({ initialData }) {
  return (
    <BrowserRouter>
      <InitialDataProvider value={initialData}>
        <AppContent />
      </InitialDataProvider>
    </BrowserRouter>
  );
}

export default App;
