import StartButton from "./Buttons/StartButton";
import StopButton from "./Buttons/StopButton";
import SingleButton from "./Buttons/SingleButton";


function ButtonsField({}) {
    return (
        <div className="text-center">

            <StartButton />
            <StopButton />
            <SingleButton />

        </div>
    )
}

export default ButtonsField;