/**
 * 空格替换
 * @param {String} str 
 */
function replaceEmpty1(str) {
    const r = / /g;
    return str.replace(r, '%20');
}

// console.log(replaceEmpty1("hello worl dd s"));

/**
 * 空格替换
 * @param {String} str 
 */
function replaceEmpty2(str) {
    var res = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === ' ') {
            res += "%20"
        } else {
            res += str.charAt(i);
        }
    }
    return res;
}
// console.log(replaceEmpty2("hello worl dd s"));

/**
 * 交换两个值
 * @param {Array} arr 
 * @param {Number} i 
 * @param {Number} j 
 */
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * 检查是否重复
 * @param {Array} arr 
 * @param {Number} start 
 * @param {Number} end 
 */
function check(arr, start, end) {
    for (let i = start; i < end; i++) {
        if (arr[end] === arr[i]) {
            return false;
        }
    }
    return true;
}

/**
 * 全排列
 * @param {Array} arr 带排列数组
 * @param {Number} n 起始位置
 */
function prem(arr = [], n = 0) {
    const length = arr.length;
    if (n === length) {
        console.info(arr.join(""));
        return;
    }
    for (let i = n; i < length; i++) {
        if (check(arr, n, i)) {
            swap(arr, n, i);
            prem(arr, n + 1);
        }
    }
}

// prem("a".split(''), 0);

/**
 * 单词翻转
 * @param {String} str 
 */
function reverseSentence(str) {
    const words = str.split(" ").reverse();
    return words.join(" ");
}

// console.log(reverseSentence("hello world I."));

const MIN_INT = Math.pow(2, 31);
const MAX_INT = MIN_INT - 1;

function isSymbol(c) {
    return (c === '-' || c === '+');
}

function isNumber(c) {
    return (c >= '0' && c <= '9');
}



/**
 * String转Int
 * @param {String} str 
 */
var myAtoi1 = function (str) {
    const length = str.length;
    let firstNotEmptyIndex = 0;
    //寻找第一个不为空的字符
    while (firstNotEmptyIndex < length && str[firstNotEmptyIndex] === ' ') {
        firstNotEmptyIndex++;
    }

    //如果第一个字符即不为数字也不为符号
    if (!isNumber(str[firstNotEmptyIndex]) && !isSymbol(str[firstNotEmptyIndex])) {
        return 0;
    }

    //如果是符号判断正负
    let positive = true;
    if (isSymbol(str[firstNotEmptyIndex])) {
        positive = str[firstNotEmptyIndex] === '+';
        firstNotEmptyIndex++;
    }

    //除符号位外如果第一位不是数字
    if (!isNumber(str[firstNotEmptyIndex])) {
        return 0;
    }

    //确定数字边界
    let endIndex = firstNotEmptyIndex;
    while (firstNotEmptyIndex < length && isNumber(str[endIndex + 1])) {
        endIndex++;
    }

    //计算数字大小
    let res = 0;
    for (let i = firstNotEmptyIndex; i <= endIndex; i++) {
        res = res * 10 + (str[i] - '0');

        if (positive && res > MAX_INT) {
            return MAX_INT;
        }
        if (!positive && res > MIN_INT)
            return -1 * MIN_INT;
    }

    //其它
    return positive ? res : -1 * res;
}


/**
 * 
 * @param {String} str 
 */
var myAtoi2 = function (str) {
    return Math.max(Math.min(parseInt(str) || 0, MAX_INT), -1 * MIN_INT)
}
// console.log(myAtoi("42"));

// var Node = function (value, next=null, sibling=null) {
//     this.value = value;
//     this.next = next;
//     this.sibling=sibling;
// }

// /**
//  * 复杂链表的复制
//  * @param {Node} head 
//  */
// function cloneComplexNodes(head) {
//     if(!head){
//         return null;
//     }
//     const map=new Map();

//     let copyHead=new Node(head.value),//复制的头结点
//     nowNode=head.next,//被复制的操作节点
//     copyNode=copyHead;//复制链的当前节点
//     map.set(head,copyHead);

//     // 第一次遍历
//     while(nowNode){
//         copyNode.next=new Node(nowNode.value);
//         copyNode=copyNode.next;
//         map.set(nowNode,copyNode);
//         nowNode = nowNode.next;
//     }

//     // 第二次遍历
//     nowNode=head;
//     while (nowNode) {
//         map.get(nowNode)&&(map.get(nowNode).sibling=map.get(nowNode.sibling))
//         nowNode=nowNode.next;
//     }
//     return copyHead;
// }

