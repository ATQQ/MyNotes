/*===============================================================
*   Copyright (C) 2021 All rights reserved.
*   
*   文件名称：client.c
*   创 建 者：weilin
*   创建日期：2021年03月25日
*   描    述：
*
*   更新日志：
*
================================================================*/
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <strings.h>
#include <sys/types.h> /* See NOTES */
#include <sys/socket.h>
#include <arpa/inet.h>

int main()
{
	int sockfd;
	sockfd = socket(AF_INET, SOCK_STREAM, 0);
	if (sockfd == -1)
	{
		perror("socket:");
		return -1;
	}

	struct sockaddr_in addr;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(7777);
	addr.sin_addr.s_addr = inet_addr("0.0.0.0");

	if (-1 == connect(sockfd, (struct sockaddr *)&addr, sizeof(addr)))
	{
		perror("connect:");
		return -1;
	}

	printf("connect a server\n");

	while (1)
	{
		/*从终端获取一个文件名*/

		/*发送给服务器*/

		/*打开一个新的文件*/

		/*循环从服务器读取信息，并且写入到文件中*/
	}

	return 0;
}
