const fs = require('fs'); // 內建於node內 不需要額外install只需require
const inputPath = './input/'; // 讀入
const outPath = './output/'; // 輸出
const outFile = '/output.txt'; // 輸出的文件名稱
const outSyncFile = '/outputSync.txt'; // 輸出的文件名稱
const inputFile = '/HelloWorld.txt'; // 讀入用的文件名稱

// 使用fs的範例 並非使用全部方法 而是紀錄一些常用的用法

/**
 * 寫入檔案
 * 寫入資料後產生於output資料夾內
 */
function writeFile (){
    const data = {name : 'Hello!'}
    // 非阻塞型用法
    fs.writeFile(`${outPath}${outFile}`, JSON.stringify(data), (err => {
        if(err){
            console.log(err);
        }
    }));
    //阻塞型用法
    fs.writeFileSync(`${outPath}${outSyncFile}`, JSON.stringify(data));
}

/**
 * 建立資料夾
 */
function createDir (){
    fs.mkdir(`${outPath}`, {recursive:true}, (err)=>{
        if(err)throw err
    });
    fs.mkdirSync(`${outPath}`); //建立路徑資料夾
}

/**
 * 讀取檔案
 * 讀入input資料夾的內容
 */
function readFile (){
    // 阻塞型用法
    const fileData = fs.readFileSync(`${inputPath}${inputFile}`, 'utf-8')
    console.log(`readFileSync : ${fileData}`);
    // 非阻塞型用法
    fs.readFile(`${inputPath}${inputFile}`, 'utf-8', (err, data)=>{
        if(err){
            console.log(`讀取內容錯誤:${err}`)
        }
        console.log(`readFile : ${data}`)
    });
}

/**
 * 檢查檔案
 * 檢查檔案/路徑是否有存在 回傳boolean
 */
function existsFile(){
    const fileExists01 = fs.existsSync(`${inputPath}`); // 存在該路徑
    const fileExists02 = fs.existsSync(`${inputPath}/fake`); // 不存在該路徑
    console.log(fileExists01, fileExists02);
}

// 使用
// writeFile();
// readFile();
// existsFile();
// createDir();