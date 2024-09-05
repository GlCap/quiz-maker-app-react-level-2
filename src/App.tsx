import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuizHome } from "./pages/home/QuizHome";
import { QuizResults } from "./pages/results/QuizResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizHome />} />
        <Route path="results" element={<QuizResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
