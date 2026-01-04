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

function App() {
  // Create router configuration
  const router = createBrowserRouter([
    {
      path: '/', // Home page route
      element: (
        <div>
          <Header />  {/* Header component */}
          <Home />    {/* Home component showing categories and videos */}
        </div>
      )
    },
    {
      path: "/watch/:id", // Video player page for a specific video
      element: (
        <div>
          <Header />
          <Videoplayerpage /> {/* Video player and comments section */}
        </div>
      )
    },
    {
      path: "/signin", // Sign in / Register page
      element: (
        <div>
          <Header />
          <Signinpage />
        </div>
      )
    },
    {
      path: "/createchannel", // Create a new channel
      element: (
        <div>
          <Header />
          <Createchannel />
        </div>
      )
    },
    {
      path: "/viewchannel/:id", // View a specific channel page
      element: (
        <div>
          <Header />
          <Channelview />
        </div>
      )
    },
    {
      path: "/viewchannels", // List of all channels
      element: (
        <div>
          <Header />
          <ViewChannels />
        </div>
      )
    },
    {
      path: "/uploadvideo/:id", // Upload new video page
      element: (
        <div>
          <Header />
          <Uploadvideo />
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
