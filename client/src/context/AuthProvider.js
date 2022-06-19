import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ Tbl_Kullanici }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {Tbl_Kullanici}
    </AuthContext.Provider>
  );
};

export default AuthContext;
