## 构建书籍
```npm
gitbook build
```
## 如果gh-pages不存在
```js
git checkout --orphan gh-pages //创建并切换新分支
git rm --cached -r .//将暂存区里面的文件移除暂存区
git clean -df //删除当前目录下没有被track(跟踪)过的文件和文件 .gitignore中的文件除外

echo "_book" >> .gitignore //忽略指定目录
git add .gitignore
git commit -m "Ignore some files"
```
## 如果gh-pages存在
```js
git checkout gh-pages //切换到目标分支
git merge master --allow-unrelated-histories
git rm --cached -r .//将暂存区里面的文件移除暂存区
git clean -df //删除当前目录下没有被track(跟踪)过的文件和文件 .gitignore中的文件除外
echo "_book" >> .gitignore //忽略指定目录
```
## 加入 _book 下的内容到分支中
```npm
cp -r _book/* . 将_book中所有文件复制与目录到根目录_(.)
git add .
git commit -m "Publish book"
```
