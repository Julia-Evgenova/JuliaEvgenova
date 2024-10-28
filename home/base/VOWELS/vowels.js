function countRussianVowels(text) {
    const vowels = 'аеёиоуыэюяАЕЁИОУЫЭЮЯ';
    let count = 0;

    for (let char of text) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

const userInput = prompt("Введите строку:");


console.log("Количество русских гласных:", countRussianVowels(userInput));