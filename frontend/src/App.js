import TracePlot from "./components/TracePlot";
import ButtonsField from "./components/ButtonsField";
import Terminal from "./components/Terminal";

import { useState } from "react";

function App() {
  const [enableStartBtn, setEnableStartBtn] = useState(true);
  const [enableStopBtn, setEnableStopBtn] = useState(false);

  const [terminalContent, setTerminalContent] = useState("");

  function setEnableStartBtnWrapper(isEnable) {
    setEnableStartBtn(isEnable);
  }
  function setEnableStopBtnWrapper(isEnable) {
    setEnableStopBtn(isEnable);
  }

  function setTerminalContentWrapper(content) {
    setTerminalContent(content);
  }

  return (
    <div className="h-screen pt-3 bg-blue-900">
      <div className="w-full h-4/5 flex">
        <div className="w-5/6 mx-3">
          <TracePlot />
        </div>

        <div className="w-1/6">
          <ButtonsField
            enableStartBtn={enableStartBtn}
            enableStopBtn={enableStopBtn}
            setEnableStartBtnWrapper={setEnableStartBtnWrapper}
            setEnableStopBtnWrapper={setEnableStopBtnWrapper}
            setTerminalContentWrapper={setTerminalContentWrapper}
          />
        </div>
      </div>

      <div className="fixed bottom-0 w-full">
        <Terminal
          terminalContent={terminalContent}
          setTerminalContentWrapper={setTerminalContentWrapper}
        />
      </div>
    </div>
  );
}

export default App;
