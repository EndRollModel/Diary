class CsvParse {
    constructor(file, option = null) {
        // 沒有逗號或是沒有換行符號 必不為Csv格式
        if (file.indexOf('\n') < 1 || file.indexOf(',') < 1) {
            throw new Error('file is not csv')
        } else {
            this._file = this.#parseFile(file)
        }
    }

    // 將資料整理成陣列
    #parseFile(file){
        const allData = [];
        const newLineIndex = file.search(/\r?\n/);
        const keyString = file.substring(0, newLineIndex);
        const keys = keyString.split(',');

        const splitFile = file.split(/\r\n/g);
        splitFile.shift(); // 移除keys
        allData.push(keys)
        console.log(splitFile)
        const keyCount = keys.length;
        splitFile.forEach((e) => {
            const splitData = e.split(',');
            // console.log(splitData)
            if (splitData.length === keyCount) {
                const data = [];
                splitData.forEach((el)=>{
                    let formatStr = el;
                    formatStr = formatStr.replace(/""/g,'｜｜');
                    formatStr = formatStr.replace(/"/g,'');
                    formatStr = formatStr.replace(/｜｜/g, '"');
                    data.push(formatStr)
                })
                allData.push(data);
            } else {
                //檢查是否有雙引號
                const data = [];
                let tempCheck = false;
                let tempString = '';
                splitData.forEach((el,index) => {
                    if (tempCheck) {
                        if (el[el.length - 1] === '"') {
                            tempString += el;
                            tempCheck = false;
                            tempString = tempString.replace(/""/g,'｜｜');
                            tempString = tempString.replace(/"/g,'');
                            tempString = tempString.replace(/｜｜/g, '"');
                            data.push(tempString)
                        } else {
                            tempString += el;
                        }
                    } else {
                        // 換行逗號都會使用""處理
                        if (el[0] === '"'){
                            tempString = el;
                            tempCheck = true;
                        }else {
                            el = el.replace(/""/g,'｜｜');
                            el = el.replace(/"/g,'');
                            el = el.replace(/｜｜/g, '"');
                            data.push(el)
                        }
                    }
                })
                allData.push(data);
            }
        })
        return allData;
    }

    // 舊版寫法 留作紀念
    // #parseFile(file) {
    //     const data = file.split(/\r?\n/);
    //     data.forEach((e, index) => {
    //         data[index] = e.split(',');
    //     })
    //     // 最後元素為空白移除
    //     if (data[data.length - 1].length === 1 && data[data.length - 1][0] === '') {
    //         data.pop();
    //     }
    //     //若有多餘的''或是""去除
    //     data.forEach((e, index) => {
    //         for (let i = 0; i < e.length; i++) {
    //             if ((e[i].startsWith('\'') && e[i].endsWith('\'')) || (e[i].startsWith('"') && e[i].endsWith('"'))) {
    //                 if (e[i].length > 2) {
    //                     data[index][i] = e[i].slice(1, e[i].length -1)
    //                 } else {
    //                     data[index][i] = '';
    //                 }
    //             }
    //         }
    //     })
    //     return data;
    // }

    /**
     * 將資料轉為Json格式
     * @return {[]}
     */
    toJson() {
        if (this._file === undefined) return this._file;
        const jsonArray = [];
        this._file.forEach((e, index) => {
            if (index === 0) return; // 跳過key
            const eObject = {}
            e.forEach((inElem, inIndex) => {
                eObject[this._file[0][inIndex]] = inElem;
            })
            jsonArray.push(eObject)
        })
        return jsonArray;
    }

    /**
     * 輸入指定的key 只回傳該key的json
     * 若無資料則回傳 undefined
     * @param key
     */
    getJsonKey(key) {
        let jsonArray = [];
        const data = this.toJson();
        if (Object.keys(data[0]).includes(key)) {
            data.forEach(e => {
                const object = {};
                object[key] = e[key]
                jsonArray.push(object)
            })
        } else {
            jsonArray = undefined;
        }
        return jsonArray
    }


    /**
     * 製作xml資料
     * @return {*|string[]}
     * @description
     * 最外層跟itemName需要名稱 若不給名則採用 'header' & 'item'
     */
    toXml(headerName = 'header', rowName = 'item'){
        let xmlData = '';
        if(this._file === undefined) return this._file;
        const data = this._file;
        xmlData += '<?xml version="1.0" encoding="UTF-8"?>\n'; // 加入標頭
        data.forEach((e, index)=>{
            if(index === 0){
                xmlData += `<${headerName}>\n`
                return;
            }
            for (let i = 0; i < e.length; i++) {
                if(i === 0){
                    xmlData += `\t<${rowName}>\n`
                }
                if(e[i] === ''){
                    xmlData += `\t\t<${data[0][i]}/>\n`
                }else {
                    xmlData += `\t\t<${data[0][i]}>${e[i]}<\/${data[0][i]}>\n`
                }
                if(i === e.length-1){
                    xmlData += `\t<\/${rowName}>\n`
                }
            }
            if(index === data.length -1){
                xmlData += `<\/${headerName}>\n`
            }
        })
        return xmlData;
    }

    /**
     * 取得第N筆資料 從0開始
     * @param index
     * @return {*}
     */
    getIndex(index) {
        return this._file[index + 1]
    }

    /** 取得總資料筆數
     * @return {number}
     */
    size() {
        return this._file.length
    }

    /**
     * 回傳所有key
     * @return {*}
     */
    keys() {
        return this._file[0];
    }

}

module.exports = CsvParse;
