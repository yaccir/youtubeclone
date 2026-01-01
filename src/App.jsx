import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css"
import Videoplayerpage from "./components/Videoplayerpage";
import Videocards from "./components/Videocards";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import X from "./components/X";
import Uploadvideo from "./components/Uploadvideo";
import Signinpage from "./components/Signinpage";
import Createchannel from "./components/Createchannel";
import Channelview from "./components/Channelview";


function App()
{
  const router=createBrowserRouter([


    {
      path:'/',
      element: <Home/> 
    },

    {
      path:"/watch/:id",

      element:
      <>
     
       <Videoplayerpage/>
      </>
    
    },
    {
      path:"/x",
      element:<Uploadvideo/>
    },
    {
      path:"/s",
      element:<Signinpage/>
    }
  ])


  return(

    <RouterProvider router={router}>
    <div className="appcontainer">

     {/* <Header/> */}
     {/* <Home/> */}
     {/* <Videocards/>
    
     <Videoplayerpage/> */}
    </div>
    </RouterProvider>
  )
}

export default App;