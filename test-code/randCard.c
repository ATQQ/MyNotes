#include <stdio.h>
#include <time.h>
int main()
{
    srand((unsigned)time(0));
    int arr[52] = {0};
    char type[4] = {'b', 'r', 'f', 'h'}; // 分别代表♠,♥,♦,♣
    int i = 0;
    int temp;
    while (i < 52)
    {
        temp = rand() % 52;
        if (arr[temp] == 0)
        {
            printf("%c", type[temp % 4]);
            printf("%d\n", temp % 13 + 1);
            arr[temp] = 1;
            i++;
        }
    }

    return 0;
}