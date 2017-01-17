/**
 * Created by ericlam on 17/1/2017.
 */

var Nzh = require("nzh");
var nzhHK = Nzh.hk;

var chnNum = {
    壹: 1,
    乙: 1,
    貳: 2,
    參: 3,
    肆: 4,
    伍: 5,
    陸: 6,
    柒: 7,
    捌: 8,
    玖: 9,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    兩: 2,
    少半: 0.25,
    小半: 0.25,
    大半: 0.75,
    一半: 0.5,
    弱冠: 20,
    而立: 30,
    不惑: 40,
    知天命: 50,
    花甲: 60,
    古稀: 70,
    耄耋: 80
};
var chnUnit = {
    零: 0,
    雙: 2,
    對: 2,
    拾: 10,
    佰: 100,
    仟: 1000,
    十: 10,
    廿: 20,
    百: 100,
    k: 1000,
    千: 1000,
    萬: 10000,
    億: 100000000,
    兆: 1000000,
    點: 0.1,
    百分點: 0.01,
    percent: 0.01,
    '%': 0.01,
    毫: 0.1,
    分: 0.01,
    厘: 0.001,
    厘息: 0.01,
    猜: 1000,
    青蟹: 10,
    草: 10,
    條: 10,
    近: 100,
    篙: 100,
    舊: 100,
    紅衫魚: 100,
    叉水: 1000,
    撇水: 1000,
    戙水: 1000,
    雞: 10000,
    皮: 10000,
    個: 10000,
    粒: 10000,
    盤水: 10000,
    餅: 10000,
};

function convertChineseNumber(text, callback) {

    var converText = text;
    var NumberPATTERN = /[雙對拾佰仟十廿百k千萬億兆點(百分點)(percent)%毫分厘(厘息)零壹乙貳參肆伍陸柒捌玖〇一二三四五六七八九兩(0-9.)(少半)(小半)(太半)(大半)(一半)(弱冠)(而立)(不惑)(知天命)(花甲)(古稀)(耄耋)]+/g;
    // var NumberPATTERN = /[雙對拾佰仟十廿百千萬億兆零壹乙貳參肆伍陸柒捌玖〇一二三四五六七八九兩]+/g;
    var DigitPATTERN = /[0-9.]+/g;
    var numList = [];
    var typeList = [];

    var list = [];

    var digit = 0; //translate all digit to chinese char
    while ((digit = DigitPATTERN.exec(text)) !== null) {
        text = text.replace(digit[0], nzhHK.encodeS(digit[0]));
    }

    var match; //extract number and unit
    while ((match = NumberPATTERN.exec(text)) !== null) {
        var value = 0;

        // var regex = new RegExp(match[0] + "(\\S{0,5})", "g");
        // var data = regex.exec(text);
        // if (data[1].length > 0) {
        //     console.log(data[0] + "::" + data[1]);
        // }

        var str = match[0].split('');
        numList = [];
        typeList = [];
        for (var i = 0; i < str.length; i++) {
            if (chnNum[str[i]] != undefined) {
                numList.push(chnNum[str[i]]);
                typeList.push("number");
            }
            if (chnUnit[str[i]] != undefined) {
                numList.push(chnUnit[str[i]]);
                typeList.push("unit");
            }
        }

        if (typeList.allValuesSame() && typeList[0] == 'number') {
            var char = '';
            for (var i = 0; i < numList.length; i++) {
                char += numList[i];
            }
            value = char;
        }
        else {
            var lastUnit = 0;
            while (numList.length > 0) {
                var maxUnit = Math.max(...numList);
                var maxPos = numList.indexOf(maxUnit);
                var maxValue = numList.slice(0, maxPos);
                var dumValue = 0;

                if (Math.log10(maxUnit) % 1 != 0 && maxUnit > 1) {
                    maxUnit = 1;
                    maxPos = 0;
                    maxValue = numList;
                    numList = [];
                }

                for (var i = 0; i < maxValue.length; i++) {
                    if (i + 1 < maxValue.length && maxValue[i + 1] > 1 && Math.log10(maxValue[i + 1]) % 1 == 0) {
                        dumValue += maxValue[i] * maxValue[i + 1];
                        i += 1;
                    }
                    else if (i + 1 < maxValue.length && maxValue[i] < 1) {
                        if (maxValue[i] == 0)
                            dumValue += maxValue[i + 1];
                        else
                            dumValue += maxValue[i] * maxValue[i + 1];
                        i += 1;
                    }
                    else {
                        if (maxValue[i] == 0) {
                            dumValue = maxUnit;
                            maxUnit = 1;
                        }
                        else {
                            if (lastUnit >= 10 && (lastUnit / 10) != maxUnit){
                                dumValue += lastUnit / 10 * maxValue[i];
                            }
                            else{
                                // if(Math.log10(maxValue[i]) % 1 != 0)
                                dumValue += maxValue[i];

                            }
                        }

                    }

                }

                if (dumValue > 0) {
                    value += dumValue * maxUnit;
                }
                else {
                    if (Math.abs(Math.log10(maxUnit)) % 1 == 0) {
                        if (value < 1) value = 1;
                        value *= maxUnit;
                    }
                    else {
                        value += maxUnit;
                    }
                }
                lastUnit = maxUnit;
                numList = numList.splice(maxPos + 1, numList.length);
            }
        }
        list.push(value);
        converText = converText.replace(match[0],value);
    }

    callback(list);
    return list;
}
Array.prototype.allValuesSame = function () {

    for (var i = 1; i < this.length; i++) {
        if (this[i] !== this[0])
            return false;
    }

    return true;
}

//1238萬 一二三 二三雞 三點七萬 一萬零二 一萬二 十萬五千 五十九億兩千萬一千兩百四十五 一萬兩千 一億萬 一萬億 三十二蚊 十三雞 廿三雞 一兆 乙 九千九百九十九毫九 39.8萬 3萬9千七百 20至44歲港女患癌 多男士1.3倍 一點三 2.7萬
convertChineseNumber('1238萬 一二三 二三雞 三點七萬 一萬零二 一萬二 十萬五千 五十九億兩千萬一千兩百四十五 一萬兩千 一億萬 一萬億 三十二蚊 十三雞 廿三雞 一兆 乙 九千九百九十九毫九 39.8萬 3萬9千七百 20至44歲港女患癌 多男士1.3倍 一點三 2.7萬 ',
    function (result) {
        console.log(result);
    });