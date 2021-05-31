const CommandsEnum = Object.freeze({
  READY: "+READY>",
  ROOT_URL: "https://virtual-osa.herokuapp.com/api/",
  SOCKET_URL: "ws:////virtual-osa.herokuapp.com/ws",
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
