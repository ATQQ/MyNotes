function render(){
    // 标签标题
    document.title = 'O(∩_∩)O哈哈~'

    const data = ['a','b','c','d']
    const $ul = document.querySelector('#list1')
    const $ol = document.querySelector('.list2')

    // 渲染无序列表
    data.forEach(function(v){
        const $li = document.createElement('li')
        $li.textContent = v
        $ul.append($li)
    })
    // 设置title1
    $ul.previousElementSibling.textContent = '无序列表'

    // 渲染有序列表
    data.forEach(function(v){
        const $li = document.createElement('li')
        $li.textContent = v
        $ol.append($li)
    })
    // 设置title2
    $ol.previousElementSibling.textContent = '有序列表'
}

render()