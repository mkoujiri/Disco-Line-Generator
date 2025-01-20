import os.path
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from datetime import datetime

from flask import Flask, request
from enum import Enum
import random
from flask_cors import CORS

SPREADSHEET_ID = "1UIThPUV3PVG88XLgROorz1ihECndz1odUNYegEj81uU"

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# helper for cell conversion
def num_to_col_letter(n):
    """Converts a column number to its corresponding letter representation."""
    result = ""
    while n > 0:
        n, remainder = divmod(n - 1, 26)
        result = chr(65 + remainder) + result
    return result

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
    print("created bucket with: ", [x.name for x in bucket])
    return bucket

def authenticate_api(SCOPES):
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                  "credentials.json", SCOPES
                  )
            creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open("token.json", "w") as token:
                token.write(creds.to_json())
    return creds

def write_players_to_sheet():
    try:
        service = build("sheets", "v4", credentials=creds)

        # build msg body and range
        sheet_range = "Sheet1!B1:Z1"
        result = (
            service.spreadsheets().values()
            .get(spreadsheetId=SPREADSHEET_ID, range=sheet_range)
            .execute()
        )
        sheet_data = result.get('values',[])

        date = datetime.today().strftime('%m/%d')

        values = [[date]] + [[x.attending] for x in Player.players]
        if len(sheet_data) > 0:
            if date[1:] in sheet_data[0]:
                date = date[1:]
            column = num_to_col_letter(sheet_data[0].index(date)+2) if date in sheet_data[0] else num_to_col_letter(len(sheet_data[0])+2)
            write_range = f"{column}1:{column}{len(Player.players)+1}"

            if date in sheet_data[0]:
                # first we check the write range and see what exists, and keep whoever is marked as attending
                result = (
                    service.spreadsheets().values()
                    .get(spreadsheetId=SPREADSHEET_ID, range=write_range)
                    .execute()
                )

                current_attendance = [x for [x] in result['values'][1:]]
                if(len(current_attendance) > 0):
                    for i in range(len(values[1:])):
                        if current_attendance[i] == "TRUE":
                            values[i+1][0] = True
        else:
            write_range = f"B1:B{len(Player.players)+1}"
        

        body = {"values": values}
        # write result
        result = (
            service.spreadsheets().values()
            .update(spreadsheetId=SPREADSHEET_ID, range=write_range, valueInputOption="USER_ENTERED", body=body)
            .execute()
        )

        print('wrote to attendance sheet')
    except HttpError as error:
        print(error)



with app.app_context():
    global oline_bucket, backup_o_bucket,dline_bucket,backup_d_bucket,creds
    print("creating empty buckets")
    oline_bucket = []
    backup_o_bucket = []
    dline_bucket = []
    backup_d_bucket = []

    print("authenticating with Sheets API")
    SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
    # The ID and range of a sample spreadsheet.
    creds = authenticate_api(SCOPES)


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

def get_next_line(team):
    global oline_bucket,backup_o_bucket,dline_bucket,backup_d_bucket
    peeps = [x for x in Player.players if x.line == team and x.attending]
    if team == "O":
        bucket = oline_bucket
        result = bucket_choice(peeps, backup_o_bucket, 7)
        backup_o_bucket = result['bucket']
    else:
        bucket = dline_bucket
        result = bucket_choice(peeps, backup_d_bucket, 7)
        backup_d_bucket = result['bucket']

    line = result['line']

    err_count = 0
    while(len(line) < 7):
        err_count+=1
        result = bucket_choice(peeps, bucket, 7 - len(line), line)
        # store bucket result
        if team == "O":
            oline_bucket = result['bucket']
        else:
            dline_bucket = result['bucket']
        line = line + result['line']
        if(len(line) < 7):
            if team == "O":
                backup_o_bucket = oline_bucket.copy()
                oline_bucket = build_bucket(peeps)
                bucket = oline_bucket
            else:
                backup_d_bucket = dline_bucket.copy()
                dline_bucket = build_bucket(peeps)
                bucket = dline_bucket
        if err_count == 5:
            break;

    for player in peeps:
        if player not in line:
            player.streak = 0
        else:
            player.streak += 1
    return [x.name for x in line]

@app.route("/api/gen_line",methods=["GET"])
def gen_line():
    oline = get_next_line("O")
    dline = get_next_line("D")
    # log line
    with open('line_log','a') as f:
        f.write("oline:"+",".join(oline) + ' ')
        f.write("dline:"+",".join(dline) + '\n')
    return {
            "oline": oline,
            "dline": dline
            }
@app.route("/api/test", methods=["GET"])
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

@app.route("/api/set_line", methods=['GET','POST'])
def update_line():
    global oline_bucket, dline_bucket, backup_o_bucket, backup_d_bucket
    if request.method == "POST":
        data = request.get_json()
        # shitty solution to update players
        for item in data:
            for player in Player.players:
                if player.name == item['name']:
                    tmp = player.attending
                    player.attending = item['selected']
                    # if player has left
                    if not player.attending and tmp != player.attending:
                        # remove from buckets so they aren't chosen again
                        oline_bucket = [x for x in oline_bucket if x != player]
                        backup_o_bucket = [x for x in backup_o_bucket if x != player]
                        dline_bucket = [x for x in dline_bucket if x != player]
                        backup_d_bucket = [x for x in backup_d_bucket if x != player]

        
        write_players_to_sheet()
        return {}

    elif request.method == "GET":
        if(len(Player.players) == 0):
            load_players_from_file("player-data-1-16.csv")
        ret_dict = [{"name":x.name,"selected":x.attending} for x in Player.players]
        return ret_dict

@app.route("/api/reset", methods=["POST"])
def reset_lines():
    global oline_bucket, dline_bucket, backup_o_bucket, backup_d_bucket
    if request.method == "POST":
        Player.players = []
        oline_bucket = []
        dline_bucket = []
        backup_o_bucket = []
        backup_d_bucket = []
        load_players_from_file("player-data-1-16.csv")
    return {}


@app.route("/api")
def hello_world():
    # generate player list
    return "<p>Hello World</p>"
