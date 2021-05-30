import StartButton from "./Buttons/StartButton";
import StopButton from "./Buttons/StopButton";
import SingleButton from "./Buttons/SingleButton";

function ButtonsField({
  enableStartBtn,
  enableStopBtn,
  setEnableStartBtnWrapper,
  setEnableStopBtnWrapper,
  setTerminalContentWrapper,
}) {
  return (
    <div className="text-center">
      <StartButton
        enableStartBtn={enableStartBtn}
        setEnableStartBtnWrapper={setEnableStartBtnWrapper}
        setEnableStopBtnWrapper={setEnableStopBtnWrapper}
        setTerminalContentWrapper={setTerminalContentWrapper}
      />
      <StopButton
        enableStopBtn={enableStopBtn}
        setEnableStartBtnWrapper={setEnableStartBtnWrapper}
        setEnableStopBtnWrapper={setEnableStopBtnWrapper}
        setTerminalContentWrapper={setTerminalContentWrapper}
      />
      <SingleButton setTerminalContentWrapper={setTerminalContentWrapper} />
    </div>
  );
}

export default ButtonsField;
