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
            data.timestamp,
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
