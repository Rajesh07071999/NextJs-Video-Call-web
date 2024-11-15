"use client";
import Link from "next/link";
import { useState } from "react";
import { FaVideo } from "react-icons/fa";

export default function Home() {
  const [roomId, setRoomId] = useState("");

  return (
    <div className="h-screen flex items-center justify-center relative bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/video-call-bg.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>

      <div className="animate-float relative z-10 flex flex-col items-center justify-center w-full max-w-lg p-8 glassmorphism text-white space-y-8 rounded-2xl shadow-2xl">
        

        <img
          src="https://messengernews.fb.com/wp-content/uploads/2018/09/2_newsroom_reactions_2x.gif"
          alt="Video Call"
          className="w-90 h-90 rounded animate-float"
        />

        <div className="flex items-center bg-white bg-opacity-10 p-3 rounded-lg shadow-inner w-full">
          <FaVideo className="text-blue-300 text-2xl mr-3" />
          <input
            type="text"
            placeholder="Enter Room ID"
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
          />
        </div>

        <Link href={roomId ? `/room/${roomId}` : "#"}>
          <button
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
              roomId ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!roomId}
          >
             JOIN
          </button>
        </Link>
      </div>

      {/* <div className="absolute inset-0 flex flex-wrap items-center justify-center space-x-4 space-y-4 pointer-events-none opacity-50 animate-float">
        {[...Array(30)].map((_, index) => (
          <>
          <div
            key={index}
            className={`w-4 h-4 rounded-full bg-white animate-ping animation-delay-${index * 100}`}
          ></div>
          </>
        ))}
      </div> */}


      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 bg-blue-400 rounded-full animate-float`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animationDelay: `${Math.random()}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
