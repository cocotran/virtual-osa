import StartButton from "./Buttons/StartButton";
import StopButton from "./Buttons/StopButton";
import SingleButton from "./Buttons/SingleButton";

function ButtonsField({
  enableStartBtn,
  setEnableStartBtnWrapper,
  setTerminalContentWrapper,
  getSingleTrace,
  setGetSinleTraceWrapper
}) {
  return (
    <div className="text-center">
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
    </div>
  );
}

export default ButtonsField;
