import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function SupabaseExample() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      // Test simple de connexion à Supabase
      const { data, error } = await supabase
        .from('_dummy_table_that_doesnt_exist')
        .select('*')
        .limit(1)
      
      if (error && error.code === 'PGRST116') {
        setMessage('✅ Supabase est configuré correctement ! (Erreur attendue pour une table inexistante)')
      } else if (error) {
        setMessage(`❌ Erreur de connexion: ${error.message}`)
      } else {
        setMessage('✅ Connexion Supabase réussie !')
      }
    } catch (err) {
      setMessage(`❌ Erreur: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Test Supabase
      </h2>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-4 w-full"
      >
        {loading ? 'Test en cours...' : 'Tester la connexion Supabase'}
      </button>
      
      {message && (
        <div className={`p-3 rounded-lg text-sm ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <p className="text-gray-600 text-xs mt-4">
        Assurez-vous d'avoir configuré vos variables d'environnement dans le fichier .env
      </p>
    </div>
  )
} 