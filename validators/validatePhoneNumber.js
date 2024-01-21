export default function validatePhoneNumber(phoneNumber){
    const usaPhoneNumberPattern = /^\d{10}$/;
    if(phoneNumber === null) return false;
    return usaPhoneNumberPattern.test(phoneNumber);
};