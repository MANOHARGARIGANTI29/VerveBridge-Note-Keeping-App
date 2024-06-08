export const ValidateEmail = (email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
export const GetInitials = (Username)=>{
    if(!Username) return "";

    const words = Username.split(" ");
    let initials = " ";

    for(let i = 0; i<Math.min(words.length,2);i++){
        initials +=words[i][0];
    }
    return initials.toUpperCase();
};