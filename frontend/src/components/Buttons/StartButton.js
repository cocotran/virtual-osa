import CommandsEnum from "../../enum/commands";

function StartButton({enableStartBtn, setEnableStartBtnWrapper, setEnableStopBtnWrapper, setTerminalContentWrapper}) {

    function onClickHandle() {
        if (enableStartBtn) {
            setTerminalContentWrapper(CommandsEnum.START)
            const url = CommandsEnum.ROOT_URL + CommandsEnum.START
            fetch(url).then(res => res.text()).then(data => handleData(data))
        }
    }

    function handleData(data) {
        if (data.startsWith(CommandsEnum.READY, 1)) {   // data is in form "+READY>", '+' is index 1
            setTerminalContentWrapper(data)
            const state = data.replace(CommandsEnum.READY, "") != '"RUN:OK"'
            setEnableStartBtnWrapper(state)
            setEnableStopBtnWrapper(!state)
        }
    }

    return (
        <div>
            <button className={(enableStartBtn ? "bg-green-500 cursor-pointer " : "bg-gray-800 cursor-not-allowed ") + " mt-10 w-3/5 py-5 text-xl font-bold rounded-md"}
            onClick={onClickHandle}
            >Start Button</button>
        </div>
    )
}

export default StartButton;