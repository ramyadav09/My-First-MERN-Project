import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLogin ? (
        <Login setLogin={setIsLogin} />
      ) : (
        <Signup setLogin={setIsLogin} />
      )}
    </>
  );
};

export default Auth;