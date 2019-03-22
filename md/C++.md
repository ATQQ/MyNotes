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