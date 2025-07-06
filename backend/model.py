import os
from openai import OpenAI
from supabase import create_client, Client
import re


SUPABASE_URL = os.getenv("SUPABASE_URL", "https://pxyqknxfvimxdcmplbff.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eXFrbnhmdmlteGRjbXBsYmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMDM4NjIsImV4cCI6MjA0NDg3OTg2Mn0.cuq3c8ejHCSky7BcV1qlj76_QYWcYXYiAbvDolxN6Uk")



supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="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",
)

def get_conversation_history():
    """Récupère l'historique complet de la conversation depuis Supabase"""
    try:
        response = supabase.table("airbnb").select("*").order("created_at").execute()
        
        if response.data and len(response.data) > 0:
            return response.data
        else:
            return []
    except Exception as e:
        print(f"Erreur lors de la récupération de l'historique: {e}")
        return []

def getHotels():
    """Récupère tous les hotels depuis Supabase avec toutes leurs informations"""
    try:
        hotels = supabase.table("hotels").select("*").execute()

        if hotels.data and len(hotels.data) > 0:
            # Formater chaque hôtel avec toutes ses informations
            hotels_list = []
            for hotel in hotels.data:
                hotel_info = f"🏨 {hotel['nom']}"
                # Ajouter toutes les autres colonnes disponibles
                for key, value in hotel.items():
                    if key not in ['id', 'created_at', 'nom'] and value is not None:
                        hotel_info += f"\n   • {key}: {value}"
                hotels_list.append(hotel_info)
            return "\n\n".join(hotels_list)
        else:
            return "Aucun hôtel disponible"
    except Exception as e:
        print(f"Erreur lors de la récupération des hôtels: {e}")
        return "Aucun hôtel disponible"

    

  

def generate_ai_response(conversation_history, hotels):
    """Génère une réponse IA basée sur l'historique de la conversation"""
    try:
        # Préparer les messages pour l'IA
        messages = [
            {
                "role": "system",
                "content": f"You are Airbnb AI. Available hotels: {hotels}. Be VERY concise - max 2-3 sentences. No long explanations. Just answer the question directly.\nIf the user wants to book a hotel, respond ONLY with the following Python code (and nothing else): supabase.table(\"hotels\").update({{\"booked\": True, \"name\": '<user_name>'}}).eq(\"id\", <hotel_id>).execute()  Replace <user_name> and <hotel_id> with the correct values. Only output this code if the user clearly wants to book. after that confirm to the user"
            }
        ]
        
        # Limiter l'historique aux 5 derniers messages pour économiser les tokens
        recent_history = conversation_history[-5:] if len(conversation_history) > 5 else conversation_history
        
        # Ajouter l'historique de la conversation
        print(f"Nombre de messages dans l'historique complet: {len(conversation_history)}")
        print(f"Nombre de messages envoyés à l'IA (5 derniers): {len(recent_history)}")
        for i, message in enumerate(recent_history):
            print(f"Message {i+1}: Role={message['role']}, Content={message['content'][:50]}...")
            # Mapper le rôle 'ai' vers 'assistant' pour Grok-3
            role = 'assistant' if message['role'] == 'ai' else message['role']
            messages.append({
                "role": role,
                "content": message['content']
            })
        
        print(f"Nombre total de messages envoyés à l'IA: {len(messages)}")
        
        completion = client.chat.completions.create(
          extra_headers={
            "HTTP-Referer": "<YOUR_SITE_URL>",
            "X-Title": "<YOUR_SITE_NAME>",
          },
          extra_body={},
          model="x-ai/grok-3",
          max_tokens=150,
          messages=messages
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Erreur lors de la génération de la réponse IA: {e}")
        return "Désolé, je ne peux pas répondre pour le moment."

def save_ai_response(response):
    """Sauvegarde la réponse IA dans Supabase"""
    try:
        supabase.table("airbnb").insert([
            {
                "content": response,
                "role": "ai"
            }
        ]).execute()
        print("Réponse IA sauvegardée dans Supabase")
    except Exception as e:
        print(f"Erreur lors de la sauvegarde: {e}")

def handle_supabase_update(ai_response):
    # Cherche le pseudo-code Python Supabase généré par l'IA
    match = re.search(r'supabase\.table\("hotels"\)\.update\(\{\\?"booked\\?": True, \\"name\\?": [\'"]([^\'"]+)[\'"]\}\)\.eq\("id", (\d+)\)\.execute\(\)', ai_response)
    if match:
        user_name = match.group(1)
        hotel_id = int(match.group(2))
        try:
            supabase.table("hotels").update({"booked": True, "name": user_name}).eq("id", hotel_id).execute()
            print(f"Réservation effectuée pour l'hôtel {hotel_id} au nom de {user_name}")
        except Exception as e:
            print(f"Erreur lors de la réservation: {e}")

# Fonction principale
def main():
    # Récupérer l'historique complet de la conversation
    conversation_history = get_conversation_history()
    print(f"Historique de conversation: {len(conversation_history)} messages")
    
    # Récupérer les hôtels disponibles
    hotels = getHotels()
    print(f"Hôtels disponibles: {hotels}")
    
    # Générer la réponse IA avec l'historique complet
    ai_response = generate_ai_response(conversation_history, hotels)
    print(f"Réponse IA: {ai_response}")
    
    # Exécuter la requête SQL si présente
    handle_supabase_update(ai_response)
    
    # Sauvegarder la réponse dans Supabase
    save_ai_response(ai_response)

if __name__ == "__main__":
    main()