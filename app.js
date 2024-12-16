const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// 데이터 파일 이름
const progressFile = 'progress.json';

// 초기 데이터 로드
let progressData = { checkedCount: 0, total: 690 };
if (fs.existsSync(progressFile)) {
    // 파일이 존재하면 데이터를 읽어온다
    const fileData = fs.readFileSync(progressFile);
    progressData = JSON.parse(fileData);
}

// 데이터 저장 함수
function saveProgressData() {
    fs.writeFileSync(progressFile, JSON.stringify(progressData));
}

// 미들웨어 설정
app.use(express.json());

// 진행률 데이터 조회 (GET 요청)
app.get('/progress', (req, res) => {
    res.json(progressData);
});

// 진행률 데이터 업데이트 (POST 요청)
app.post('/update', (req, res) => {
    const { checkedCount } = req.body;

    if (checkedCount >= 0 && checkedCount <= progressData.total) {
        progressData.checkedCount = checkedCount;
        saveProgressData(); // 데이터 저장
        return res.status(200).send('Progress updated!');
    }

    return res.status(400).send('Invalid data');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
