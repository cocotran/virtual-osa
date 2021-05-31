import { useState, useEffect } from "react";

import CommandsEnum from "../enum/commands";

function Terminal({
  terminalContent,
  setTerminalContentWrapper,
  setEnableStartBtnWrapper,
  setGetSinleTraceWrapper,
}) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (terminalContent != "") {
      if (terminalContent.startsWith(CommandsEnum.READY, 1)) {
        addNewLine("RES", terminalContent);
      } else {
        addNewLine("SCRIPT", terminalContent);
      }
      setTerminalContentWrapper("");
    }
  }, [terminalContent]);

  useEffect(() => {
    if (content.length > 0) {
      const contentObject = content[content.length - 1];
      if (contentObject.type == "SCRIPT") {
        const command = contentObject.content;

        if (command.toUpperCase().includes("LIM") && command.includes(" ")) {
          const i = command.indexOf(" ");
          const string = [command.slice(0, i), command.slice(i + 1)];
          sendQuery(string[0].toUpperCase(), string[1]).then((res) =>
            addNewLine("RES", res)
          );
        } else if (command.toUpperCase().includes(CommandsEnum.ECHO)) {
          const string = command.split(" ");
          sendQuery(string[0].toUpperCase(), string[1]).then((res) =>
            addNewLine("RES", res)
          );
        } else if (command.toUpperCase().includes(CommandsEnum.START)) {
          sendQuery(command.toUpperCase(), "").then((res) => {
            addNewLine(
              "RES",
              res +
                " Start data streaming with intrument. It might take few minutes to start."
            );
            setEnableStartBtnWrapper(
              res.replace(CommandsEnum.READY, "") != '"RUN:OK"'
            );
          });
        } else if (command.toUpperCase().includes(CommandsEnum.STOP)) {
          sendQuery(command.toUpperCase(), "").then((res) => {
            addNewLine("RES", res);
            setEnableStartBtnWrapper(
              res.replace(CommandsEnum.READY, "") == '"STOP:OK"'
            );
          });
        } else if (command.toUpperCase().includes(CommandsEnum.SINGLE)) {
          sendQuery(command.toUpperCase(), "").then((res) => {
            addNewLine("RES", res);
            setGetSinleTraceWrapper(
              res.replace(CommandsEnum.READY, "") == '"SINGLE:OK"'
            );
          });
        } else if (command.toUpperCase() in CommandsEnum) {
          sendQuery(command.toUpperCase(), "").then((res) =>
            addNewLine("RES", res)
          );
        } else {
          addNewLine("HELP", "Help Response");
        }
      }
    }
  }, [content]);

  function addNewLine(type, script) {
    const contentCopy = [...content];

    switch (type) {
      case "SCRIPT":
        const newContent = new TerminalLine("SCRIPT", script);
        contentCopy.push(newContent);
        break;

      case "RES":
        const newResponse = new TerminalLine("RES", script);
        contentCopy.push(newResponse);
        break;

      case "HELP":
        const newHelpResponse = new TerminalLine("HELP", script);
        contentCopy.push(newHelpResponse);
        break;

      default:
        break;
    }
    setContent(contentCopy);
    return true;
  }

  async function onKeyUpHandle(event) {
    const script = event.target.value;

    if (event.keyCode === 13) {
      addNewLine("SCRIPT", script);
      event.target.value = "";
    }
  }

  function displayLine(contentObject) {
    switch (contentObject.type) {
      case "SCRIPT":
        return <CommandLine content={contentObject.content} />;

      case "RES":
        return <p>{contentObject.content}</p>;

      case "HELP":
        return <HelpCommand />;

      default:
        break;
    }
  }

  async function sendQuery(command, q) {
    const url = CommandsEnum.ROOT_URL + command;
    const query = q ? "?q=" + q : "";
    const res = await fetch(url + query);
    if (command == CommandsEnum.TRACE) return res.json();
    else return res.text();
  }

  return (
    <label htmlFor="current">
      <div className="pb-10 h-48 bg-gray-900 text-lg scroller border-t-2 border-gray-500 flex flex-col-reverse">
        <div className="mx-10">
          <InputCommandLine onKeyUpHandle={onKeyUpHandle} />
        </div>

        <div className="mt-5 mx-10">
          {content.map((contentObject, index) => {
            return (
              <div key={index} className="text-gray-100">
                {displayLine(contentObject)}
              </div>
            );
          })}
        </div>
      </div>
    </label>
  );
}

export default Terminal;

function InputCommandLine({ onKeyUpHandle }) {
  const prefix = "cocotran@virtual-osa:";
  return (
    <div className="text-gray-100">
      <span className="text-green-400">{prefix}</span>
      <span className="mr-3 text-blue-300 tracking-wide"> /cmd/ $</span>
      <input
        type="text"
        id="current"
        className="bg-gray-900"
        autoComplete="off"
        onKeyUp={(e) => onKeyUpHandle(e)}
      ></input>
    </div>
  );
}

function CommandLine({ content }) {
  const prefix = "cocotran@virtual-osa:";
  return (
    <div className="text-gray-100">
      <span className="text-green-400">{prefix}</span>
      <span className="mr-3 text-blue-300 tracking-wide"> /cmd/ $</span>
      {content}
    </div>
  );
}

function HelpCommand() {
  const helpCommands = {
    IDN: "returns device identification string",
    LIM: "returns x-axis limits in m",
    "LIM [min, max]": "sets x-axis limits in nm",
    "ECHO string":
      "Emulates query command and sends a string to API, will get the same string back",
    PING: "Returns PONG",
    START: "sets instrument state to continues acquisition",
    STOP: "sets instrument state to IDLE",
    SINGLE:
      "starts a single scan (blocking operation, single scan takes few seconds)",
    STATE: "returns instrument state",
    TRACE: "returns OSA trace in json format",
  };

  return (
    <ul className="text-sm">
      <li>All available commands: </li>
      {Object.keys(helpCommands).map((key, index) => {
        return (
          <li key={index}>
            {key} - {helpCommands[key]}
          </li>
        );
      })}
    </ul>
  );
}

class TerminalLine {
  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
}
