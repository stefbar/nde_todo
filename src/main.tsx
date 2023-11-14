import React from 'react'
import ReactDOM from 'react-dom/client'

// import { supabase } from './db/supabaseClient.ts'
// import { SessionContextProvider } from '@supabase/auth-helpers-react'

import App from './App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    {/* <SessionContextProvider supabaseClient={supabase}> */}
      <App />
      {/* <App session={supabase.auth.getSession()}/> */}
    {/* </SessionContextProvider> */}
  </React.StrictMode>,

)