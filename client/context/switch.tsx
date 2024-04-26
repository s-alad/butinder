export const EXPLICIT = 
    process.env.NODE_ENV === "development" ?
    "http://localhost:5000/check-explicit" :
    "https://butinder-production.up.railway.app/check-explicit";