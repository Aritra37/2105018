const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

let storedNumbers = [];
const WINDOW_SIZE = 10;

async function fetchNumbers(numberId) {
    const url = ``;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.numbers || [];
    } catch (error) {
        console.error("Error fetching numbers:", error);
        return [];
    }
}

function storeNumber(number) {
    if (!storedNumbers.includes(number)) {
        if (storedNumbers.length >= WINDOW_SIZE) {
            storedNumbers.shift();
        }
        storedNumbers.push(number);
    }
}

function calculateAverage(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

app.get('/numbers/:numberId', async (req, res) => {
    const numberId = req.params.numberId;
    if (!['p', 'f', 'e', 'r'].includes(numberId)) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    const beforeNumbers = storedNumbers.slice();

    const numbers = await fetchNumbers(numberId);

    numbers.forEach(number => storeNumber(number));

    const afterNumbers = storedNumbers.slice();

    const average = storedNumbers.length >= WINDOW_SIZE ?
        calculateAverage(storedNumbers.slice(-WINDOW_SIZE)) :
        calculateAverage(storedNumbers);

    res.json({
        beforeNumbers,
        afterNumbers,
        average
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});