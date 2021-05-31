import TracePlot from "./components/TracePlot";
import ButtonsField from "./components/ButtonsField";
import Terminal from "./components/Terminal";

import { useState, useEffect } from "react";

function App() {
  const [enableStartBtn, setEnableStartBtn] = useState(true);

  const [getSingleTrace, setGetSingleTrace] = useState(true)

  const [terminalContent, setTerminalContent] = useState("");

  function setEnableStartBtnWrapper(isEnable) {
    setEnableStartBtn(isEnable);
  }

  function setTerminalContentWrapper(content) {
    setTerminalContent(content);
  }

  function setGetSinleTraceWrapper(getSingleTrace) {
    setGetSingleTrace(getSingleTrace);
  }

  return (
    <div className="h-screen pt-3 bg-blue-900">
      <div className="w-full h-4/5 flex">
        <div className="w-5/6 mx-3">
          <TracePlot 
            enableStartBtn={enableStartBtn}
            getSingleTrace={getSingleTrace}
            setGetSinleTraceWrapper={setGetSinleTraceWrapper} 
          />
        </div>

        <div className="w-1/6">
          <ButtonsField
            enableStartBtn={enableStartBtn}
            setEnableStartBtnWrapper={setEnableStartBtnWrapper}
            setTerminalContentWrapper={setTerminalContentWrapper}
            getSingleTrace={getSingleTrace}
            setGetSinleTraceWrapper={setGetSinleTraceWrapper}
          />
        </div>
      </div>

      <div className="fixed bottom-0 w-full">
        <Terminal
          terminalContent={terminalContent}
          setTerminalContentWrapper={setTerminalContentWrapper}
          setEnableStartBtnWrapper={setEnableStartBtnWrapper}
          setGetSinleTraceWrapper={setGetSinleTraceWrapper}
        />
      </div>
    </div>
  );
}

export default App;
