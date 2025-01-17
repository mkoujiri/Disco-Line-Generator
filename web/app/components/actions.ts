"use server"
const apiUrl = "http://127.0.0.1:5000";

export async function GetRoster(): Promise<RosterPlayer[]> {
  try {
    const response = await fetch(`${apiUrl}/set_line`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();;
  } catch (error) {
    throw new Error("Failed to fetch line data. Please try again later.");
  }
}

export async function GetFakeRoster(): Promise<RosterPlayer[]> {
  return [
    { name: "tom", selected: true },
    { name: "mattie", selected: true },
    { name: "liam", selected: false },
  ];
}

export async function UpdateRoster(players: RosterPlayer[]) {
  try {
    const response = await fetch(`${apiUrl}/set_line`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(players),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();;
  } catch (error) {
    throw new Error("Failed to fetch line data. Please try again later.");
  }
}

export async function GenerateLine(): Promise<Line> {
  try {
    const response = await fetch(`${apiUrl}/gen_line`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();;
  } catch (error) {
    throw new Error("Failed to fetch line data. Please try again later.");
  }
}

export async function GenerateFakeLine(): Promise<Line> {
  return {
    dline: ["Peyton", "Mark", "Thomas", "Jacob", "Matvey", "Caeser", "Andy"],
    oline: ["Quin", "Schwartz", "Josh", "Michael", "Mattie", "Liam", "Koz"],
  };
}

export async function ResetGenerator() {
  try {
    const response = await fetch(`${apiUrl}/reset`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();;
  } catch (error) {
    throw new Error("Failed to fetch line data. Please try again later.");
  }
}
