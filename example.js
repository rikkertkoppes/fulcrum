var pivot = require('./lib/pivot').attach();

var data = [{
    name: 'John',
    coin: '5ct',
    number: 30
},{
    name: 'John',
    coin: '5ct',
    number: 2
},{
    name: 'John',
    coin: '10ct',
    number: 3
},{
    name: 'Jane',
    coin: '10ct',
    number: 15
},{
    name: 'Jane',
    coin: '5ct',
    number: 6
},{
    name: 'Jane',
    coin: '20ct',
    number: 9
}];

var res = pivot(data,'name','coin',pivot.sum('number'));

console.log(JSON.stringify(res,null,4));