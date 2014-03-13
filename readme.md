Array Pivot
======

A utility to generate pivot tables from an array of objects:

	var pivot = require('fulcrum');

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
	}];

In this data model, John has 32 5ct and 3 10ct coins, Jane has 6 5ct and 15 10ct coins.

	var res = pivot(data,'name','coin',pivot.sum('number'));

	[{
	    "name": "John",
	    "5ct": 32,
	    "10ct": 3
	},{
	    "name": "Jane",
	    "5ct": 6,
	    "10ct": 15
	}]

API
---

	pivot(array,rows,cols,reducer);

- array: an array of objects
- rows: a string for the field for rows
- cols: a string for the field for columns
- reducer (optional): an object describing how to calculate the cell value from the matched objects:

		{
			callback: Function,
			initialValue: Object
		}

	These are the same arguments as passed into Array.reduce: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce>.

	If the reducer is omitted, an array of objects is returned in the cell

Built in reducers
----------------

- pivot.sum(field): return the sum of the values in field `field`
- pivot.count(): return the number of objects in the cell
- pivot.average(field): return the average
- pivot.min(field): return the minimum
- pivot.max(field): return the maximum

For all these reducers, when no objects are present in the cell, `null` is returned, except for `count()`

Convenience attachments to Array.prototype
--------------------

If you wish, you can attach a convenience method to Array.prototype:

	var pivot = require('fulcrum').attach();
	var res = data.pivot('name','coin',pivot.sum('number'));

It can also be detached:

	pivot.detach();