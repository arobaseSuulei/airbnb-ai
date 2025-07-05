# Configuration Supabase

## Variables d'environnement

Créez un fichier `.env` à la racine du projet frontend avec les variables suivantes :

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Où trouver ces valeurs

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Dans les paramètres du projet, allez dans "API"
4. Copiez l'URL du projet et la clé anon/public

## Utilisation

```javascript
import { supabase } from './src/lib/supabase'

// Exemple d'utilisation
const { data, error } = await supabase
  .from('your_table')
  .select('*')
``` 