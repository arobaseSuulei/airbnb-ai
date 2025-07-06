import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://pxyqknxfvimxdcmplbff.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk"
);

const AI_LOGO = "https://brandlogos.net/wp-content/uploads/2025/02/apple_intelligence-logo_brandlogos.net_zmypw.png";

// Fonction utilitaire pour afficher images et texte
function renderMessageContent(content) {
  // Regex pour liens d'image bruts
  const imageRegex = /(https?:\/\/\S+\.(?:png|jpe?g|gif)|https?:\/\/source\.unsplash\.com\/[^\s)]+)/gi;
  // Regex pour liens markdown [texte](url)
  const markdownImageRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/gi;

  // Cherche les liens markdown d'abord
  let parts = [];
  let lastIndex = 0;
  let match;
  while ((match = markdownImageRegex.exec(content)) !== null) {
    // Ajoute le texte avant le lien
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }
    // Si l'URL est une image ou unsplash, affiche l'image
    if (/(\.png|\.jpe?g|\.gif|source\.unsplash\.com)/i.test(match[2])) {
      parts.push(<img key={match[2]+match.index} src={match[2]} alt={match[1]} style={{maxWidth: 300, borderRadius: 8, marginTop: 8}} />);
    } else {
      // Sinon, affiche le lien markdown normal
      parts.push(<a key={match[2]+match.index} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a>);
    }
    lastIndex = markdownImageRegex.lastIndex;
  }
  // Ajoute le reste du texte après le dernier lien
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  // Si on a trouvé des liens markdown, affiche le résultat
  if (parts.length > 1) {
    return <div>{parts.map((p, i) => <span key={i}>{p}</span>)}</div>;
  }

  // Sinon, on traite les liens bruts comme avant
  const matches = [...content.matchAll(imageRegex)];
  if (matches.length > 0) {
    const textWithoutLinks = content.replace(imageRegex, '').trim();
    return (
      <div>
        {textWithoutLinks && <span>{textWithoutLinks}</span>}
        {matches.map((match, idx) => (
          <div key={idx} style={{marginTop: 8}}>
            <img src={match[0]} alt="Image IA" style={{maxWidth: 300, borderRadius: 8}} />
          </div>
        ))}
      </div>
    );
  }
  return <span>{content}</span>;
}




export default function ChatBox() {

  
  const [messages, setMessages] = useState([]);

  async function getMessages() {
    try {
      const { data } = await supabase.from("airbnb").select("*");
      setMessages(data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessages();
    const channel = supabase
      .channel("airbnb")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "airbnb" },
        (payload) => {
          getMessages();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className=" p-24 flex items-center justify-center">
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl ">
        <h1 className="text-xs flex gap-2 items-center justify-center my-8 text-gray-700">
          
          
          Powered by
         <img className="w-16" src="https://1000logos.net/wp-content/uploads/2025/02/Grok-Logo.png"/>
        </h1>

        <div className="border border-gray-200 rounded-lg bg-gray-50">
          <nav className="w-full text-xs flex flex-col gap-4 py-8 px-12">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.role === 'ai' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'user' && (
                    <span className="text-xs font-semibold text-blue-700">You</span>
                  )}
                  {message.role === 'ai' && (
                    <img src={AI_LOGO} alt="AI Logo" className="w-6 h-6 rounded-full border border-gray-200 bg-white" />
                  )}
                </div>
                <div
                  style={{ maxWidth: "80%" }}
                  className={`p-3 rounded-lg ${message.role === 'ai' ? 'bg-white text-gray-900 border border-gray-200' : 'bg-blue-400 text-white'}`}
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