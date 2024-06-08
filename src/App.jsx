
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import {HashRouter as Router,Routes,Route} from "react-router-dom";

const routes = (
    <Router>
    <Routes>
    <Route path="/" exact element={<SignUp/>}/>
    <Route path="/dashboard" exact element={<Home/>}/>
    <Route path="/login" exact element={<Login/>}/>
    <Route path="/signup" exact element={<SignUp/>}/>
    </Routes>
    </Router>
);

const App =()=>{
  return(
    <div>
      {routes}
    </div>
  )
}
export default App;