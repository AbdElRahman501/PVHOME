import React from "react";
import SlideRoutes from 'react-slide-routes';
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/scrollTotop";
import Navbar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import SystemsScreen from "./screens/SystemsScreen";
import OnGridScreen from "./screens/OnGridScreen";
import OffGridScreen from "./screens/OffGridScreen";
import HybridScreen from "./screens/HybridScreen";

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  const location = useLocation();

  return (
    <div>
      <Navbar />
      <ScrollToTop>

        {/* <SlideRoutes location={location} duration={400} > */}
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/systems" element={<SystemsScreen />} />
            <Route path="/systems/On Grid" element={<OnGridScreen />} />
            <Route path="/systems/Off Grid" element={<OffGridScreen />} />
            <Route path="/systems/Hybrid" element={<HybridScreen />} />
          </Routes>
        {/* </SlideRoutes> */}

      </ScrollToTop>
    </div>
  )

}

export default App;
