import CommandsEnum from "../../enum/commands";

function StopButton({
  enableStopBtn,
  setEnableStartBtnWrapper,
  setEnableStopBtnWrapper,
  setTerminalContentWrapper,
}) {
  function onClickHandle() {
    if (enableStopBtn) {
      setTerminalContentWrapper(CommandsEnum.STOP);
      const url = CommandsEnum.ROOT_URL + CommandsEnum.STOP;
      fetch(url)
        .then((res) => res.text())
        .then((data) => handleData(data));
    }
  }

  function handleData(data) {
    if (data.startsWith(CommandsEnum.READY, 1)) {
      // data is in form "+READY>", '+' is index 1
      setTerminalContentWrapper(data);
      const state = data.replace(CommandsEnum.READY, "") != '"STOP:OK"';
      setEnableStartBtnWrapper(!state);
      setEnableStopBtnWrapper(state);
    }
  }

  return (
    <div>
      <button
        className={
          (enableStopBtn
            ? "bg-red-500 cursor-pointer "
            : "bg-gray-800 cursor-not-allowed ") +
          " mt-10 w-3/5 py-5 text-xl font-bold rounded-md"
        }
        onClick={onClickHandle}
      >
        Stop Button
      </button>
    </div>
  );
}

export default StopButton;
