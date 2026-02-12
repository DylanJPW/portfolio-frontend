import { useContext, useState } from "react";
import { Modal } from "../shared/Modal/Modal";
import type { ModalProps } from "react-bootstrap";
import { login } from "./auth";
import { AuthContext } from "./AuthContext";

export const LoginModal = ({
  showModal,
  setShowModal,
}: Partial<ModalProps>) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, setToken } = useContext(AuthContext);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await login(username, password);
      localStorage.setItem("jwt", token);
      setShowModal(false);
      setIsLoggedIn(true);
      setToken(token);
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div>
        <form onSubmit={handleSubmit}>
          <h4 className="text-center border-b pb-2 mb-2">Admin Login</h4>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between w-full gap-2">
              <label htmlFor="username">Username: </label>
              <input
                name="username"
                id="username"
                type="text"
                className="border rounded p-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-between w-full gap-2">
              <label htmlFor="password">Password: </label>
              <input
                name="password"
                id="password"
                type="password"
                className="border rounded p-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end pt-2">
            <button type="submit" className="bg-blue-500" disabled={loading}>
              Log In
            </button>
            <button className="bg-red-500" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
