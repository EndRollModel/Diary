// 抽選後打亂的模式

const object = [
    {name: '人員A', count: 1},
    {name: '人員B', count: 2},
    {name: '人員C', count: 3},
    {name: '人員D', count: 4},
    {name: '人員E', count: 5},
];

// 總共抽選幾張
const getCount = 5;
const getLoop = 1;

// Raffle Drum 滾筒式籤筒
function runStart(obj, getCount, getLoop = 1, showLog = null) {
    const final = [];
    let getLen = 0;
    for (let i = 0; i < getLoop; i++) {
        const raffleDrum = []; //獎池
        const awarded = []; // 抽出來的人
        obj.forEach((elem) => {
            for (let i = 0; i < elem.count; i++) {
                raffleDrum.push(elem.name)
            }
        })
        // 洗牌算法 Fisher-Yates Shuffle
        getLen = raffleDrum.length;

        for (let i = 0; i < getCount; i++) {
            for (let i = raffleDrum.length - 1; i >= 0; i--) {
                const randomIndex = Math.floor(Math.random() * (i + 1));
                const itemAtIndex = raffleDrum[randomIndex];

                raffleDrum[randomIndex] = raffleDrum[i];
                raffleDrum[i] = itemAtIndex;
            }
            awarded.push(raffleDrum.shift()); //只取第一張
        }
        final.push(awarded);
    }
    if (showLog) {
        console.table(final);
        console.log(`總計內容數 : ${getLen}`);
    }
    return final
}

runStart(object, getCount, getLoop, true);
