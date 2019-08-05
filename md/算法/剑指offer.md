# 1.空格替换
* 正则表达式替换
  ```js
    function replaceEmpty(str) {
            const r=/ /g;
            return str.replace(r,'%20');
    }
  ```
* 其它方法
  ```js
  function replaceEmpty2(str) {
    var res="";
    for(var i=0;i<str.length;i++){
        const t=str.charAt(i);
        if(t===' '){
            res+="%20"
        }else{
            res+=t;
        }
    }
    return res;
    }
  ```
# 2.字符串全排列
* 解法1
  ```js
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

    prem("abc".split(''), 0);
  ```
# Atoi
* 平民解法
  ```js
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
    var myAtoi = function (str) {
        const length = str.length;
        let firstNotEmptyIndex = 0;
        //寻找第一个不为空的字符
        while (firstNotEmptyIndex < length && str   [firstNotEmptyIndex] === ' ') {
            firstNotEmptyIndex++;
        }

        //如果第一个字符即不为数字也不为符号
        if (!isNumber(str[firstNotEmptyIndex]) && !isSymbol (str[firstNotEmptyIndex])) {
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
        while (firstNotEmptyIndex < length && isNumber(str  [endIndex + 1])) {
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
    ```
* 极简解法
  ```js
  var myAtoi2 = function (str) {
    return Math.max(Math.min(parseInt(str) || 0, MAX_INT), -1 * MIN_INT)
    }
  ```
# 旋转数组
* 解法1
  ```js
  
  ```

# 链表
## 逆序打印链表
```js
var Node = function (value, next) {
    this.value = value;
    this.next = next;
}

var List = function () {
    this.head = new Node(null, null);

    this.prev=this.head;
    /**
     * 头插法
     */
    this.insertHead = function (value) {
        const next = new Node(value, this.prev.next);
        this.prev.next = next;
    }

}

/**
 * 逆序打印
 * @param {Node} node 
 */
function reversePrint(node) {
    if (node.next) {
        reversePrint(node.next);
    }
    node.value && console.log(node.value);
}

/**
 * 顺序打印
 * @param {Node} node 
 */
function Print(node) {
    while (node) {
        node.value && console.log(node.value);
        node = node.next;
    }
}

let list = new List();
list.insertHead("abc");
list.insertHead("bcd");
list.insertHead("sds");

reversePrint(list.head);

var List = function () {
    this.head = new Node(null, null);

    this.Tail=function () {
        let current=this.head;
        while (current.next) {
            current=current.next;
        }
        return current;
    }
    /**
     * 尾插法
     */
    this.insertTail = function (value) {
        const prev=this.Tail();
        const next = new Node(value, prev.next);
        prev.next = next;
    }
}
```

## 快速删除链表结点($O(1)$)
```js
/**
 * 快速删除指定节点
 * @param {Node} head 
 * @param {Node} delNode 
 */
function deleteNode(head, delNode) {
    if (head === delNode || !head || !delNode)
        return;
    let nextNode=delNode.next;
    if(!nextNode){
        let tNode=head;
        while (tNode.next!==delNode){
            tNode = tNode.next;
        }
        tNode.next=null;
        delNode=null;
    }else{
        delNode.value = nextNode.value;
        delNode.next = nextNode.next;
        nextNode=null;
    }
}

let node3 = new Node(3, null),
    node2 = new Node(2, node3),
    node1 = new Node(1, node2),
    head = new Node(null, node1);

deleteNode(head, node2);
let node = head.next;
while (node) {
    console.log(node.value);
    node = node.next;
}
```

## 输出倒数第k个节点
### 解法1
```js
/**
 * 输出倒数第k个节点
 * @param {Node} head 
 * @param {Number} k 
 */
function findReverseByIndex_1(head,k) {
    let length=0;
    let p=head.next;
    while(p){
        length++;
        p=p.next;
    }
    let i=length-k;
    p=head.next;
    while(i){
        p=p.next;
        i--;
    }
    return p;
}
```

### 解法2
```js
function findReverseByIndex_2(head,k) {
    let p=head.next,q=head.next;
    let i=k;
    while(i){
        q=q.next;
        i--;
    }
    while(q){
        p=p.next;
        q=q.next;
    }
    return p;
}
```
## 链表转置
### 解法1
```js
/**
 * 转置链表
 * @param {Node} head 
 */
function reverseList(head) {
    if (!head || !head.next) {
        return head;
    }
    var pRev=null;
    var pCur=head;
    while(pCur){
        var pTemp=pCur;
        pCur=pCur.next;
        pTemp.next=pRev;
        pRev=pTemp;
    }
    return pRev;
}

head=reverseList(head);
```
### 解法2
```js
/**
 * 链表转置
 * @param {Node} head 
 */
function reverseList2(head) {
    if (!head || !head.next) {
        return head;
    }

    var node = head, pre = null;

    while(node){
        let next=node.next;
        node.next=pre;
        pre=node;
        node=next;
    }
    return pre;
}
```