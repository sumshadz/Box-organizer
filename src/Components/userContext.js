import { createContext, useState } from "react";

//using context api to manage state globally
const AppContext = createContext();
const AppProvider = ({children}) => {

	const[state, setState] = useState(false);
	const url = "http://localhost:3000/";
	return <AppContext.Provider value = {{state, setState,url}} >{children}</AppContext.Provider>

};

export {AppContext, AppProvider};