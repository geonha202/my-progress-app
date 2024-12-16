const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // JSON 요청을 처리할 수 있도록 설정

let progressData = { checkedCount: 0, total: 690 };

app.get('/', (req, res) => {
    res.send('Hello, World! This is my first Express server.');
});

app.post('/update', (req, res) => {
    const { checkedCount } = req.body;

    if (checkedCount >= 0 && checkedCount <= progressData.total) {
        progressData.checkedCount = checkedCount;
        return res.status(200).send('Progress updated!');
    }

    return res.status(400).send('Invalid data');
});

app.get('/progress', (req, res) => {
    res.json(progressData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

