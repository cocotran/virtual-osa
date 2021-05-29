import { func } from 'prop-types';
import {useState, useRef } from 'react'

import CommandsEnum from '../enum/commands';

function Terminal({}) {

    const ref = useRef(null);

    const [content, setContent] = useState([]);

    function onKeyUpHandle(event) {
        const script = event.target.value;
        if (event.keyCode === 13) {
            const contentCopy = [...content]
            
            const newContent = new TerminalLine("SCRIPT", script)
            contentCopy.push(newContent)
            event.target.value = ""

            if (script.toUpperCase() in CommandsEnum) {
                const newResponse = new TerminalLine("RES", "Response")
                contentCopy.push(newResponse)
            }
            else {
                const newHelpResponse = new TerminalLine("HELP", "Help Response")
                contentCopy.push(newHelpResponse)
            }
            setContent(contentCopy);
        }
    }

    function displayLine(contentObject) {
        switch (contentObject.type) {
            case "SCRIPT":
                return <CommandLine content={contentObject.content} />;

            case "RES":
                return <p>{contentObject.content}</p>;

            case "HELP":
                return <HelpCommand />
            
            default:
                break;
        }
    }

    return (
        <label htmlFor="current">
            <div className="pb-5 h-60 bg-gray-900 text-lg scroller border-t-2 border-gray-500 flex flex-col-reverse">

                <div ref={ref} className="mx-10">
                    <InputCommandLine onKeyUpHandle={onKeyUpHandle} />
                </div>

                <div className="mt-5 mx-10">
                    {content.map((contentObject, index) => { 
                        return (
                            <div key={index} className="text-gray-100">
                                {displayLine(contentObject)}
                            </div>
                    )})}
                </div>

                
            </div>
        </label>
    )
}

export default Terminal;

function InputCommandLine({onKeyUpHandle}) {

    const prefix = "cocotran@virtual-osa:";
    return (
        <div className="text-gray-100">
            <span className="text-green-400">{prefix}</span>
            <span className="mr-3 text-blue-300 tracking-wide"> /cmd/ $</span>
            <input type="text" id="current" className="bg-gray-900" autoComplete="off" onKeyUp={e => onKeyUpHandle(e)}></input>
        </div>
    )
}

function CommandLine({content}) {
    const prefix = "cocotran@virtual-osa:";
    return (
        <div className="text-gray-100">
            <span className="text-green-400">{prefix}</span>
            <span className="mr-3 text-blue-300 tracking-wide"> /cmd/ $</span>
            {content}
        </div>
    )
}

function HelpCommand() {
    
    const helpCommands = {
        "IDN": "returns device identification string", 
        "LIM": "returns x-axis limits in m",
        "LIM/": "sets x-axis limits in nm",
        "ECHO": "Emulates query command and sends a string to API, will get the same string back",
        "PING": "Returns PONG",
        "START": "sets instrument state to continues acquisition",
        "STOP": "sets instrument state to IDLE",
        "SINGLE": "starts a single scan (blocking operation, single scan takes few seconds)",
        "STATE": "returns instrument state",
        "TRACE": "returns OSA trace in json format"
    }

    return (
        <ul className="text-sm">
            <li>All available commands: </li>
            {Object.keys(helpCommands).map((key, index) => {
                return (
                    <li key={index}>{key} - {helpCommands[key]}</li>
                )
            })}
        </ul>
    )
}

class TerminalLine {
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }
}