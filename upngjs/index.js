const uPng = require('upng-js');
const fs = require('fs');
const delay = 250; // 延遲時間
const oneBuffer = fs.readFileSync('./input/test01.png');
const twoBuffer = fs.readFileSync('./input/test02.png');
const threeBuffer = fs.readFileSync('./input/test03.png');
const bufferArray = []; // 所有圖片fs放這裡
const encodeArray = []; // 解析之後的buffer放這裡
const delayArray = []; // 除非需要手動改延遲 不然固定延遲
bufferArray.push(oneBuffer, twoBuffer, threeBuffer);
bufferArray.forEach((e) => {
    const decode = uPng.decode(e); // 解析
    const rbgImg = uPng.toRGBA8(decode); // 取得Rgba8內容
    console.log(rbgImg[0])
    encodeArray.push(rbgImg[0]); // 取得Buffer
    delayArray.push(delay); // 寫入延遲
});
// 尺寸必須與設定的大小一致否則會出錯 透明會變成白色
const encAction = uPng.encode(encodeArray, 300, 300, 0, delayArray); // 製作apngBuffer
fs.writeFileSync('./output/uPng02.png', new Uint8Array(encAction)); // 輸出

