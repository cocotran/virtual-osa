import Plot from "react-plotly.js";

import { useState, useEffect } from "react";

import CommandsEnum from "../enum/commands";

function TracePlot({}) {
  // const [plotLimit, setPlotLimit] = useState([])
  const [plotTrace, setPlotTrace] = useState({});
  const [plotLayout, setPlotLayout] = useState({});

  function setPlotDimension(dimension) {
    const newLayout = { ...plotLayout };
    newLayout.width = dimension.width;
    newLayout.height = dimension.height;
  }

  async function getPlotDimension() {
    return {
      width: window.innerWidth * (5 / 6),
      height: window.innerHeight * (4 / 5),
    };
  }

  useEffect(() => {
    async function setPlot() {
      const dimension = await getPlotDimension();
      setPlotDimension(dimension);
      drawTrace(dimension);
    }

    setPlot();
  }, []);

  function handleResize(event) {
    setPlotDimension(getPlotDimension());
  }

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  function convertToISODate(inputDate) {
    // Input date is in format "YY.MM.DD hh:mm:ss"
    const split = inputDate.split(' ')
    const date = split[0].split('.')
    const time = split[1].split(':')
    const newDate = new Date(Number("20" + date[0]), Number(date[1]), Number(date[2]), Number(time[0]), Number(time[1]), Number(time[2])) 
    return newDate.toISOString()
  }

  // function getXaxisLimit() {
  //   const url = CommandsEnum.ROOT_URL + CommandsEnum.LIM
  //   fetch(url)
  //       .then((res) => res.text())
  //       .then((data) => {
  //           const limit = data.replace(/['"]+/g, '').replace(CommandsEnum.READY,'').replace(/[\[\]']+/g, '').replace(/ /g,'').split(',')
  //       });
  // }

  function drawTrace(dimension) {
    console.log("Fetching Trace from instrument");
    const url = CommandsEnum.ROOT_URL + CommandsEnum.TRACE;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlotTrace({
          x: data.xdata,
          y: data.ydata,
          type: "scatter",
        });

        setPlotLayout({
          width: dimension.width,
          height: dimension.height,
          title:
            "Optical spectrum " +
            data.instrument_model +
            " at " +
            convertToISODate(data.timestamp),
          xaxis: {
            title: data.xlabel + " (" + data.xunits + ")",
          },
          yaxis: {
            title: data.ylabel + " (" + data.yunits + ")",
          },
        });
      });
  }

  return (
    <div className="h-full bg-black">
      <Plot
        data={[plotTrace]}
        layout={plotLayout}
        onInitialized={() => console.log("Graph initialized")}
        onUpdate={() => console.log("Graph updated")}
      />
    </div>
  );
}

export default TracePlot;
