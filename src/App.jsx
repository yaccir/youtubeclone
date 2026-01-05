import Header from "./components/Header";
import Home from "./components/Home";
import "./App.css";
import Videoplayerpage from "./components/Videoplayerpage";
import Videocards from "./components/Videocards";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Uploadvideo from "./components/Uploadvideo";
import Signinpage from "./components/Signinpage";
import Createchannel from "./components/Createchannel";
import Channelview from "./components/Channelview";
import ViewChannels from "./components/Viewchannels";
import NotFound from "./components/NotFound";
import Footer from "./components/footer";

function App() {
  // Create router configuration
  const router = createBrowserRouter([
    {
      path: '/', // Home page route
      element: (
        <div>
          <Header />  {/* Header component */}
          <Home />    {/* Home component showing categories and videos */}
           <Footer/>
        </div>
      )
    },
    {
      path: "/watch/:id", // Video player page for a specific video
      element: (
        <div>
          <Header />
          <Videoplayerpage /> {/* Video player and comments section */}
           <Footer/>
        </div>
      )
    },
    {
      path: "/signin", // Sign in / Register page
      element: (
        <div>
          <Header />
          <Signinpage />
           <Footer/>
        </div>
      )
    },
    {
      path: "/createchannel", // Create a new channel
      element: (
        <div>
          <Header />
          <Createchannel />
           <Footer/>
        </div>
      )
    },
    {
      path: "/viewchannel/:id", // View a specific channel page
      element: (
        <div>
          <Header />
          <Channelview />
           <Footer/>
        </div>
      )
    },
    {
      path: "/viewchannels", // List of all channels
      element: (
        <div>
          <Header />
          <ViewChannels />
           <Footer/>
        </div>
      )
    },
    {
      path: "/uploadvideo/:id", // Upload new video page
      element: (
        <div>
          <Header />
          <Uploadvideo />
           <Footer/>
        </div>
      )
    },
      {
      path: "/*", // Upload new video page
      element: (
        <div>
          <Header />
          <NotFound/>
          <Footer/>
        </div>
      )
    },
  ]);

  return (
    <RouterProvider router={router}>
      <div className="appcontainer">
        {/* App container for styling purposes */}
        {/* Components are rendered via router, so no need to render here */}
      </div>
    </RouterProvider>
  );
}

export default App;
