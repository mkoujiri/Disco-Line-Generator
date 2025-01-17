const apiUrl = "";

export async function GetRoster(): Promise<RosterPlayer[]> {
  const response = await fetch(`${apiUrl}/set_line`, {
    method: "GET"
  })
  return response.json();
}

export async function UpdateRoster(players: RosterPlayer[]) {
  await fetch(`${apiUrl}/set_line`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(players)
  })
}

export async function GenerateLine(): Promise<String[]> {
  return ["Tom", "Mattie", "Liam", "Tom", "Mattie", "Liam", "Tom",];
}

export async function ResetGenerator(){

}