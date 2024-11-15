"use client";
import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { BsCameraVideoFill } from "react-icons/bs";

const Room = ({ params }) => {
  const roomID = params.roomid;
  const callContainerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const initializeMeeting = async () => {
      const appID = +process.env.NEXT_PUBLIC_APPID;
      const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET;

      if (!appID || !serverSecret) {
        console.error("Missing Zego appID or serverSecret");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "rajesh"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (typeof zp.startSoundLevel === "function") {
        zp.startSoundLevel();
      } else {
        console.warn("startSoundLevel method not found on Zego instance");
      }

      zp.joinRoom({
        container: callContainerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    initializeMeeting();
  }, [roomID]);

  return (
    <div className="h-screen w-screen flex flex-col bg-cover bg-center relative" style={{ backgroundImage: "url('/images/animated-bg.jpg')" }}>
     
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-0"></div>
      
      
      <div className="relative z-10 flex items-center justify-between p-5 bg-black bg-opacity-80 text-white shadow-md">
        <button
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <FaArrowLeft className="text-xl" />
          <span className="text-lg">Back</span>
        </button>
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <BsCameraVideoFill className="text-2xl" />
          <span>Room: {roomID}</span>
        </h2>
      </div>

     
      <center className="relative z-10 mt-8">
        <button
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          onClick={() => alert("Starting a new demo call...")}
        >
          Start Calling . . . 
          
        </button>
      </center>

      
      <div
        ref={callContainerRef}
        className="relative z-10 mt-10 mx-auto w-full max-w-5xl h-[70vh] rounded-2xl bg-white bg-opacity-10 backdrop-blur-md shadow-2xl overflow-hidden"
      ></div>

      
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
};

export default Room;
