import Plot from "react-plotly.js";

import { useState, useEffect } from "react";

import useWebSocket from "react-use-websocket";

import CommandsEnum from "../enum/commands";

function TracePlot({
  enableStartBtn,
  getSingleTrace,
  setGetSinleTraceWrapper,
  isMeter,
}) {
  const [plotTrace, setPlotTrace] = useState({});
  const [plotLayout, setPlotLayout] = useState({});

  // Set dimension of graph base on screen width
  async function getPlotDimension() {
    return {
      width: window.innerWidth * (5 / 6),
      height: window.innerHeight * (4 / 5),
    };
  }

  // Initialize graph dimension
  useEffect(() => {
    async function setPlot() {
      const dimension = await getPlotDimension();
      setPlotLayout(dimension);
    }

    setPlot();
  }, []);

  // Set graph dimension when resize screen
  async function handleResize(event) {
    const dimension = await getPlotDimension();
    setPlotLayout(dimension);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
  }

  // Convert string date from instrument to ISO format
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

  // Convert value in meter to MHz
  function meterToFrequency(meterArray) {
    // Formula:  f = C/λ
    // λ (Lambda) = Wavelength in meters
    // c = Speed of Light (299,792,458 m/s)
    // f = Frequency (MHz)

    // Speed of Light (299,792,458 m/s)
    const C = 299792458;

    const frequencyArray = meterArray.map((item) => {
      return item * C;
    });
    return frequencyArray;
  }

  const socketUrl = CommandsEnum.SOCKET_URL;

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => console.log("opened"),
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => false,
    },
    !enableStartBtn
  );

  // Listening to data from instrument and update graph 
  useEffect(() => {
    async function updatePlot(traceJson) {
      // sendMessage('Hello')
      // console.log(lastJsonMessage)
      const dimension = await getPlotDimension();
      drawTrace(traceJson, dimension);
    }

    async function updateSingleTrace() {
      const singleTrace = await fetch(
        CommandsEnum.ROOT_URL + CommandsEnum.TRACE
      );
      const singleTraceJson = await singleTrace.json();
      const dimension = await getPlotDimension();
      drawTrace(singleTraceJson, dimension);
      console.log("Update single trace");
      console.log(singleTraceJson);
    }

    if (!enableStartBtn && getSingleTrace && lastJsonMessage != null) {
      updatePlot(lastJsonMessage);
    } else if (enableStartBtn && !getSingleTrace) {
      updateSingleTrace();
      setGetSinleTraceWrapper(true);
    }

    console.log(lastJsonMessage);
  }, [lastJsonMessage, getSingleTrace]);

  function drawTrace(data, dimension) {
    console.log("Updating graph");
    setPlotTrace({
      x: isMeter ? data.xdata : meterToFrequency(data.xdata), // Display value in meter or MHz base on user input
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
        title: data.xlabel + " (" + (isMeter ? data.xunits : "MHz") + ")",
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
