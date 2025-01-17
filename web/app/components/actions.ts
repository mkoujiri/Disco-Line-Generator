const apiUrl = "http://127.0.0.1:5000";

export async function GetRoster(): Promise<RosterPlayer[]> {
  const response = await fetch(`${apiUrl}/set_line`, {
    method: "GET"
  })
  return response.json();
}

export async function GetFakeRoster(): Promise<RosterPlayer[]> {
  
  return [{name: "tom", selected: true}, {name: "mattie", selected: true}, {name: "liam", selected: false}];
}

export async function UpdateRoster(players: RosterPlayer[]) {
  await fetch(`${apiUrl}/set_line`, {
    method: "POST",
    body: JSON.stringify(players)
  })
}

export async function GenerateLine(): Promise<Line> {
  const response = await fetch(`${apiUrl}/gen_line`, {
    method: "GET"
  })
  return response.json();
}

export async function GenerateFakeLine(): Promise<Line> {
  return {
    dline: [
      "Peyton",
      "Mark",
      "Thomas",
      "Jacob",
      "Matvey",
      "Caeser",
      "Andy"
    ],
    oline: [
      "Quin",
      "Schwartz",
      "Josh",
      "Michael",
      "Mattie",
      "Liam",
      "Koz"
    ]
  }
}

export async function ResetGenerator(){

}
