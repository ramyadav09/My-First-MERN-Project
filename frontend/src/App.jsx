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
import Premium from "./components/premium/Premium";
import NavbarPage from "./pages/Navbar";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/navbar" element={<NavbarPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit" element={<EditProfile />} />
              <Route path="/requests" element={<Request />} />
              <Route path="/messages" element={<Messenger />} />
              <Route path="/messages/:targetUserId" element={<Messenger />} />
              <Route path="/premium" element={<Premium />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
