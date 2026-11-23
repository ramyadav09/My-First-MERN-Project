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
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
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
