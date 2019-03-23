## 蓝桥杯练习
* [入门](http://lx.lanqiao.cn/problemset.page?code=BEGIN-&userid=236677)
  
1. 斐波拉切数列
   ```c++
    #include <iostream>
    using namespace std;
    //递归求法
    int fun(int n){
    	if (n==1||n==2)
    	return 1;
    	else
    	return fun(n-1)+fun(n-2);
    }
    int main(int argc, char *argv[]) {
    	int n,m;
    	int a,b;
    	int c=1;
    	a=b=1;
    	cin>>n;
    	m=n;
         //迭代

    	while(n>2){
    		c=(a+b)%10007;
    		n--;
    		a=b;
    		b=c;
    	}

    	cout<<c<<endl;
    
    	return 0;
    }
     ```
    
2. 圆面积
   ```c++
   #include <iostream>
    #include<iomanip>
    using namespace std;
   
    const double PI=3.14159265358979323; 

    int main(int argc, char *argv[]) {
    
    	int r;
    	cin>>r;
    	cout<<setprecision(7)<<fixed<<r*r*PI<<endl;
    	return 0;
    }
     ```

3. 求和
   ```C++
   #include <iostream>
    #include<iomanip>
    using namespace std;
    typedef long long LL;

    int main(int argc, char *argv[]) {
    	LL n;
    	cin>>n;
    	LL sum=0;
    	sum=(n*(n+1))/2;
    	cout<<sum<<endl;
    	return 0;
    }
   ```

* [基础练习](http://lx.lanqiao.cn/problemsets.page)

1. 排序
   ```C++
   #include <iostream>
    # include<algorithm>
    using namespace std;
    /*typedef long long LL;*/

    int main(int argc, char *argv[]) {
    	int n;
    	cin>>n;
    	int *a=new int[n];
    	for(int i=0;i<n;i++)
    	cin>>a[i];
    	sort(a,a+n,less<int>());
    		for(int i=0;i<n;i++)
    		cout<<a[i]<<ends;
    	return 0;
    }
   ```

2. 16进制转8进制
    ```c++
    #include <iostream>
    #include <algorithm>
    #include <cstring>
    using namespace std;
    /*typedef long long LL;*/
    //16进制转8进制 
    string convert(string str)
    {
        string res = "";
        for (int i = 0; i < str.length(); i++)
        {
        //	cout<<str[i]<<endl;
            switch (str[i])
            {
            case '0':
                res += "0000";
                break;
            case '1':
                res += "0001";
                break;
            case '2':
                res += "0010";
                break;
            case '3':
                res += "0011";
                break;
            case '4':
                res += "0100";
                break;
            case '5':
                res += "0101";
                break;
            case '6':
                res += "0110";
                break;
            case '7':
                res += "0111";
                break;
            case '8':
                res += "1000";
                break;
            case '9':
                res += "1001";
                break;
            case 'A':
                res += "1010";
                break;
            case 'B':
                res += "1011";
                break;
            case 'C':
                res += "1100";
                break;
            case 'D':
                res += "1101";
                break;
            case 'E':
                res += "1110";
                break;
            case 'F':
                res += "1111";
                break;
            }
            //cout<<res<<endl;
        }
        string res8="";
        for(int i=res.length()-3;i>0;i-=3){
        	string key=res.substr(i,3);
        	int temp=0;
        	int reskey=0;
        	for(int j=key.length()-1;j>=0;j--){
        		int t=key[j]-'0';
        		int tt=1;
        		for(int k=0;k<temp;k++){
        			tt*=2;
        		}
        		reskey+=t*tt;
        		temp++;
        	}
        	res8+=reskey+'0';
        }
            reverse(res8.begin(),res8.end());
        return res8;
    }
    
    int main(int argc, char *argv[])
    {
        int n;
        cin >> n;
        string *sarray = new string[n];
        for (int i = 0; i < n; i++)
            cin >> sarray[i];
        for (int i = 0; i < n; i++)
        {
            sarray[i] = convert(sarray[i]);
            cout << sarray[i]<<endl;
        }
    
        return 0;
    }
    ```


    * 特殊的回文数

    ```C++
    #include <iostream>
    #include <algorithm>
    #include <string>
    #include<sstream>
    using namespace std;

    bool ishuiwen(int num) {
    	if (num > 100000) {
    		int a, b;
    		a=num/1000;
    		b = num % 1000;
    		if (a / 100 == b % 10 && (a / 10) % 10 ==   (b / 10) % 10 && b / 100 == a % 10) {
    			return true;
    		}
    	}
    	else {
    		int a, b;
    		a = num / 1000;
    		b = num % 100;
    		if (a / 10 == b % 10 && a % 10 == b / 10)   {
    			return true;
    		}
    	}
    	return false;
    }

    int getSum(int num) {
    	int sum=0;
    	while (num!=0)
    	{
    		sum += (num % 10);
    		num /= 10;
    	}
    	return sum;
    }
    int main(int argc, char *argv[])
    {
    	int n;
    	cin >> n;
    	for (int i = 10000; i<999999; i++) {
    		if (ishuiwen(i)&&getSum(i)==n) {	
    			cout << i << endl;
    		}
    	}
    	return 0;
    }

     ```

* 01字串
  
  ```c++
  #include <iostream>
    #include <algorithm>
    #include <string>
    using namespace std;

    int main(int argc, char *argv[])
    {

    	for(int i=0;i<2;i++){
        
    		for(int j=0;j<2;j++){
            
    			for(int k=0;k<2;k++){
    				for(int l=0;l<2;l++){
    					for(int m=0;m<2;m++){
    						cout<<i<<j<<k<<l<<m<<endl;
    					}
    				}
    			}
    		}		
    	}
    	return 0;
    }

  ```

* 等差素数列

    ```c++
    #include <iostream>
    #include <algorithm>
    #include<set>
    using namespace std;
    typedef long long LL; 
    const int N=500;
    set<int> all;
    //判断素数 
    bool isPrime(LL num){
    	for(LL i=2;i<=num/2;i++){
    		if(num%i==0)
    		return false;
    	} 
    	return true;
    }

    //查找结果
    LL find(LL a[],int n){
    	for(int i=0;i<n;i++){
    		int first=a[i];//10个中的首项 
    		for(LL j=1;j<a[n-1]-first;j++){//j为公差 
    			int temp=first;
    			for(int k=1;k<10;k++){
    				temp+=j;//每一项加公差判断是否在其中 
    				if(all.find(temp)==all.end())
    				break;
    				if(temp>a[n-1])
    				break;
    				if(k==9)
    				return j;
    			}
    
    		}
    	}
    	return -1;
    }
    int main(int argc, char *argv[])
    {
    	LL a[N];
    	 int index=2;
    	 a[0]=2;
    	 a[1]=3;
    	 all.insert(2);
    	 all.insert(3);
    	 LL tnum=5;
    	 while(index<N){
    	 	if(isPrime(tnum)){
    	 		a[index++]=tnum;
    	 		all.insert(tnum);
    	 	}
    	 	tnum++;
    	 }
    	cout<<find(a,500);
    	return 0;
    }

    ```

* 承压计算
  ```c++

  
  ```

* 分巧克力
  ```C++
  //暴力枚举
  #include <iostream>
  #include <algorithm>
  #include<stdio.h>
  
  using namespace std;
  typedef long long LL; 
  
  int main(int argc, char *argv[])
  {
  	int N,K;
  	cin>>N>>K;
  	int *w=new int[N];
  	int *h=new int[N];
  	for(int i=0;i<N;i++){
  		cin>>w[i]>>h[i];
  	}
  	
  	int len=10000;
  	
  	while(len>0){
  	int ans=0;
  	for(int i=0;i<N;i++)
  		ans+=(w[i]/len)*(h[i]/len);
  		if(ans>K)
  		break;
  		len--;	
  	}	
  	cout<<len<<endl;
  	return 0;
  }

  ```
  ```C++
  //二分枚举
    #include <iostream>
    #include <algorithm>
    #include<stdio.h>

    using namespace std;

    int main(int argc, char *argv[])
    {
    	int N,K;
    	cin>>N>>K;
    	int *w=new int[N];
    	int *h=new int[N];
    	for(int i=0;i<N;i++){
    		cin>>w[i]>>h[i];
    	}

    	int l=1;
    	int r=10001;
    	int mid=0;
    	int res=0;
    	while(l<=r){
    		int ans=0;
    		mid=(r+l)/2;
    		for(int i=0;i<N;i++)
    			ans+=(w[i]/mid)*(h[i]/mid);
    
    		if(ans>=K){
    			l=mid+1;
    			res=mid;			
    		}
    		else{
    			r=mid-1;			
    		}
    
    	}	
    	cout<<res<<endl;
    	return 0;
    }

  ```

* K倍区间
```C++
//宝丽美剧
#include <iostream>
#include <algorithm>
#include<stdio.h>

using namespace std;

int main(int argc, char *argv[])
{
	int n,k;
	cin>>n>>k;
	int *a=new int[n];
	for(int i=0;i<n;i++)
		cin>>a[i];
	int count=0;
	for(int i=0;i<n;i++){
		int sum=0;
		for(int j=i;j<n;j++){
			sum+=a[j];
			if(sum%k==0){
				count++;
			}
		}
	} 
	cout<<count<<endl;
	return 0;
}

```
```c++
//前缀和
#include <iostream>
#include <algorithm>

using namespace std;
typedef long long LL;
int main(int argc, char *argv[])
{
	int n,k;
	cin>>n>>k;
	int *a=new int[n];
	int *s=new int[n+1];
	int count=0;
	s[0]=0;
	for(int i=0;i<n;i++){
		cin>>a[i];
		s[i+1]=s[i]+a[i];
	}

	for(int i=1;i<=n;i++){
		for(int j=i;j<=n;j++){
			if((s[j]-s[i-1])%k==0)
			count++;
		}
	} 
	cout<<count<<endl;
	return 0;
}

```
```C++
//优化枚举
#include <iostream>
#include <algorithm>
#include<map>

using namespace std;
typedef long long LL;
map<int,int> cnt;
int main(int argc, char *argv[])
{
	int n,k;
	cin>>n>>k;
	int *a=new int[n];
	int *s=new int[n+1];
	LL count=0;
	cnt[0]=1;
	s[0]=0;
	for(int i=0;i<n;i++){
		cin>>a[i];
		s[i+1]=(s[i]+a[i])%k;
		cnt[s[i+1]]++;
	}

	for(int i=0;i<k;i++){
		count+=(LL)cnt[i]*(cnt[i]-1)/2;
	} 
	cout<<count<<endl;
	return 0;
}
```

* 堆煤球
```c++
#include <iostream>
#include <algorithm>
#include<map>

using namespace std;
typedef long long LL;
int main(int argc, char *argv[])
{
	int sum=1;
	int i=1;
	int j=2;
	for(int k=2;k<=100;k++){
		i+=j;
		sum+=i;
		j++;
	}
	cout<<sum<<endl;
	return 0;
}

```
* 吹蜡烛
```C++
//暴力枚举
#include <iostream>
#include <algorithm>
#include<map>

using namespace std;
int main(int argc, char *argv[])
{
	for(int i=1;i<100;i++){
		int sum=0;
		for(int j=i;j<100;j++){
			sum+=j;
			if(sum==236){
				cout<<i<<endl;
				return 0;
			}
		}
	}
	return 0;
}

```
* 快排
```C++
#include <iostream>
#include <algorithm>
#include<map>
#include<cmath>
using namespace std;
void swap(int *a,int i, int j){
	int t=a[i];
	a[i]=a[j];
	a[j]=t;
}
int partition(int *a,int p,int r){
	int i=p;
	int j=r+1;
	int x=a[p];
	while(1){
		while(i<r&&a[++i]<x);
		while(a[--j]>x&&j>p);
		if(i>=j)
		break;
		swap(a,i,j);
	}
	swap(a,p,j);
	return j;
}
void quicksort(int *a,int p,int r){
	
	if(p<r){
		int q=partition(a,p,r);
		quicksort(a,p,q-1);
		quicksort(a,q+1,r);
	}
}

int main(int argc, char *argv[])
{ 
	int a[]={1,3,2,5,6,34,12,31,12,53};
	quicksort(a,0,9);
	for(int i=0;i<10;i++){
		cout<<a[i]<<ends;
	}
	return 0;
}

```
* 全排列
```C++
#include <iostream>
#include <algorithm>
#include<map>
#include<cmath>
using namespace std;

	int a[]={1,2,3,4,5,6,7,8,9,10};
	void print(){
		for(int i=0;i<10;i++){
			cout<<a[i]<<ends;
		}
		cout<<endl;
	}
int main(int argc, char *argv[])
{ 
	int ans=0;
	do{
		ans++;
		print();
	}while(next_permutation(a,a+10));
	return 0;
}
```
* 剪邮票
```C++
#include <iostream>
#include <algorithm>
#include<map>
#include<cmath>
using namespace std;
	
	void dfs(int m[3][4],int i,int j){
		m[i][j]=0;
		if(i-1>=0&&m[i-1][j]==1)dfs(m,i-1,j);
		if(i+1<=2&&m[i+1][j]==1)dfs(m,i+1,j);
		if(j-1>=0&&m[i][j-1]==1)dfs(m,i,j-1);
		if(j+1<=3&&m[i][j+1]==1)dfs(m,i,j+1);
	}
	
	bool check(int *a){
		int g[3][4];
		for(int i=0;i<3;i++){
			for(int j=0;j<4;j++){
				g[i][j]=a[i*4+j];
			}
		}
		int count=0; 
		for(int i=0;i<3;i++){
			for(int j=0;j<4;j++){
				if(g[i][j]==1){
					//连通性检查 
					dfs(g,i,j);
					count++;
				}		
			}
		}
		return count==1;
	}
int main(int argc, char *argv[])
{ 
	int a[]={0,0,0,0,0,0,0,1,1,1,1,1};
	int ans=0;
	do{
		if(check(a)){
		ans++;
		} 
	}while(next_permutation(a,a+12));
	cout<<ans<<endl;
	return 0;
}

```
* 四平方和
```C++
#include <iostream>
#include <algorithm>
#include<map>
#include<cmath>
using namespace std;
	
	
int main(int argc, char *argv[])
{ 
	int n;
	cin>>n;
	map<int,int> cache;
	for(int c=0;c*c<=n/2;c++){
		for(int d=c;c*c+d*d<=n;d++){
			if(cache.find(c*c+d*d)==cache.end()){
				cache[c*c+d*d]=c;
			}
		}
	}
	for(int a=0;a*a<=n/4;a++){
		for(int b=a;a*a+b*b<=n/3;b++){
			if(cache.find(n-a*a-b*b)!=cache.end()){
				int c=cache[n-a*a-b*b];
				int d=(int)sqrt(n-a*a-b*b-c*c);
				cout<<a<<ends<<b<<ends<<c<<ends<<d<<endl;
				return 0; 
			}

		}
	}
	return 0;
}

```

* 交换瓶子
```C++
#include <iostream>
#include <algorithm>
#include<map>
#include<cmath>
using namespace std;
	
		int n;
		int a[10001];
void swap(int i,int j){
	int t=a[i];
	a[i]=a[j];
	a[j]=t;
}
int pos(int x){
for(int i=1;i<=n;i++){
		if(x==a[i])
		return i;
	}
	return -1;
}

int main(int argc, char *argv[])
{ 

	cin>>n;
	int ans=0;
	for(int i=1;i<=n;i++){
		cin>>a[i];
	}
	
	for(int i=1;i<=n;i++){
		if(a[i]==i)
		continue;
		else{
			swap(pos(i),i);
			ans++;
		}
	}
	cout<<ans<<endl;
	return 0;
}

```
