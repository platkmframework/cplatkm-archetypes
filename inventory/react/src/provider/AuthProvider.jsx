import { AuthContext } from "../content/AuthContext";

export const AuthProvider = ({ children }) => {

  const user = () =>{
    return {token:'', roles:[], name:'user', lastname:'',   projects:[]} 
  }

  return (
    <AuthContext.Provider value={{ 
      user
    }}>
        { children }
    </AuthContext.Provider>
  ); 
   
}
