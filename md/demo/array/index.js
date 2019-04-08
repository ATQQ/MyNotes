/**
 * 取出数组1在数组2中不存在的部分
 * @param {Array} array1 
 * @param {Array} array2 
 */
function getLackArray(array1, array2) {
    var newArray=new Array();
    var count=0;
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] == array2[j]) {
                break;
            } else if (j == array2.length - 1) {
                console.log('success');
                if ($.inArray(array1[i],newArray)==-1){
                    newArray[count++] = array1[i];
                }
            }
        }
    }
    return newArray;
}