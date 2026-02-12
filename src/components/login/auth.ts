export async function login(username: string, password: string) {
  const res = await fetch("api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await res.json();
  return data.token as string;
}

export function logout() {
  localStorage.removeItem("jwt");
}

export function getToken() {
  return localStorage.getItem("jwt");
}

export function isLoggedIn() {
  return !!getToken();
}
