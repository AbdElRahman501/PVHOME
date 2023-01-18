import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollTotop";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import SystemsScreen from "./screens/SystemsScreen";
import DataEntryScreen from "./screens/DtatEntryScreen";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <Navbar />
      <ScrollToTop>
        <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/systems" element={<SystemsScreen />} /> 
        <Route path="/dataEntry" element={<DataEntryScreen />} /> 
        </Routes>
      </ScrollToTop>
    </div>
  )

}

export default App;
