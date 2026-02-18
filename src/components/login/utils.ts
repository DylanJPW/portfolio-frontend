import axios from "axios";

export async function loginRequest(username: string, password: string) {
  const res = await axios.post("/api/auth/login", {
    username,
    password,
  });

  return res.data.token;
}
