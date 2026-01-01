import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css"
import Videoplayerpage from "./components/Videoplayerpage";

function App()
{


  return(
    <div className="appcontainer">

     <Header/>
     <Home/>
     <Videoplayerpage/>
    </div>
  )
}

export default App;