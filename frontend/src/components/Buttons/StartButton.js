import CommandsEnum from "../../enum/commands";

function StartButton({ enableStartBtn, setTerminalContentWrapper }) {
  function onClickHandle() {
    if (enableStartBtn) {
      setTerminalContentWrapper(CommandsEnum.START);
    }
  }

  return (
    <div>
      <button
        className={
          (enableStartBtn
            ? "bg-green-500 cursor-pointer "
            : "bg-gray-700 cursor-not-allowed ") +
          " mt-10 w-3/5 py-5 text-xl font-bold rounded-md"
        }
        onClick={onClickHandle}
      >
        Start Button
      </button>
    </div>
  );
}

export default StartButton;
