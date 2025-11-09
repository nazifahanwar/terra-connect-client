import React, { useEffect, useState } from "react";
import { FaCheck, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/events");
        setEvents(res.data.slice(0, 4)); // latest 4 events
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const handleJoin = (id) => {
    setJoinedEvents((prev) => [...prev, id]);
    toast.success("Successfully joined!");
    
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#22577a] mb-2 text-center">Upcoming Events</h2>
      <p className="text-gray-500 mb-3 text-center">Don't miss out on these community activities!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => {
          const isJoined = joinedEvents.includes(event._id);
          return (
            <div key={event._id} className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#22577a]">{event.title}</h3>
                <div className="flex items-center gap-4 text-gray-600 mt-1 text-sm">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {event.location}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{event.description}</p>
                <p className="mt-2 text-gray-500 text-sm">Organizer: {event.organizer}</p>
              </div>

              <button
                onClick={() => handleJoin(event._id)}
                disabled={isJoined}
                className={`mt-4 w-full p-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 ${
                  isJoined ? "bg-secondary" : "bg-[#22577a] hover:bg-[#1b3f55]"
                } transition`}
              >
                {isJoined && <FaCheck />}
                {isJoined ? "Joined" : "Join"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
