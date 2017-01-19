/**
 * Created by ericlam on 19/1/2017.
 */
var converter = require('./convert');
converter.convertChineseNumber('我有十萬你有五萬',function(callback) {
    console.log(callback);
})