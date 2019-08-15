# JavaScript实现归并排序
## 参考文章
>[归并排序就这么简单](https://juejin.im/post/5ab4c7566fb9a028cb2d9126#heading-0)---文章通俗易懂,加深理解

## 过程描述
>归并过程为：比较a[i]和b[j]的大小，若a[i]≤b[j]，则将第一个有序表中的元素a[i]复制到r[k]中，并令i和k分别加上1；否则将第二个有序表中的元素b[j]复制到r[k]中，并令j和k分别加上1，如此循环下去，直到其中一个有序表取完，然后再将另一个有序表中剩余的元素复制到r中从下标k到下标t的单元。归并排序的算法我们通常用递归实现，先把待排序区间[s,t]以中点二分，接着把左边子区间排序，再把右边子区间排序，最后把左区间和右区间用一次归并操作合并成有序的区间[s,t]。

## 代码实现
### 根据参考文章,仅做语言上的修改变更,后文有代码简化版
```js
/**
 * 归并排序
 * @param {Array} arrays 
 * @param {Number} L 数组第一个元素
 * @param {Number} R 数组最后一个元素
 */
function mergeSort(arrays, l, r) {
    if (l === r) {
        return;
    } else {
        // 取中间的数,进行拆分
        const m = Math.floor((l + r) / 2);

        //左边不断进行拆分
        mergeSort(arrays, l, m);
        //右边不断进行拆分
        mergeSort(arrays, m + 1, r);
        //合并
        merge(arrays, l, m + 1, r);

    }
}


/**
 * 合并数组
 * @param {Array} arrays 
 * @param {Number} l 数组第一个元素
 * @param {Number} m 数组分割元素
 * @param {Number} r 数组最后一个元素
 */
function merge(arrays, l, m, r) {
    let leftArr = new Array(m - l),//左边数组大小
        rightArr = new Array(r - m + 1);//右边数组大小

    //往数组中填充数据
    for (let i = l; i < m; i++) {
        leftArr[i - l] = arrays[i];
    }
    for (let i = m; i <= r; i++) {
        rightArr[i - m] = arrays[i];
    }

    let i = 0, j = 0, k = l;

    //比较这两个数组的值,哪个小就往数组上放
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] < rightArr[j]) {
            arrays[k] = leftArr[i];
            k++;
            i++;
        } else {
            arrays[k] = rightArr[j];
            k++;
            j++;
        }
    }

    //如果左边的数组没读完,那么把剩余的都直接填充到后面
    while (i < leftArr.length) {
        arrays[k] = leftArr[i];
        k++;
        i++;
    }

    // //如果右边的数组没读完,那么把剩余的直接填充都后面
    while (j < rightArr.length) {
        arrays[k] = rightArr[j];
        k++;
        j++;
    }
}

//测试demo
let originArr = [9, 2, 5, 1, 3, 2, 9, 5, 2, 1, 8];
mergeSort(originArr, 0, originArr.length - 1);
console.log(originArr);//[1, 1, 2, 2, 2, 3, 5, 5, 8, 9, 9]
```

## 简化代码的实现
```js
/**
 * 归并排序
 * @param {Array} arrays 
 * @param {Number} L 数组第一个元素
 * @param {Number} R 数组最后一个元素
 */
function mergeSort(arrays, l, r) {
    if (l === r) {
        return;
    } else {
        // 取中间的数,进行拆分
        const m = Math.floor((l + r) / 2);
        //左边不断进行拆分
        mergeSort(arrays, l, m);
        //右边不断进行拆分
        mergeSort(arrays, m + 1, r);
        //合并
        merge(arrays, l, m + 1, r);
    }
}


/**
 * 合并数组
 * @param {Array} arrays 
 * @param {Number} l 数组第一个元素
 * @param {Number} m 数组分割元素
 * @param {Number} r 数组最后一个元素
 */
function merge(arrays, l, m, r) {
    let leftArr = arrays.slice(l, m),//左边数组
        rightArr = arrays.slice(m, r + 1);//右边数组

    let i = 0, j = 0, k = l;

    //比较这两个数组的值,哪个小就往数组上放
    while (i < leftArr.length && j < rightArr.length) {
        arrays[k++] = leftArr[i] < rightArr[j] ? leftArr[i++] : rightArr[j++];
    }

    //如果左边的数组没读完,那么把剩余的都直接填充到后面
    while (i < leftArr.length) {
        arrays[k++] = leftArr[i++];
    }

    //如果右边的数组没读完,那么把剩余的直接填充都后面
    while (j < rightArr.length) {
        arrays[k++] = rightArr[j++];
    }
}
let originArr = [9, 2, 5, 1, 3, 2, 9, 5, 2, 1, 8];
mergeSort(originArr, 0, originArr.length - 1);
console.log(originArr);

```