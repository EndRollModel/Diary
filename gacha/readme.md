機率相關的抽選內容

#### logic

自己想法的公平轉蛋抽選程式（可小數點）

僅適用於機率總和為一百的轉蛋抽獎 並且做了機率驗證       
(可show log看偏差 抽選次數越多 越接近真實機率)       
且設定機率可設定為小數點        

程式設計模式內容：       
將對應的機率依照百分比去產生物件對應物件數量      
若最低機率為個位數機率則依照對應數量產生100個物件     
若最低機率為小數點後一位則產生1000個物件      
依此類推        
但若設定機率到約小數點後兩位時 其機率將趨近於0


使用方式：

```javascript
/**
@param object  {object}
@param getCount {int}
@param loopCount {int}
@param showLog {boolean}
*/
startGACHA(object, getCount, loopCount);
startGACHA(object, getCount, loopCount, showLog);
```


參數說明：       
object = 抽選的內容      
object格式如下      
```json
[
  {
    "name": "獎品名稱",
    "rate": 100
  }
]
```
注意：若機率總和不等於100時會報錯

loopCount = 總共要轉幾次      
getCount = 單次抽選內要抽幾個獎品      
Name = 設定的獎品名稱      
showLog = 會以console.table show出該次結果總計       
若驗證其Log內容將為以下內容     
ALL_Count = 總計所有該項獎品的抽出次數   
Test_Rate = 該次抽選總計計算的抽出機率(數量越大才會越準確)    
Default_Rate = 原設定抽出該有的機率   
Error = 偏差機率 以前兩者去計算(數量越小越不準確 僅做驗證用)

---
#### logic2

尾牙說根據員工年資幾年就放幾隻籤來抽大獎      
所以為了練手手另外寫了一個抽籤程式

內容：與第一個轉蛋機類似 先將陣列洗牌 但是從籤筒抽出後的籤就消失 之後在洗牌一次 再抽一個 持續到抽獎結束 通常僅抽一次 所以不做機率驗證

使用方式

```javascript
/**
@param object  {object}
@param getCount {int}
@param loopCount {int}
@param showLog {boolean}
*/
runStart(object, getCount);
runStart(object, getCount, getLoop);
runStart(object, getCount, getLoop, showLog);
```

參數說明：   
object = 抽選的內容      
object格式如下
```json
[
  {
    "name": "獎品名稱",
    "count": 100
  }
]
```
loopCount = 總共要轉幾次      
getCount = 該輪抽選 需要抽出幾個獎項

