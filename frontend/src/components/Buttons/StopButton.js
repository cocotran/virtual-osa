import CommandsEnum from "../../enum/commands";

function StopButton({ enableStartBtn, setTerminalContentWrapper }) {
  function onClickHandle() {
    if (!enableStartBtn) {
      setTerminalContentWrapper(CommandsEnum.STOP);
    }
  }

  return (
    <div>
      <button
        className={
          (!enableStartBtn
            ? "bg-red-500 cursor-pointer "
            : "bg-gray-700 cursor-not-allowed ") +
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