// /**
//  * 测试代码
//  */
// const node1 = new Node("a"),
//     node2 = new Node("b"),
//     node3 = new Node("c"),
//     node4 = new Node("d");

// node1.next = node2;
// node2.next = node3;
// node3.next = node4;

// node1.sibling = node3;
// node4.sibling = node2;

// let copyNode = cloneComplexNodes(node1);
// while (copyNode) {
//     console.log(copyNode);
//     copyNode = copyNode.next;
// }

var Node = function (value, next = null) {
    this.value = value;
    this.next = next;
}

/**
 * 寻找链表的第一个公公节点(栈实现)
 * @param {Node} list1 
 * @param {Node} list2 
 */
function findSameNode1(list1, list2) {
    let stack1 = [], stack2 = [];

    let node = list1;
    while (node) {
        stack1.push(node);
        node = node.next;
    }

    node = list2;

    while (node) {
        stack2.push(node);
        node = node.next;
    }

    while (stack1.length && stack2.length) {
        let top1 = stack1.pop(),
            top2 = stack2.pop();
        if (top1 === top2) {
            node = top1;
        } else {
            break;
        }
    }
    return node;
}

/**
 * 查找链表第一个公共节点(快慢指针)
 * @param {Node} list1 
 * @param {Node} list2 
 */
function findSameNode2(list1, list2) {
    let length1 = 0, length2 = length1;
    let node = list1;
    while (node) {
        length1++;
        node = node.next;
    }
    node = list2;
    while (node) {
        length2++;
        node = node.next;
    }
    let diff = Math.abs(length1 - length2);
    let longList = null, shortList = null;
    if (length1 > length2) {
        longList = list1;
        shortList = list2;
    } else {
        longList = list2;
        shortList = list1;
    }

    while (diff) {
        longList = longList.next;
        diff--;
    }

    while (longList && shortList) {
        if (longList === shortList) {
            return longList;
        } else {
            longList = longList.next;
            shortList = shortList.next;
        }
    }
    return null;

}

const node3 = new Node(3, new Node(4, null));
const list1 = new Node(1, new Node(2, new Node(3, node3)));
const list2 = new Node(5, new Node(5, new Node(6, node3)));

// console.log(findSameNode1(list1,list2));
// console.log(findSameNode2(list1,list2));


/**
 * 查找二维数组中是否存在某个值
 * @param {Array} arr 
 * @param {Number} elem 
 */
function findElement(arr, elem) {
    const rows = arr.length;
    const columns = arr[0].length;
    let i = rows - 1, j = 0;
    while (i >= 0 && j < columns) {
        count++;
        if (arr[i][j] === elem) {
            return true;
        }
        if (arr[i][j] < elem) {
            ++j;
        } else {
            --i;
        }
    }
    return false;
}
// const arr = [[1, 2, 8, 9], [2, 4, 9, 12], [4, 7, 10, 13], [6, 8, 11, 15]];
// console.log(findElement(arr,1));

/**
 * 交换数组两个数的值
 * @param {Array} arr 
 * @param {Number} i 
 * @param {Number} j 
 */
// const swap = (arr, i, j) => {
//     [arr[i], arr[j]] = [arr[j], arr[i]]
// }

/**
 * 判断是否奇数
 * @param {Number} num 带判断数字 
 */
const isOdd = num => {
   return (num & 1) === 1
}

/**
 * 将符合条件的额放在数组前面
 * @param {Array} arr 待操作数组
 * @param {Function} compareFn 判断条件
 * @return {Array}
 */
function change(array, compareFn) {
    let arr = [...array];
    let length = arr.length;

    let i = 0, j = length - 1;

    while (i < j) {
        while (i < length && compareFn(arr[i])) {
            i++;
        }
        while (j >= 0 && !compareFn(arr[j])) {
            j--;
        }
        if (i < j) {
            swap(arr, i, j);
            i++;
            j--;
        }
    }
    return arr;
}

// console.log(change([1, 2, 3, 4, 5], isOdd));

/**
 * 数组组成最小的数
 * @param {Array} array
 */
function findMinNumber(array) {
    array.sort((x,y)=>{
        const n1=x+''+y;
        const n2=y+''+x;
        return n1-n2;
    })

    return array.join('');
}

console.log(findMinNumber([3,2,2,33,1]));