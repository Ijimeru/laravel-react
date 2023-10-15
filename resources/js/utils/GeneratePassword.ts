// Generate a random password with at least one lowercase letter, one uppercase letter, one digit and one special character
// The password length is between 8 and 16 characters
export default function GeneratePassword() {
    // Define the possible characters for each category
    var lowerCase = "abcdefghijklmnopqrstuvwxyz";
    var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digits = "0123456789";
    var special = "#@!%&()/";
    // Create an array of four random indices for each category
    let indices: number[] = [];
    while (indices.length < 4) {
        var index = Math.floor(Math.random() * 4);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }
    // Create an empty password and a shuffled character set
    var password = "";
    var charSet = "";
    // Loop through the indices and append a random character from the corresponding category to the password and the character set
    for (var i = 0; i < indices.length; i++) {
        if (indices[i] === 0) {
            password += lowerCase.charAt(
                Math.floor(Math.random() * lowerCase.length)
            );
            charSet += lowerCase;
        } else if (indices[i] === 1) {
            password += upperCase.charAt(
                Math.floor(Math.random() * upperCase.length)
            );
            charSet += upperCase;
        } else if (indices[i] === 2) {
            password += digits.charAt(
                Math.floor(Math.random() * digits.length)
            );
            charSet += digits;
        } else if (indices[i] === 3) {
            password += special.charAt(
                Math.floor(Math.random() * special.length)
            );
            charSet += special;
        }
    }
    // Generate a random length for the password between 8 and 16, excluding the four initial characters
    var length = Math.floor(Math.random() * 9) + 8 - password.length;
    // Loop through the remaining length and append a random character from the shuffled character set to the password
    for (var i = 0; i < length; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    // Return the final password
    return password;
}
