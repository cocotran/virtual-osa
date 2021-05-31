import CommandsEnum from "../../enum/commands";

import { useState } from "react";

function SingleButton({ setTerminalContentWrapper }) {
  const [enableSingleBtn, setEnableSingleBtn] = useState(true);

  function onClickHandle() {
    if (enableSingleBtn) {
      setTerminalContentWrapper(CommandsEnum.SINGLE);
      setEnableSingleBtn(false);
    }
  }

  return (
    <div>
      <button
        className={
          (enableSingleBtn
            ? "bg-gray-300 cursor-pointer "
            : "bg-gray-800 cursor-not-allowed ") +
          " mt-10 w-3/5 py-5 text-xl font-bold rounded-md"
        }
        onClick={onClickHandle}
      >
        SINGLE
      </button>
    </div>
  );
}

export default SingleButton;
