function add(a,b){
    return a + b;
}
function sub(a,b){
    return a - b;
}
// module.exports = add; 
// module.exports= sub;

// module.exports={
//     addFn: add,
//     subFn: sub
// };
// exports.addFn = function(a,b){
//     return a + b;
// }
// exports.subFn = function(a,b){
//     return a - b;
// }
module.exports = {add, sub};