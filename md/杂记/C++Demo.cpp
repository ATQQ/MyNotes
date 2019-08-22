//大小写转换
#include <stdio.h>
#include<iostream>
/*
 * 大小写转换
 *@param str {char *} 待转换的字符串
 */
void toggleCase(char *str)
{
    
    int i = 0;
    while (str[i] != '\0') //当前字符不为结束符时
    {
        //如果为大写
        if (str[i] >= 'A' && str[i] <= 'Z')
        {
            str[i] += 32; //转为小写
        }
        //如果为小写
        else if (str[i] >= 'a' && str[i] <= 'z')
        {
            str[i] -= 32; //转为大写
        }
        i++;
    }
}

int main()
{
    char str[] = "abcdeFGHIJ"; //待转换字符串
    toggleCase(str);
    printf("%s", str); //向屏幕打印输出结果
}

