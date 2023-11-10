const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;
const router = express.Router();

app.use(express.static('public'));
app.use('/api/quotes', router);
app.listen(PORT);

router.get('/random', (req, res, next) => {
    res.send({
        quote: getRandomElement(quotes)
    });
});

router.get('/', (req, res, next) => {
    let person = req.query.person;
    if (person) {
        let results = quotes.filter((item) => (item.person === person));
        if (results.length > 0) {
            res.send({
                quotes: results
            });
        } else {
            res.send({
                quotes: []
            });
        }
    } else {
        res.send({
            quotes: quotes
        });
    }
});

router.post('/', (req, res, next) => {
    let quote = req.query.quote;
    let person = req.query.person;
    if (quote && person) {
        let newQuote = {
            quote: quote,
            person: person
        }
        quotes.push(newQuote);
        res.send({
            quote: newQuote
        });
    } else {
        res.status(400).send();
    }
});