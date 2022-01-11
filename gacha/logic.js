/**
 * 自我想像流！
 * 轉蛋機制 不包含保底等機制
 * 流程如樂透彩球
 */

const loopCount = 1; // 抽共抽選幾次
const getCount = 5; // 單次抽選次數 不能大於池內總數量 100 * (機率最小的機率小數點每一位 * 10) 無小數點就100 小數點一位就1000 設定滿可以檢查池內數量是否正確
// 設定機率組 rate 總合必須等於 100
const object = [
    {name: 'ssr', rate: 10},
    {name: 'sr', rate: 30},
    {name: 'n', rate: 60},
]

/**
 * 普通抽卡
 * 邏輯部分
 */
function startGACHA(rewardObj, getCount, loopCount, showLog = false) {
    const startTime = Date.now(); // 記錄該次時間
    const total = []; // 抽選結果
    const objectName = []; // 內容的名字
    const objectRate = []; // 內容的機率拆分
    const finalCheck = []; // 最終核對的物件內容
    let checkRate = 0; // 檢查機率的變數
    rewardObj.forEach((elem) => {
        checkRate += elem.rate;
        objectName.push(elem.name);
        objectRate.push(elem.rate);
        finalCheck.push({name: elem.name, count: 0, rate: 0, defRate: elem.rate, abs: 0});
    })

    const errorMsg = `機率總和不等於100  機率總和：${checkRate}`
    if (checkRate !== 100) throw new Error(errorMsg); // 若機率總和不等於100 直接回傳錯誤

// 判斷是否有小數點一下機率 若有將每個物件根據小數點(每一位*10)
    if (objectRate.sort((a, b) => a - b)[0].toString().indexOf('.') > -1) {
        const rateCount = objectRate.sort((a, b) => a - b)[0].toString().split('.')[1].length;
        let dp = 0;
        for (let i = 0; i < rateCount; i++) {
            if (dp === 0) {
                dp = 10 // 第一位就為10
            } else {
                dp *= 10
            }
        }
        rewardObj.forEach((elem) => {
            elem.rate = elem.rate * dp
        })
    }
    for (let i = 0; i < loopCount; i++) {
        const input = [];

        rewardObj.forEach((elem) => {
            for (let i = 0; i < elem.rate; i++) {
                input.push(elem.name)
            }
        })
        // 洗牌算法 Fisher-Yates Shuffle
        for (let i = input.length - 1; i >= 0; i--) {

            const randomIndex = Math.floor(Math.random() * (i + 1));
            const itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        total.push(input.splice(0, getCount))
    }

    if (showLog) {
        const outputMsg = [];
        total.forEach((elem, index) => {
            for (let i = 0; i < elem.length; i++) {
                const eIndex = objectName.findIndex(e => e === elem[i])
                finalCheck[eIndex].count++
            }
        })
        finalCheck.forEach((e) => {
            e.rate = (e.count / (loopCount * getCount)) * 100
            e.abs = `${Math.round(Math.abs(((e.rate - e.defRate) / e.defRate) * 100) * 1000) / 1000}%`
            outputMsg.push({
                Name: `${e.name}`,
                ALL_Count: `${e.count}`,
                Test_Rate: `${e.rate}%`,
                Default_Rate: `${e.defRate}%`,
                Error: `${e.abs}`
            })
            // console.log(`獎項名稱:${e.name}\n該次總計抽出:${e.count}次\n測試機率為:${e.rate}%\n原設定機率為:${e.defRate}%\n誤差為:${e.abs}\n`);
        })
        const endTime = Date.now();
        console.table(outputMsg)
        console.log(`單次出貨數量：${getCount} \n總共抽選次數：${loopCount} \n總計用時：${(endTime - startTime) / 1000}秒`);
    }
    return total;
}

const result = startGACHA(object, getCount, loopCount, true);

