import Select from "react-select";

const xOptions = [
  { value: "budget", label: "Budget" },
  { value: "us_gross", label: "US Gross" },
  { value: "worldwide_gross", label: "Worldwide Gross" },
  { value: "rotten_rating", label: "Rotten Tomatoes Rating" },
  { value: "imdb_rating", label: "IMDB Rating" },
  { value: "imdb_votes", label: "IMDB Votes" }
];

const yOptions = [...xOptions];

const colorOptions = [
  { value: "none", label: "None" },
  { value: "creative_type", label: "Creative Type" },
  { value: "source", label: "Source" },
  { value: "release", label: "Release" },
  { value: "rating", label: "Rating" }
];

const opacityOptions = [
  { value: "none", label: "None" },
  { value: "us_gross", label: "US Gross" },
  { value: "worldwide_gross", label: "Worldwide Gross" },
  { value: "rotten_rating", label: "Rotten Tomatoes Rating" },
  { value: "imdb_rating", label: "IMDB Rating" },
  { value: "imdb_votes", label: "IMDB Votes" }
];

const sizeOptions = [...opacityOptions];

const ControlPanel = ({ xAttr, setXAttr, yAttr, setYAttr, colorAttr, setColorAttr, opacityAttr, setOpacityAttr, sizeAttr, setSizeAttr }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
      <label><b>x:</b></label> <Select options={xOptions} value={xOptions.find(opt => opt.value === xAttr)} onChange={opt => setXAttr(opt.value)} />
      <label><b>y:</b></label> <Select options={yOptions} value={yOptions.find(opt => opt.value === yAttr)} onChange={opt => setYAttr(opt.value)} />
      <label><b>Color:</b></label> <Select options={colorOptions} value={colorOptions.find(opt => opt.value === colorAttr)} onChange={opt => setColorAttr(opt.value)} />
      <label><b>Opacity:</b></label> <Select options={opacityOptions} value={opacityOptions.find(opt => opt.value === opacityAttr)} onChange={opt => setOpacityAttr(opt.value)} />
      <label><b>Size:</b></label> <Select options={sizeOptions} value={sizeOptions.find(opt => opt.value === sizeAttr)} onChange={opt => setSizeAttr(opt.value)} />
    </div>
  );
};

export default ControlPanel;
