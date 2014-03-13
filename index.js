var pivot = function(array,rows,cols,cells) {

    //row bins
    var r = {};
    var c = {};
    array.forEach(function(row) {
        if (!r[row[rows]]) {
            r[row[rows]] = [];
        }
        r[row[rows]].push(row);
        if (!c[row[cols]]) {
            c[row[cols]] = [];
        }
        c[row[cols]].push(row);
    });

    return Object.keys(r).map(function(key) {
        var ret = {};
        ret[rows] = key;
        Object.keys(c).forEach(function(col) {
            //add all column keys
            ret[col] = r[key].filter(function(cell) {
                //with the cells matching
                return cell[cols] == col;
            });
            if (cells) {
                //reduced by the given function
                ret[col] = ret[col].reduce(cells.callback,cells.initialValue);
            }
        });
        return ret;
    });
};

//attach and detach to array prototype
var orig;
pivot.attach = function() {
    orig = Array.prototype.pivot;
    Array.prototype.pivot = function(rows,cols,cells) {
        return pivot(this,rows,cols,cells);
    };
    return pivot;
};
pivot.detach = function() {
    Array.prototype.pivot = orig;
    return pivot;
};

//reducers
pivot.sum = function(field) {
    return {
        callback: function(prev,cell) {
            return (prev||0) + cell[field];
        },
        initialValue: null
    };
};
pivot.count = function() {
    return {
        callback: function(prev,cell) {
            return prev + 1;
        },
        initialValue: 0
    };
};
pivot.average = function(field) {
    return {
        callback: function(prev,cell,index,array) {
            return (prev||0) + cell[field]/array.length;
        },
        initialValue: null
    };
};
pivot.min = function(field) {
    return {
        callback: function(prev,cell,index,array) {
            if (prev === null) {
                prev = Number.POSITIVE_INFINITY;
            }
            return Math.min(prev,cell[field]);
        },
        initialValue: null
    };
};
pivot.max = function(field) {
    return {
        callback: function(prev,cell,index,array) {
            if (prev === null) {
                prev = Number.NEGATIVE_INFINITY;
            }
            return Math.max(prev,cell[field]);
        },
        initialValue: null
    };
};

//https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.pivot = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return pivot;
}));
