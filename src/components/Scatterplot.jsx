import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Scatterplot = ({ data, xAttr, yAttr, colorAttr, opacityAttr, sizeAttr, setSelectedData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const width = 600, height = 400, margin = 50;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin * 2)
      .attr("height", height + margin * 2)
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    const filteredData = data.filter(d => !isNaN(d[xAttr]) && !isNaN(d[yAttr]));

    const xExtent = d3.extent(filteredData, d => d[xAttr]);
    const yExtent = d3.extent(filteredData, d => d[yAttr]);

    const xScale = d3.scaleLinear()
      .domain([xExtent[0] || 0, xExtent[1] || 1000])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, yExtent[1] || 5000])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(filteredData.map(d => d[colorAttr]));

    const sizeScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => d[sizeAttr] || 0))
      .range([5, 20]);

    const opacityScale = d3.scaleLinear()
      .domain(d3.extent(filteredData, d => d[opacityAttr] || 1))
      .range([0.3, 1]);

    svg.append("g").attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    const brush = d3.brush()
      .extent([[0, 0], [width, height]])
      .on("end", ({ selection }) => {
        if (!selection) return;
        const [[x0, y0], [x1, y1]] = selection;
        const brushedData = filteredData.filter(d =>
          xScale(d[xAttr]) >= x0 && xScale(d[xAttr]) <= x1 &&
          yScale(d[yAttr]) >= y0 && yScale(d[yAttr]) <= y1
        );
        setSelectedData(brushedData);
      });

    svg.append("g").call(brush);

    svg.selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d[xAttr]))
      .attr("cy", d => yScale(d[yAttr]))
      .attr("r", d => sizeScale(d[sizeAttr] || 5))
      .attr("fill", d => colorScale(d[colorAttr] || "gray"))
      .attr("opacity", d => opacityScale(d[opacityAttr] || 1));

  }, [data, xAttr, yAttr, colorAttr, opacityAttr, sizeAttr, setSelectedData]);

  return <svg ref={svgRef} />;
};

export default Scatterplot;
