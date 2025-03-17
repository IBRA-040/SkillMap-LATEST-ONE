import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import AccountPage from "./pages/AccountPage";
import PathsPage from "./pages/PathsPage";
import PathDetails from "./pages/PathDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/paths" element={<PathsPage />} />
        <Route path="/account/path/:id" element={<PathDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
