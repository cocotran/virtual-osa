import StartButton from "./Buttons/StartButton";
import StopButton from "./Buttons/StopButton";
import SingleButton from "./Buttons/SingleButton";

function ButtonsField({
  enableStartBtn,
  setEnableStartBtnWrapper,
  setTerminalContentWrapper,
  getSingleTrace,
  setGetSinleTraceWrapper,
  isMeter,
  setIsMeter,
}) {
  return (
    <div className="relative text-center">
      <StartButton
        enableStartBtn={enableStartBtn}
        setEnableStartBtnWrapper={setEnableStartBtnWrapper}
        setTerminalContentWrapper={setTerminalContentWrapper}
      />
      <StopButton
        enableStartBtn={enableStartBtn}
        setEnableStartBtnWrapper={setEnableStartBtnWrapper}
        setTerminalContentWrapper={setTerminalContentWrapper}
      />
      <SingleButton
        setTerminalContentWrapper={setTerminalContentWrapper}
        getSingleTrace={getSingleTrace}
        setGetSinleTraceWrapper={setGetSinleTraceWrapper}
      />

      <button
        className="bg-gray-400 mt-32 w-3/5 py-5 rounded-md"
        onClick={() => {
          setIsMeter(!isMeter);
        }}
      >
        Convert to {isMeter ? "Frequency" : "Meter"}
      </button>
    </div>
  );
}

export default ButtonsField;
