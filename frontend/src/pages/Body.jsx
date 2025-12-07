import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/baseurl";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });

        if (!isMounted) return;

        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
