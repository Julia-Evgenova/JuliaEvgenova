function isPalindrome(phrase) {
    let cleanedPhrase = "";
    for (let i = 0; i < phrase.length; i++) {
        let char = phrase[i].toLowerCase();

        if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || (char >= 'а' && char <= 'я')) {

            if (char === 'ё') {
                char = 'е';
            }
            cleanedPhrase += char;
        }
    }

    let reversedPhrase = "";
    for (let i = cleanedPhrase.length - 1; i >= 0; i--) {
        reversedPhrase += cleanedPhrase[i];
    }

    return cleanedPhrase === reversedPhrase;
}


let userInput = prompt("Введите фразу для проверки на палиндром: ");
if (isPalindrome(userInput)) {
    console.log("Это палиндром!");
} else {
    console.log("Это не палиндром.");
}