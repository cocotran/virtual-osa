from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket

from typing import Optional

import requests
import asyncio
from enum import Enum
from requests.models import Response
from time import sleep

import json
import backoff


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


def is_random_string(str: str) -> bool:
    try:
        json_object = json.loads(str)
    except ValueError as e:
        return not str.startswith(Commands.READY.value)
    return False

# Retry if response is random string
@backoff.on_predicate(backoff.constant, is_random_string, max_tries=5, interval=1)
@backoff.on_exception(backoff.expo, requests.exceptions.RequestException, max_tries=5)
def get_data(url: str, query: str) -> str:
    response: Response = requests.get(url=url + query)
    return response.text


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

    res = get_data(url, query)
    
    return res if cmd != Commands.TRACE.value else json.loads(res)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            await asyncio.sleep(1)
            trace: Response = requests.get(Commands.ROOT_URL.value + Commands.TRACE.value)
            await websocket.send_json(trace.json())
        except:
            pass