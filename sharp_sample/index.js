const sharp = require('sharp');
const fs = require('fs');

const outputPath = './output/'
const imageZero = './input/n0.png'
const imageOne = './input/n1.png'
const imageTwo = './input/n2.png'
const imageThree = './input/n3.png'
const imageFour = './input/n4.png'
const imageFive = './input/n5.png'
const imageSix = './input/n6.png'
const imageSeven = './input/n7.png'
const imageEight = './input/n8.png'
const imageNine = './input/n9.png'

/**
 * 取得圖片資訊
 * @description
 * 讀取圖片資訊 如長寬大小副檔名等內容
 * 執行後可以看到圖片資訊
 */
function getImageData(image) {
    sharp(image).metadata().then((info) => {
        console.log(info);
    })
}

/**
 * 建立圖片
 * @description
 * 使用create 建立圖片
 * 輸出時使用toBuffer或toFile產生檔案
 * 輸出圖片: createImage.png
 */
function createImage() {
    sharp({
        create: { // 長寬頻道與背景顏色皆為必要
            width: 300,
            height: 300,
            channels: 4,
            background: {r: 0, g: 0, b: 0, alpha: 0}
        }
    })// 輸出可以選擇格式(png, jpg, webp, tiff等)
        .png()
        // .jpeg()
        // .webp()
        // 輸出可選toBuffer或是toFile
        .toBuffer((err, data, info) => {
            fs.writeFileSync(`${outputPath}createImage.png`, data);
        })
        .toFile(`${outputPath}toFileCreateImage.png`)
        .then((info) => {
            console.log(`輸出`)
        })
        .catch((err) => {
            console.log(`輸出錯誤`)
        })
}

/**
 * 調整大小
 * @description
 * 調整圖片的大小
 * 輸出圖片： resize.png
 */
function resize() {
    sharp(imageZero)
        .resize( // 改變大小時 可選填長或寬即可另一方可以根據比例縮放 但是建議都填上
            {
                width: 300,
                height: 300,
                fit: 'cover', // 縮放方式 預設cover , contain, fill, inside, outside
                gravity: 'center', // 要放在放大後的哪個角落 north，northeast，east，southeast，south，southwest，west，northwest, center
                background: {r: 0, g: 0, b: 0, alpha: 1} // 背景顏色
            }
        )
        .toFile(`${outputPath}resize.png`)
        .then((info) => {
            console.log(`resize`)
        })
}

/**
 * 合成圖片
 * @description
 * 將指定的圖片進行合成與細節調整
 * 輸出圖片：compositing.png
 */
function compositingImage() {
    sharp(imageZero)
        .resize(120, 120)
        .composite([ // 合成的部分 可以
            {input: imageOne, gravity: 'north'},
            {input: imageTwo, gravity: 'northeast'},
            {input: imageThree, gravity: 'east'},
            {input: imageFour, gravity: 'southeast'},
            {input: imageFive, gravity: 'south'},
        ])
        .sharpen()
        .toFile(`${outputPath}compositing.png`)
        .then((info) => {
            console.log(`合成圖片`)
        })
        .catch((err) => {
            console.log(`合成圖片錯誤 ${err}`)
        })
}


/**
 * 回傳圖片長寬
 */
function getImageHW(image) {
    return new Promise((resolve, reject) => {
        sharp(image)
            .metadata()
            .then((info) => {
                resolve({width: info.width, height: info.height});
            })
    })

}

/**
 * 建立透明背景
 */
function createBackground(w, h) {
    return new Promise((resolve, reject) => {
        sharp({
            create: {
                width: w,
                height: h,
                channels: 4,
                background: {r: 0, g: 0, b: 0, alpha: 0}
            }
        })
            .png()
            .toBuffer((err, data ,info)=>{
            console.log(`完成`)
            resolve(Buffer.from(data))
        })
    })
}

/**
 * 合成List的圖片
 * @description
 * 將List按照等比例放排序合成
 */
async function compositingImage(background, width, object){

    object = object.map((elem, index)=>{
        return {input : elem, top: 0, left: Math.floor((width / object.length) * index)}
    })
    console.log(object)

    await sharp(background)
        .composite(object)
        .sharpen()
        .toFile(outputPath + 'imageList.png', () => {
        })
}

/**
 * 合成情境範例
 * @description
 * 將圖片做成整列圖片動態輸出
 */
async function exampleCompositing () {
    const imageList = [
        imageOne,
        imageTwo,
        imageThree,
        imageFour,
        imageFive,
        imageSix,
        imageSeven,
        imageEight,
        imageNine,
    ]

    const a = imageList.map(async (item, index) => {
        return {data: await getImageHW(item)};
    });

    let totalH = 0;
    let totalW = 0
    for (const elem of a) {
        totalH = (await elem).data.height * 2
        totalW += (await elem).data.width;
    }
    const background = await createBackground(totalW, totalH);
    console.log(totalW)
    compositingImage(background, totalW, imageList);
}

// getImageData(imageZero); //取得圖片資訊
// createImage(); // 建立圖片
// resize(); // 重新調整圖片
// compositingImage(); // 合成圖片

// exampleCompositing(); // 圖片列表合成



