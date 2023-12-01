declare global { 
    interface Window { _env_:  { [key: string] : any} } 
}   

export const API = import.meta.env.VITE_API ?? "http://localhost:3001/api"
export const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY
