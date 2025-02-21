import { useState, useEffect } from "react";
import Scatterplot from "./components/Scatterplot";
import ControlPanel from "./components/ControlPanel";
import DataTable from "./components/DataTable";
import rawData from "./assets/movie.json";

const preprocessData = (data) => {
  return data.map(d => ({
    ...d,
    budget: +d.budget || 0,
    us_gross: +d.us_gross || 0,
    worldwide_gross: +d.worldwide_gross || 0,
    rotten_rating: +d.rotten_rating || 0,
    imdb_rating: +d.imdb_rating || 0,
    imdb_votes: Number(d.imdb_votes.replace(/,/g, "")) || 0,
  }));
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(preprocessData(rawData));
  }, []);

  const [xAttr, setXAttr] = useState("imdb_rating");
  const [yAttr, setYAttr] = useState("us_gross");
  const [colorAttr, setColorAttr] = useState("none");
  const [opacityAttr, setOpacityAttr] = useState("none");
  const [sizeAttr, setSizeAttr] = useState("none");
  const [selectedData, setSelectedData] = useState([]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      
      <div style={{ padding: "10px", marginBottom: "20px" }}>
        <ControlPanel
          xAttr={xAttr} setXAttr={setXAttr}
          yAttr={yAttr} setYAttr={setYAttr}
          colorAttr={colorAttr} setColorAttr={setColorAttr}
          opacityAttr={opacityAttr} setOpacityAttr={setOpacityAttr}
          sizeAttr={sizeAttr} setSizeAttr={setSizeAttr}
        />
      </div>

      <div style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}>
        <div style={{ flex: "1" }}>
          <Scatterplot
            data={data}
            xAttr={xAttr}
            yAttr={yAttr}
            colorAttr={colorAttr}
            opacityAttr={opacityAttr}
            sizeAttr={sizeAttr}
            setSelectedData={setSelectedData}
          />
        </div>

        <div style={{ width: "40%" }}>
          
          <DataTable data={selectedData} />
        </div>
      </div>
    </div>
  );
};

export default App;
