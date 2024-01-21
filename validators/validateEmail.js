export default function validateEmail(email) {
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    
    if(email === null) return false;

    return emailRegex.test(email.trim());
}