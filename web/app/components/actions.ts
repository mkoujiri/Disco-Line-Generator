const apiUrl = "";

export async function GetRoster(): Promise<RosterPlayer[]> {
  const response = await fetch(`${apiUrl}/set_line`, {
    method: "GET"
  })
  return response.json();
}

export async function UpdateRoster(players: String[]) {
  return null;
}

export async function GenerateLine(): Promise<String[]> {
  return ["Tom", "Mattie", "Liam", "Tom", "Mattie", "Liam", "Tom",];
}

export async function ResetGenerator(){

}