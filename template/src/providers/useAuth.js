import { useContext } from "react";
import { AuthContext } from "./AuthProvider.jsx";


export function useAuth() {
  return useContext(AuthContext);
}