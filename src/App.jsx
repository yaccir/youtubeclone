import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css"
import Videoplayerpage from "./components/Videoplayerpage";
import Videocards from "./components/Videocards";

function App()
{


  return(
    <div className="appcontainer">

     <Header/>
     {/* <Home/> */}
     <Videocards/>
    
     {/* <Videoplayerpage/> */}
    </div>
  )
}

export default App;