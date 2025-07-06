import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import one from "../assets/a.png"
import two from "../assets/b.png"
import three from "../assets/c.png"

const supabase = createClient(
  "https://pxyqknxfvimxdcmplbff.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk"
);

export default function Navbar() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      await supabase.from("airbnb").insert([
        {
          content: message.trim(),
          role: "user"
        }
      ]);
      setMessage(""); // Vider l'input après envoi
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  return (
    <div>
        <div className="flex items-center justify-between p-6 bg-white shadow">
      
      {/* Left logo */}
      <div>
        <img
          className="w-32"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
          alt="Logo"
        />
      </div>

      {/* Center logos */}
      <div className="flex gap-4 justify-center">
        <a className="flex items-center gap-2">
            <img className="w-16" src={one} alt="Logo" />
            <p>logement</p>
        </a>
        <a className="flex items-center gap-2">
            <img className="w-16" src={two} alt="Logo" />
            <p className="font-semibold">service</p>
        </a>
        <a className="flex items-center gap-2">
            <img className="w-16" src={three} alt="Logo" />
            <p>expérience</p>
        </a>
        </div>

      {/* Right content */}
      <div>
        hey
      </div>
      
    </div>


    <div className="flex justify-center mt-12 ">  
      <div className="flex items-center rounded-full w-1/2 p-2 shadow-md  border-[0.2px] border-gray-300">
    <img
      className="w-12"
      src="https://brandlogos.net/wp-content/uploads/2025/02/apple_intelligence-logo_brandlogos.net_zmypw.png"
      alt="logo"
    />
     <form onSubmit={handleSubmit} className="flex items-center flex-1">
       <input
         type="text"
         value={message}
         onChange={(e) => setMessage(e.target.value)}
         placeholder="Posez votre question..."
         className="flex-1 text-xs px-3 py-1 border-none outline-none bg-transparent"
       />
       <button
         type="submit"
         className="text-xs px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
       >
         Envoyer
       </button>
     </form>
  </div>
</div>


    


    </div>
  );
}
