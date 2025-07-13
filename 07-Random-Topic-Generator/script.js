document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const categorySelect = document.getElementById('topic-category');
    const resultText = document.getElementById('result-text');

    const topics = {
        blog: [
            '最近買ってよかったもの',
            'おすすめの時短テクニック',
            '10年後の自分を想像する',
            '影響を受けた本・映画',
            '休日の過ごし方',
            '最近学んだこと',
        ],
        illustration: [
            '雨上がりの街角',
            '空飛ぶ本',
            '機械仕掛けの動物',
            '星空を見上げる少女',
            '秘密の地下室',
            'しゃべる植物',
        ],
        short_story: [
            '主人公: 時間旅行者, 場所: 古代図書館, 事件: ページが1枚なくなる',
            '主人公: 猫の探偵, 場所: 港町, 事件: 消えた魚の謎',
            '主人公: 記憶を失ったアンドロイド, 場所: 廃墟の都市, 事件: 自分の過去を見つける',
            '主人公: 花屋の店主, 場所: 静かな田舎町, 事件: 不思議な種が届く',
        ]
    };

    function generateTopic() {
        const category = categorySelect.value;
        const topicList = topics[category];
        const randomIndex = Math.floor(Math.random() * topicList.length);
        resultText.textContent = topicList[randomIndex];
    }

    generateBtn.addEventListener('click', generateTopic);

    // Initial generation
    generateTopic();
});