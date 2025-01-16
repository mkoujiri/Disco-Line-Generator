from flask import Flask
from enum import Enum

app = Flask(__name__)

class Position(Enum):
    CUTTER="CUTTER"
    HYBRID="HYBRID"
    HANDLER="HANDLER"

class Line(Enum):
    O="O"
    D="D"

class Priority(Enum):
    STARTER="STARTER"
    HIGH="HIGH"
    MEDIUM="MEDIUM"
    LOW="LOW"


class Player:
    players = []
    def __init__(self,name,priority,line,position):
        # TODO add cores
        self.name = name
        self.priority = priority
        self.line = line
        self.pos = position

def load_players_from_file(file_name):
    with open(file_name, 'r') as f:
        for line in f.readlines():
            print(line)
            name,priority,line,pos = line.strip('\n').split(',')
            new_p = Player(name,priority,line,pos)
            Player.players.append(new_p)


def get_next_oline():
    # separate into handlers/cutters
    # assumed 3 hands for now
    hands = [x for x in Player.players if x.pos == 'HANDLER' or x.pos == 'HYBRID']

    # first we have to pick handlers
    print(hands)
    
    cutters = [x for x in Player.players if x.pos == "CUTTER" or x.pos == "HYBRID"]

    return []

def get_next_dline():
    return []

@app.route("/gen_line",methods=["GET"])
def gen_line():
    return {
            "oline": get_next_oline(),
            "dline": get_next_dline()
            }

@app.route("/")
def hello_world():
    # generate player list
    load_players_from_file("player-data")

    return "<p>Hello World</p>"
