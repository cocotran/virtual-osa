const CommandsEnum = Object.freeze({
  READY: "+READY>",
  ROOT_URL: "http://127.0.0.1:8000/api/",
  IDN: "IDN",
  LIM: "LIM",
  SETLIM: "LIM/",
  ECHO: "ECHO/",
  PING: "PONG",
  START: "START",
  STOP: "STOP",
  SINGLE: "SINGLE",
  STATE: "STATE",
  TRACE: "TRACE",
});

export default CommandsEnum;
