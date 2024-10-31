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

    function checkPalindrome(str, left, right) {
        if (left >= right) {
            return true;
        }
        if (str[left] !== str[right]) {
            return false;
        }
        return checkPalindrome(str, left + 1, right - 1);
    }

    return checkPalindrome(cleanedPhrase, 0, cleanedPhrase.length - 1);
}


let userInput = prompt("Введите фразу для проверки на палиндром: ");
if (isPalindrome(userInput)) {
    console.log("Это палиндром");
} else {
    console.log("Это не палиндром");
}
