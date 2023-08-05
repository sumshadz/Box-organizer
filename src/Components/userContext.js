import { createContext, useState } from "react";
import { boxes } from "./Data";

//using context api to manage state globally
const AppContext = createContext();
const AppProvider = ({children}) => {

	const[state, setState] = useState(false);
	const[boxList, setBoxList] = useState(boxes);
	const[arrangedBoxList, setArrangedBoxList] = useState(boxes)
	return <AppContext.Provider value = {{state, setState, boxList, setBoxList, arrangedBoxList, setArrangedBoxList}} >{children}</AppContext.Provider>

};

export {AppContext, AppProvider};