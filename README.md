# convert_number_js
Convert numbers in Chinese characters to arabic numbers  
中文轉阿拉伯數字（口語化／全面/句子轉換）

#Features
 - 能抽取整句的數字
 - 能識別多個數字
 - 多種形式的數字也能識別(阿拉伯數字混合中文數字)
 - 支持口語化的表述
 - 最全面支持各種表達
    - 通過的測試有：
        - 1238萬  
        - 一二三
        - 二三雞
        - 三點七萬
        - 一萬零二
        - 一萬二
        - 十萬五千
        - 五十九億兩千萬一千兩百四十五
        - 一萬兩千
        - 一億萬
        - 一萬億 
        - 三十二蚊
        - 十三雞 
        - 廿三雞
        - 一兆 
        - 乙
        - 九千九百九十九毫九
        - 39.8萬
        - 3萬9千七百
        - 20至44歲港女患癌 多男士1.3倍
        - 一點三
        - 2.7萬


#Installation
```npm install convert_number_js --save```  

#Example Usage  
```javascript
var converter = require('convert_number_js');
converter.convertChineseNumber('我有十萬你有五萬',function(callback) {
  console.log(callback);
})
```
* callback will be an array of all chinese numbers in String

#TODO
- 代碼整理
- 時間識別
- 金額識別
- 百分數識別
- 數學邏輯運算

