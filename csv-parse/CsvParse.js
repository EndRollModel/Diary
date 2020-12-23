class CsvParse {
    constructor(file) {
        // 沒有逗號或是沒有換行符號 必不為Csv格式
        if (file.indexOf('\n') < 1 || file.indexOf(',') < 1) {
            throw new Error('file is not csv')
        } else {
            this._file = this._parseFile(file)
        }
    }

    _parseFile(file) {
        const data = file.split(/\r?\n/);
        data.forEach((e, index) => {
            data[index] = e.split(',');
        })
        return data
    }

    /**
     * 將資料轉為Json格式
     * @return {[]}
     */
    toJson() {
        if (this._file === undefined) return this._file;
        const jsonArray = [];
        this._file.forEach((e, index)=>{
            if(index === 0) return; // 跳過key
            const eObject = {}
            e.forEach((inElem, inIndex)=>{
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
    toJsonKey(key) {
        let jsonArray = [];
        const data = this.toJson();
        if(Object.keys(data[0]).includes(key)){
            data.forEach(e=>{
                const object = {};
                object[key] = e[key]
                jsonArray.push(object)
            })
        }else {
            jsonArray = undefined;
        }
        return jsonArray
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
    size(){
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
