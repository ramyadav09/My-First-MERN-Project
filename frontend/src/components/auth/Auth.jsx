import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Footer from "../layout/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login setLogin={setIsLogin} />
      ) : (
        <Signup setLogin={setIsLogin} />
      )}
      <Footer />
    </>
  );
};

export default Auth;