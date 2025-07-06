import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pxyqknxfvimxdcmplbff.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk"
);

export default function ChatBox() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    try {
      const { data } = await supabase.from("chatInfo").select("*");
      setMessages(data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessages();
    const channel = supabase
      .channel("chatInfo")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chatInfo" },
        (payload) => {
          getMessages();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function sendUsername() {
    if (username.trim() === "") return;
    try {
      await supabase.from("usersOfChat").insert([{ name: username }]);
      setUsername("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-12 ">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl ">
        <h1 className="text-xs flex gap-2 items-center justify-center my-8 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          Powered by AI chat
        </h1>

        <div className="border border-gray-200 rounded-lg bg-gray-50">
          

          <nav className="w-full text-xs flex flex-col gap-4 py-8 px-12">
            {messages.map((message) => (
              <div key={message.id} className={"flex flex-col items-start"}>
                <span className="font-semibold mb-1 text-gray-800">
                  {message.name}
                </span>
                <div
                  style={{ maxWidth: "80%" }}
                  className={"p-3 rounded-lg bg-blue-400 text-white"}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}