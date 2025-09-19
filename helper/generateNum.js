module.exports = function generateNumber (lenght) {
    const characters = "0123456789"
    let result = ""
    for(let i=0;i<lenght;i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    } 
    return result;
}