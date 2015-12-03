// var v1 = vector.create(10,5);
//
// v1.setAngle( Math.PI / 6);
// v1.setLength(100);
//
// console.log(v1.x);
// console.log(v1.y);
// console.log(v1.getAngle());
// console.log(v1.getLength());


var v1 = vector.create(10,5);
var v2 = vector.create(3,4);
var v3 = v1.add(v2);


console.log(v3.x, v3.y );

console.log( v2.multiply(2));
