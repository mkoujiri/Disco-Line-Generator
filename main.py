from flask import Flask, request
from enum import Enum
import random


class Player:
    players = []
    def __init__(self,name,priority,line,position):
        # TODO add cores
        self.name = name
        self.priority = priority
        self.line = line
        self.pos = position

        self.streak = 0
        self.attending = False

def load_players_from_file(file_name):
    with open(file_name, 'r') as f:
        # skip header
        for line in f.readlines()[1:]:
            name,priority,pos,line = line.strip('\n').split(',')
            new_p = Player(name,priority,line,pos)
            Player.players.append(new_p)

def build_bucket(player_list):
    # build bucket
    bucket = []
    for player in player_list:
        match int(player.priority):
            case 4:
                for i in range(4):
                    bucket.append(player)
            case 3:
                for i in range(3):
                    bucket.append(player)
            case 2:
                for i in range(2):
                    bucket.append(player)
            case 1:
                for i in range(1):
                    bucket.append(player)
    print("created new bucket with length: ",len(bucket))
    return bucket


oline_bucket = []
backup_o_bucket = []
dline_bucket = []
backup_d_bucket = []

app = Flask(__name__)

def bucket_choice(player_list, bucket, count, excludes=[]):
    line = []
    bucket_copy = bucket.copy()

    # removes players that are already on the line
    bucket_copy = [x for x in bucket_copy if x not in excludes]

    # select count players
    for i in range(count):
        # for each player selection, we choose 5 players from the bucket and then choose the lowest streaking player
        # a higher number reduces the chances of repeat points
        if len(bucket_copy) == 0:
            break;
            
        choices = random.sample(range(len(bucket_copy)),min(5,len(bucket_copy)))

        # select cheapest option
        # assuming players in choices aren't in lines
        best_option = choices[0]
        for choice in choices[1:]:
            if bucket_copy[choice].streak < bucket_copy[best_option].streak:
                best_option = choice

        # remove from bucket and add to line
        bucket.remove(bucket_copy[best_option])
        line.append(bucket_copy[best_option])
        player_removed = bucket_copy[best_option]
        bucket_copy = [x for x in bucket_copy if x != player_removed]
    return { "bucket": bucket, "line": line }

            


def get_next_oline():
    global oline_bucket, backup_o_bucket
    peeps = [x for x in Player.players if x.line == "O" and x.attending] 

    # get scragglers
    result = bucket_choice(peeps, backup_o_bucket, 7)
    line = result['line']
    backup_o_bucket = result['bucket']

    # add new players from bucket
    while(len(line) < 7):
        result = bucket_choice(peeps, oline_bucket, 7 - len(line))
        # store bucket result
        oline_bucket = result['bucket']
        line = line + result['line']
        
        if(len(line) < 7):
            # build new bucket and store old extras
            backup_o_bucket = oline_bucket.copy()
            oline_bucket = build_bucket(peeps)

    return [x.name for x in line]

def get_next_dline():
    global dline_bucket, backup_d_bucket
    peeps = [x for x in Player.players if x.line == "D" and x.attending] 

    # get scragglers
    result = bucket_choice(peeps, backup_d_bucket, 7)
    line = result['line']
    backup_d_bucket = result['bucket']

    # add new players from bucket
    while(len(line) < 7):
        result = bucket_choice(peeps, dline_bucket, 7 - len(line))
        # store bucket result
        dline_bucket = result['bucket']
        line = line + result['line']
        
        if(len(line) < 7):
            # build new bucket and store old extras
            backup_d_bucket = dline_bucket.copy()
            dline_bucket = build_bucket(peeps)

    return [x.name for x in line]

@app.route("/gen_line",methods=["GET"])
def gen_line():
    return {
            "oline": get_next_oline(),
            "dline": get_next_dline()
            }
@app.route("/test", methods=["GET"])
def test():
    results_dict = {}
    for i in range(10000):
        line = get_next_oline()
        for player in line:
            if player not in results_dict.keys():
                results_dict[player] = 1
            else:
                results_dict[player] = results_dict[player]+1
    return results_dict

@app.route("/set_line", methods=['GET','POST'])
def update_line():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        # shitty solution to update players
        for item in data:
            for player in Player.players:
                if player.name == item['name']:
                    player.attending = item['selected']

    elif request.method == "GET":
        load_players_from_file("player-data-1-16.csv")
        ret_dict = [{"name":x.name,"selected":x.attending} for x in Player.players]
        return ret_dict


@app.route("/")
def hello_world():
    # generate player list
    return "<p>Hello World</p>"
