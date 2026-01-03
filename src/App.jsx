import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css"
import Videoplayerpage from "./components/Videoplayerpage";
import Videocards from "./components/Videocards";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Uploadvideo from "./components/Uploadvideo";
import Signinpage from "./components/Signinpage";
import Createchannel from "./components/Createchannel";
import Channelview from "./components/Channelview";
import ViewChannels from "./components/Viewchannels";


function App()
{
  const router=createBrowserRouter([


    {
      path:'/',
      element: <div>
          <Header/>
          <Home/> 

      </div>
    },

    {
      path:"/watch/:id",

      element:<div>
        <Header/>
        <Videoplayerpage/>

      </div>
    
    
    },
     {
      path:"/signin",
      element:
      <div>
        <Header/>
        <Signinpage/>

      </div>
    },

    {
      path:"/createchannel",
      element:
      <div>
          <Header/>
          <Createchannel/>
      </div>
    
    },
        {
      path:"/viewchannel/:id",
      element:
      <div>
          <Header/>
          <Channelview/>
      </div>
    
    },
       {
      path:"/viewchannels",
      element:
      <div>
          <Header/>
          <ViewChannels/>
      </div>
    
    },
         {
      path:"/uploadvideo",
      element:
      <div>
          <Header/>
          <Uploadvideo/>
      </div>
    
    },
   
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