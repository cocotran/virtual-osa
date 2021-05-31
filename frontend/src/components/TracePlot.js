import Plot from "react-plotly.js";

import { useState, useEffect } from "react";

import useWebSocket from "react-use-websocket";

import CommandsEnum from "../enum/commands";

function TracePlot({ enableStartBtn }) {
  // const [plotLimit, setPlotLimit] = useState([])
  const [plotTrace, setPlotTrace] = useState({});
  const [plotLayout, setPlotLayout] = useState({});

  async function getPlotDimension() {
    return {
      width: window.innerWidth * (5 / 6),
      height: window.innerHeight * (4 / 5),
    };
  }

  useEffect(() => {
    async function setPlot() {
      const dimension = await getPlotDimension();
      setPlotLayout(dimension);
    }

    setPlot();
  }, []);

  async function handleResize(event) {
    const dimension = await getPlotDimension();
    setPlotLayout(dimension);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  function convertToISODate(inputDate) {
    // Input date is in format "YY.MM.DD hh:mm:ss"
    const split = inputDate.split(" ");
    const date = split[0].split(".");
    const time = split[1].split(":");
    const newDate = new Date(
      Number("20" + date[0]),
      Number(date[1]),
      Number(date[2]),
      Number(time[0]),
      Number(time[1]),
      Number(time[2])
    );
    return newDate.toISOString();
  }

  // function getXaxisLimit() {
  //   const url = CommandsEnum.ROOT_URL + CommandsEnum.LIM
  //   fetch(url)
  //       .then((res) => res.text())
  //       .then((data) => {
  //           const limit = data.replace(/['"]+/g, '').replace(CommandsEnum.READY,'').replace(/[\[\]']+/g, '').replace(/ /g,'').split(',')
  //       });
  // }

  const socketUrl = "ws://localhost:8000/ws";

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => console.log("opened"),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => false,
    },
    !enableStartBtn
  );

  useEffect(() => {
    async function updatePlot() {
      // sendMessage('Hello')
      // console.log(lastJsonMessage)
      const dimension = await getPlotDimension();
      drawTrace(lastJsonMessage, dimension);
    }

    if (!enableStartBtn && lastJsonMessage != null) updatePlot();

    console.log(lastJsonMessage);
  }, [lastJsonMessage]);

  function drawTrace(data, dimension) {
    console.log("Updating graph");
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
