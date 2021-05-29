import StartButton from "./Buttons/StartButton";
import StopButton from "./Buttons/StopButton";
import SingleButton from "./Buttons/SingleButton";

function ButtonsField({enableStartBtn, enableStopBtn, setEnableStartBtnWrapper, setEnableStopBtnWrapper}) {
    return (
        <div className="text-center">

            <StartButton enableStartBtn={enableStartBtn} setEnableStartBtnWrapper={setEnableStartBtnWrapper} setEnableStopBtnWrapper={setEnableStopBtnWrapper} />
            <StopButton enableStopBtn={enableStopBtn} setEnableStartBtnWrapper={setEnableStartBtnWrapper} setEnableStopBtnWrapper={setEnableStopBtnWrapper} />
            <SingleButton />

        </div>
    )
}

export default ButtonsField;