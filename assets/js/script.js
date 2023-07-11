// Assignment code here
// get desired password length from user
function getPasswordLength(errorString = "") { // error string is used to display an error in the length selection to the user

    function isNull(value) {
        return (value === null ? true : false);
    }

    // prompt will return the provided string or null if the user presses the cancel button
    let passwordLength = prompt(errorString + "How long would you like your password to be (Between 8 and 128 characters)", "8");

    if (isNull(passwordLength)) { return "Password Generation Aborted"; } // user pressed the cancel button
    // input validation
    if (isNaN(passwordLength)) { getPasswordLength("Invalid Number! "); } 
    if (passwordLength < 8) { getPasswordLength("Password is too short! ") } 
    if (passwordLength > 128) { getPasswordLength("Password is too Long! ") } 

    return passwordLength;
}

// get desired character types to include from user
function getCharacterTypesToInclude() {

    // the confirm prompt will return true of false 
    let includeLowerCase = confirm("Would you like to include Lower Case characters?");
    let includeUpperCase = confirm("Would you like to include Upper Case characters?");
    let includeNumeric = confirm("Would you like to include Numeric characters?");
    let includeSpecialCharacters = confirm("Would you like to include Special characters?");

    if (!includeLowerCase && !includeUpperCase && !includeNumeric && !includeSpecialCharacters) { // if all are set to false
        let tryAgain = confirm("You must select one type of character. Would you like to revisit the selections?");
        if (tryAgain) {
            return getCharacterTypesToInclude();
        } else { // user pressed the cancel button
            return "Password Generation Aborted";
        };
    };

    let characterTypesToIncludeObject = { // all values in this object are true/false
        lowerCase: includeLowerCase,
        upperCase: includeUpperCase,
        numeric: includeNumeric,
        specialCharacters: includeSpecialCharacters
    }

    return characterTypesToIncludeObject;
}

function generatePassword() {
    let passwordLength = getPasswordLength();
    if (passwordLength === "Password Generation Aborted") { return "Password Generation Aborted" };
    let characterTypesToIncludeObject = getCharacterTypesToInclude();
    if (characterTypesToIncludeObject === "Password Generation Aborted") { return "Password Generation Aborted" };

    // generate password that has num, upper, lower, special characters
    // all character types are optional but must have at least one if selected
    // ascii codes
    // special characters 33 to 47
    // caps 65 to 90
    // lower 97 to 122
    // nums are 48 to 57

    let passwordArray = [];
    let characterTypesArray = [];

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // floor down to nearest int
        // math random gives you 0 to 0.99
        // max(15) - min(10) = 5 + 1, random of 0 to 5.99, +min = 10 to 15.99 (10 to 15)
    }

    function addCharacterToArrayFromRandomCharacterCode(min, max) {
        let characterCode = generateRandomNumber(min, max);
        passwordArray.push(String.fromCharCode(characterCode));
    }

    // password must include at least one of each of the selected characters 
    if (characterTypesToIncludeObject.lowerCase) { // check if true (user has selected they want this character type)
        addCharacterToArrayFromRandomCharacterCode(97, 122); // add a randomly generated character of this type to the password array
        characterTypesArray.push({min: 97, max: 122}); // add the ascii codes of this character type in an object to the characterTypesArray
    };
    if (characterTypesToIncludeObject.upperCase) {
        addCharacterToArrayFromRandomCharacterCode(65, 90);
        characterTypesArray.push({min: 65, max: 90});
    };
    if (characterTypesToIncludeObject.numeric) {
        addCharacterToArrayFromRandomCharacterCode(48, 57);
        characterTypesArray.push({min: 48, max: 57});
    };
    if (characterTypesToIncludeObject.specialCharacters) {
        addCharacterToArrayFromRandomCharacterCode(33, 47);
        characterTypesArray.push({min: 33, max: 47});
    };

    for (i = 0; passwordArray.length < passwordLength; i++) {
        let charObject = characterTypesArray[generateRandomNumber(0, characterTypesArray.length-1)]; // grab random char type object from the array, 0 to array length
        addCharacterToArrayFromRandomCharacterCode(charObject.min, charObject.max); // use that objects min, max values to gen a random character
    }
    // return the generated password as a string
    return passwordArray.join("");

}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);