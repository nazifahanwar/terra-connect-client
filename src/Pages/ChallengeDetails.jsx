import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaBullseye } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useLoaderData } from "react-router";
import axios from "axios";

const ChallengeDetails = () => {
  const challenge = useLoaderData(); // loaded challenge data
  const [userChallenge, setUserChallenge] = useState(null);
  const [progressCount, setProgressCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const userId = "sampleUserId"; // replace with actual logged-in user ID

  // Fetch if user already joined
  useEffect(() => {
    const fetchUserChallenge = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user-challenges/${userId}`);
        const joined = res.data.find((uc) => uc.challengeId === challenge._id);
        if (joined) {
          setUserChallenge(joined);
          setProgressCount(joined.progressCount);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserChallenge();
  }, [challenge._id]);

  // Join challenge
  const joinChallenge = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/challenges/join/${challenge._id}`, { userId });
      setUserChallenge(res.data);
      setProgressCount(res.data.progressCount);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to join");
    } finally {
      setLoading(false);
    }
  };

  // Update progress
  const updateProgress = async () => {
    if (!userChallenge) return;
    const progress = Math.min((progressCount / (challenge.target || 1)) * 100, 100);
    const status = progress >= 100 ? "Finished" : "Ongoing";

    try {
      setLoading(true);
      const res = await axios.patch(`http://localhost:5000/user-challenges/${userChallenge._id}`, {
        progressCount,
      });
      // Optimistically update UI
      setUserChallenge((prev) => ({
        ...prev,
        progressCount,
        progress,
        status,
        updatedAt: new Date(),
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to update progress");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl flex flex-col lg:flex-row gap-8">
      <img
        src={challenge.imageUrl}
        alt={challenge.title}
        className="w-full lg:w-1/2 h-64 lg:h-auto object-cover rounded-lg"
      />

      <div className="flex-1">
        <h2 className="text-3xl font-bold text-[#22577a]">{challenge.title}</h2>
        <p className="text-gray-500 mt-1 italic">{challenge.category}</p>
        <p className="mt-4 text-gray-700">{challenge.description}</p>

        {/* Challenge Info */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#22577a]" />
            <span>
              {new Date(challenge.startDate).toLocaleDateString()} -{" "}
              {new Date(challenge.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <VscAccount className="text-[#22577a]" />
            <span>{challenge.createdBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBullseye className="text-[#22577a]" />
            <span>Target: {challenge.target}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser className="text-[#22577a]" />
            <span>Participants: {challenge.participants}</span>
          </div>
        </div>

        {/* Join / Progress */}
        <div className="mt-6">
          {!userChallenge ? (
            <button
              onClick={joinChallenge}
              disabled={loading}
              className="w-full bg-[#22577a] text-white p-3 rounded-lg hover:bg-[#1b3f55] transition"
            >
              {loading ? "Joining..." : "Join Challenge"}
            </button>
          ) : (
            <div className="space-y-4">
              <p className="font-semibold">
                Status: <span className="text-[#22577a]">{userChallenge.status}</span>
              </p>

              {/* DaisyUI Progress */}
              <div className="w-full">
                <label className="block mb-1">
                  Progress: {(userChallenge.progress ?? 0).toFixed(2)}%
                </label>
                <progress
                  className="progress progress-primary w-full"
                  value={userChallenge.progress ?? 0}
                  max="100"
                ></progress>
              </div>

              {/* Input to update */}
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  min="0"
                  max={challenge.target}
                  value={progressCount}
                  onChange={(e) => setProgressCount(Number(e.target.value))}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={updateProgress}
                  disabled={loading}
                  className="bg-[#22577a] text-white px-4 rounded hover:bg-[#1b3f55] transition"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
