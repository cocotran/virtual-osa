import CommandsEnum from "../../enum/commands";

import { useState } from "react";

function SingleButton({
  setTerminalContentWrapper,
  getSingleTrace,
  setGetSinleTraceWrapper,
}) {
  function onClickHandle() {
    if (getSingleTrace) {
      setTerminalContentWrapper(CommandsEnum.SINGLE);
      setGetSinleTraceWrapper(false);
    }
  }

  return (
    <div>
      <button
        className={
          (getSingleTrace
            ? "bg-gray-300 cursor-pointer "
            : "bg-gray-700 cursor-not-allowed ") +
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
