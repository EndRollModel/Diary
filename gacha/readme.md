機率相關的抽選內容

#### logic

僅適用於機率總和為一百的轉蛋抽獎 並且做了機率驗證

內容：陣列洗牌後僅取出前幾項

使用方式        
```
startGACHA(object, getCount, loopCount);
```

object = 抽選的內容      
sample (name(String) rate(int))
```json
[{
    "name" : "獎品名稱", "rate" : 100
}]
```
loopCount = 總共要轉幾次

getCount = 單次抽選內要抽幾個獎品

第四個參數為是否秀出log   
若秀出log 則會以table模式秀出該次抽獎內容       
Name = 設定的獎品名稱      
ALL_Count = 總計所有該項獎品的抽出次數   
Test_Rate = 該次抽選總計計算的抽出機率(數量越大才會越準確)    
Default_Rate = 原設定抽出該有的機率   
Error = 偏差機率 以前兩者去計算(數量越小越不準確 僅做驗證用)    

若機率總和不等於100時會報錯


#### logic2

尾牙說根據員工年資幾年就放幾隻籤來抽大獎      
所以為了練手手另外寫了一個抽籤程式

內容：與第一個轉蛋機類似 
先將陣列洗牌 但是從籤筒抽出後的籤就消失 之後在洗牌一次 再抽一個 持續到抽獎結束 通常僅抽一次 所以不做機率驗證

使用方式
```
runStart(object, getCount, getLoop,true);
```
object = 抽選的內容      
sample (name(String) count(int))
```json
[{
    "name" : "獎品名稱", "rate" : 100
}]
```
loopCount = 總共要轉幾次

getCount = 該輪抽選 需要抽出幾個獎項
