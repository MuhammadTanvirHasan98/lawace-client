import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";


const useAuth = () => {
  const authData = useContext(AuthContext);
  return authData;
  
};

export default useAuth;