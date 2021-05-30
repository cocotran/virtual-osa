from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from enum import Enum
import requests
from requests.models import Response

# Initialize Fast API app
app = FastAPI()

# List of accepted origins
origins = [ 
    "http://localhost:3000",
    "https://virtual-osa.vercel.app"
]

# CONFIGURE CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Commands(Enum):
    READY = "+READY>"
    ROOT_URL = "http://flaskosa.herokuapp.com/cmd/"
    IDN = "IDN"         # returns device identification string
    LIM = "LIM"         # returns x-axis limits in m
    SETLIM = "LIM/"     # sets x-axis limits in nm
    ECHO = "ECHO/"      # emulates query command and sends a string to API, will get the same string back
    PING = "PONG"       # returns PONG
    START = "START"     # sets instrument state to continues acquisition
    STOP = "STOP"       # sets instrument state to IDLE
    SINGLE = "SINGLE"   # starts a single scan (blocking operation, single scan takes few seconds)
    STATE = "STATE"     # returns instrument state
    TRACE = "TRACE"     # returns instrument state


@app.get("/hello/{name}")
def hello(name: str):
    return "Hello " + name


# API path for all commands
@app.get("/api/{cmd}")
def get_instrument_info(cmd: str, q: Optional[str] = None):
    # URL to connect to virtual OSA
    url: str = Commands.ROOT_URL.value + cmd

    # Query for LIM and ECHO commands
    query: str = "/" + q if q != None else ""

    while True:
        # Make request to virtual OSA
        response: Response = requests.get(url=url + query)

        if cmd == Commands.TRACE.value: # TRACE command
            try:
                return response.json()
            except:
                print("Not a valid JSON object")

        else:   # all others commands
            if response.text.startswith(Commands.READY.value):
                return response.text

