import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/baseurl";
import { useEffect } from "react";
import { addFeed } from "../../features/user/feedSlice";
import UserCard from "./UserCard";
import { useSearchParams } from "react-router-dom";

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 10);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const userFeed = async (pageNum, limitNum) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/feed?page=${pageNum}&limit=${limitNum}`,
        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error("Error : " + err);
    }
  };
  
  useEffect(() => {
    userFeed(page, limit);
  }, [page, limit]);
  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {}, // empty body
        { withCredentials: true } // config goes here
      );
    } catch (err) {
      console.log("Error:", err);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  if (!feed || feed.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl font-bold mb-2">
            No more profiles to show!
          </div>
          <p className="text-white/60">Check back later for new matches</p>
        </div>
      </div>
    );
  }

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setSearchParams({ page: nextPage, limit });
    setCurrentIndex(0);
  };

  if (currentIndex >= feed.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl font-bold mb-4">
            You've seen all profiles on page {page}!
          </div>
          <p className="text-white/60 mb-6">Load more profiles to continue</p>
          <button
            onClick={handleNextPage}
            className="bg-white text-purple-700 px-8 py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-2xl transition-all active:scale-95"
          >
            Load Page {page + 1}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 p-6">
      <UserCard currentUser={feed[currentIndex]} onRequest={handleRequest} />
    </div>
  );
};

export default Feed;
