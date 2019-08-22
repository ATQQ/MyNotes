### C++相关
* 查找
    >[参考文档](https://blog.csdn.net/qq_40160605/article/details/80150252)
    ```C++
    include<algorithm>
    //二分查找
    lower_bound(arrayfirst,arraylast,key);//返回第一个大于等于key的   地址
    upper_bound(arrayfirst,arraylast,key);//返回第一个大于key的位置
    //demo
    int a[10];
    int n=10;
    lower_bound(a,a+n,1);
    ```

* 排序
    >[参考文档](https://wenku.baidu.com/view/c782c0a92cc58bd63086bd5d.html)
  ```C++
  include<algorithm>
  //sort函数
  sort(start,end,method);//method可以省略默认从小到大

  //demo
  int a[10];
  sort(a,a+10);

  //method规则
  less<type>();//从小到大
  greater<type>();//从大到小
  ``

* 集合容器set
    >[参考文档](https://blog.csdn.net/wangran51/article/details/8836160)
    ```c++
    #include<set>
    set<type>;
    set.insert(value);//插入
    set.erase(value);//删除
    set.clear();//清空
    set.find(value);//查找
    set.end();//最后一个后的位置
    //特性 每一个值唯一
    //便利方法 使用迭代器
    set<string> ans;
    //**************
    for(set<type>::iterator iter=ans.begin();iter!=ans.end();iter++){
        cout<<*iter<<endl;
    }
    ```