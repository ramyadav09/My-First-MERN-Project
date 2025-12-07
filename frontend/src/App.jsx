import Body from "./pages/Body";
import Auth from "./components/auth/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Profile from "./components/profile/Profile";
import store from "./app/store";
import Feed from "./components/feed/Feed";
import EditProfile from "./components/profile/EditProfile";
import Request from "./components/connections/Request";
import Messenger from "./components/messenger/Messenger";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit" element={<EditProfile />} />
              <Route path="/requests" element={<Request />} />
              <Route path="/messages" element={<Messenger />} />
              <Route path="/login" element={<Auth />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      ;
    </>
  );
}

export default App;
