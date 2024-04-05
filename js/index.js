
// 页面容器 container
const container = document.getElementById('container')
const cardList = document.getElementById('cardList')
// 分页条 pageBar
const pageBar = document.getElementById('pageBar')
// 加载页面 onload
const onload = document.getElementById('onload')
const load_text = document.getElementById('load_text')


// 主页搜索按钮 search_btn
const search_btn = document.getElementById('search_btn')
// 主页搜索框 search_btn
const searchText = document.getElementById('searchText')

// 主页 分类名称 默认为：最近更新
const showBar = document.getElementById('showBar')

// 主页 最近资源
const latestResource = document.getElementById('latestResource')
// 主页 精品资源
const niceResource = document.getElementById('niceResource')
// 主页 热门资源
const fireResource = document.getElementById('fireResource')
// 主页 获取更多最近
const getMoreLatest = document.getElementById('getMoreLatest')
// 主页 获取更多精品
const getMoreNice = document.getElementById('getMoreNice')
// 主页 获取更多热门
const getMorefire = document.getElementById('getMorefire')


// 主页 hideMain
const hideMain = document.getElementById('hideMain')

// 主页 页脚数目
const cardsNum = document.getElementById('cardsNum')


getMoreLatest.addEventListener('click',() => {
    // 展示最近更新
    hideMain.style.display = 'block'
    latestResource.style.display = 'none'
    niceResource.style.display = 'none'
    fireResource.style.display = 'none'
    // 滚动到顶部
    container.scrollTo(0, 0);
})
getMoreNice.addEventListener('click',() => {
    document.location.href = '/html/classify.html?classify=精品游戏';
})
getMorefire.addEventListener('click',() => {
    document.location.href = '/html/classify.html?classify=热门游戏';
})

// 格式化日期
function formatDate(str) {
    var today = new Date(+str);
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
 
    // 将月份和日期格式化为两位数
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
 
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
 };



// 所有内容
let allCards = []
// 当前分类的内容
let currentClassifyCards = []
// 当前页面展示的内容
let currentShowCards = []
// 每页最多展示个数
const perPageNum = 20
// 当前是第几页
let currentPageNum = 1
// 总共多少页
let totalPages

var url = "../data/webCards.json"
// 申明一个XMLHttpRequest
var request = new XMLHttpRequest();
// 设置请求方法与路径
request.open("get", url);
// 不发送数据到服务器
request.send(null);
//XHR对象获取到返回信息后执行
request.onload = function () {
    // 修改 load_text 的文字
    load_text.innerHTML = '正在进入'

    // 解析获取到的数据
    var cards1 = JSON.parse(request.responseText);
    var cards = []
    

    // 清除 null
    cards1.forEach(item=>{
        if(item!=null){
            cards.push(item)
        }
    })

    cardsNum.innerHTML = cards.length

    allCards = cards

    // 判断该展示的内容
    // 解析 URL 中的参数
    var urlParams = new URLSearchParams(window.location.search);
    var classifyValue = urlParams.get('classify');
    if(classifyValue!=null){
        getCurrentClassifyCards(classifyValue)
        currentPageNum = 1
        showThis(getCurrentShowCards(currentPageNum))
        // 滚动到页面顶部
        container.scrollTo(0, 0);
        // onload.style.display = 'none'

    }else{
        getCurrentClassifyCards('全部')
        showThis(getCurrentShowCards(currentPageNum))
        // 隐藏onload
        // onload.style.display = 'none'
    }
    // 搜索内容
    var searchText = urlParams.get('search');
    if(searchText!=null){
        searchCardAndShow(searchText)
    }

    
}



const showThis = (cards) => {
    cardList.innerHTML = ''
    cards.forEach((card,index) => {

    // 创建 card
        var card1 = document.createElement('div');
        card1.className = 'card'
        // 添加点击事件
        card1.addEventListener('click',() => {
            cardClick(card)
        })
    // 创建 cover
        var cover = document.createElement('div');
        cover.className = 'cover'
    // 创建 cover_img
        var cover_img = document.createElement('img')
        cover_img.src = card.cover;
        cover_img.alt = card.detail+"   该图片过于刺激🔞无法展示..."
        cover_img.className = 'cover_img'
        // 添加加载监听
        cover_img.addEventListener('load',() => {
            document.getElementById('cover_load_'+index).style.display = 'none'
        })
        cover_img.addEventListener('error',() => {
            document.getElementById('cover_load_'+index).style.display = 'none'
        })
        // 添加 cover_img 到 cover
        cover.appendChild(cover_img)
    // 创建 加载图标
        var cover_load = document.createElement('div');
        cover_load.className = 'cover_load'
        cover_load.id = 'cover_load_'+index
        // 添加到 cover
        cover.appendChild(cover_load)
    // 创建 msg
        var msg = document.createElement('div');
        msg.className = 'msg'
    // 创建 flag
        var flag = document.createElement('div');
        flag.className = 'flag'

    // 创建 cardConfig
        if(formatDate((new Date()).getTime()) == formatDate(card.time)){
            var cardConfig = document.createElement('span');
            cardConfig.className = 'cardConfig'
            cardConfig.innerHTML = '今日更新'
            // 添加到 flag
            flag.appendChild(cardConfig)
        }
            
        var classifies = card.classify.split('|')

            var cardConfig = document.createElement('span');
            cardConfig.className = 'cardConfigPink'
            cardConfig.innerHTML = classifies[0]
            cardConfig.addEventListener('click',(e) => {
                searchCardAndShowOnNewPage(classifies[0])
                e.stopPropagation()
            })
            flag.appendChild(cardConfig)

            if(card.classify.includes('神级大作')){
                var cardConfig = document.createElement('span');
                cardConfig.className = 'cardConfigFire'
                cardConfig.innerHTML = '神级大作'
                cardConfig.addEventListener('click',(e) => {
                    searchCardAndShowOnNewPage('神级大作')
                    e.stopPropagation()
                })
                flag.appendChild(cardConfig)
            }

            if(classifies.length >= 1){
                for(let i = 1; i < classifies.length; i++){
                    if(classifies[i] == '神级大作') continue;
                    var cardConfig = document.createElement('span');
                    cardConfig.className = 'cardConfigGreen'
                    cardConfig.innerHTML = classifies[i]
                    cardConfig.addEventListener('click',(e) => {
                        searchCardAndShowOnNewPage(classifies[i])
                        e.stopPropagation()
                    })
                    flag.appendChild(cardConfig)
                }
            }

        

        var cTitle = document.createElement('a');
        cTitle.className = 'cTitle'
        let ref = ''
        if(card.classify.includes('精品游戏')){
            ref = '../articles/精品游戏/'+card.id+'.html'
        }else if(card.classify.includes('热门游戏')){
            ref = '../articles/热门游戏/'+card.id+'.html'
        }else if(card.classify.includes('动漫漫画')){
            ref = '../articles/动漫漫画/'+card.id+'.html'
        }else if(card.classify.includes('小说图文')){
            ref = '../articles/小说图文/'+card.id+'.html'
        }else if(card.classify.includes('软件合集')){
            ref = '../articles/软件合集/'+card.id+'.html'
        }else{
            ref = '../articles/'+card.id+'.html'
        }
        cTitle.href = ref
        cTitle.innerHTML = card.detail

        var cTitleH = document.createElement('h2');
        cTitleH.className = 'cTitle'
        cTitleH.appendChild(cTitle)

    // 添加到 msg
        msg.appendChild(flag)
        msg.appendChild(cTitleH)
    // 添加到 card
        card1.appendChild(cover)
        card1.appendChild(msg)
    // 添加 card 到 cardList
        cardList.appendChild(card1)
    });
}

// 根据分类名获取当前分类所有card
const getCurrentClassifyCards = (classify) => {
    if(classify == '全部'){
        // 计算总页数
        totalPages = Math.ceil(allCards.length / perPageNum);
        currentClassifyCards = allCards
    }else{
        let cur = []
        allCards.forEach(card=>{
            if(card.classify != undefined && card.classify.includes(classify)){
                cur.push(card)
            }
        })
        // 计算总页数
        totalPages = Math.ceil(cur.length / perPageNum);
        currentClassifyCards = cur;
    }
}

// 根据目标页面获取当前应展示card
const getCurrentShowCards = (toPage) => {
    
     // 确保页数在有效范围内
     if (toPage < 1 || toPage > totalPages) {
        return [];
    }
    currentPageNum = toPage
    // 根据当前页面生成分页栏
    showPageBar(toPage)

    // 计算起始索引和结束索引
    const startIndex = (toPage - 1) * perPageNum;
    const endIndex = Math.min(startIndex + perPageNum, currentClassifyCards.length);

    // 获取指定页的数据并返回
    const pageData = currentClassifyCards.slice(startIndex, endIndex);
    
    // 滚动到页面顶部
    container.scrollTo(0, 0);
    return pageData;
}

// 根据目标页码生成分页栏
const showPageBar = (toPage) => {
    // 清空分页条 pageBar
    pageBar.innerHTML = ''
// 加载 上一页 按钮
    const upPage = document.createElement('div')
    upPage.className = 'pageItem'
    upPage.id = 'upPage'
    upPage.innerHTML = '上一页'
    // 添加点击事件
    upPage.addEventListener('click',() => {
        if(currentPageNum > 1){
            showThis(getCurrentShowCards(currentPageNum-1))
        }
    })
    // 添加到 分页条
    pageBar.appendChild(upPage)
    // 判断
    if(toPage <= 3){
    // 加载 前5页 按钮
        for(let i = 1; i <= Math.min(5,totalPages); i++){
            const firstPage = document.createElement('div')
            firstPage.className = 'pageItem'
            if(i == toPage){
                firstPage.className = 'pageItem pageItemActive'
            }
            firstPage.innerHTML = ''+i
            // 添加点击事件
            firstPage.addEventListener('click',() => {
                if(i == currentPageNum)return
                showThis(getCurrentShowCards(i))
            })
            // 添加到 分页条
            pageBar.appendChild(firstPage)
        }
        if(totalPages > 5){
            if(totalPages != 6){
            // 添加省略号
                const page = document.createElement('div')
                page.className = 'pageItem'
                page.innerHTML = '...'
                // 添加到 分页条
                pageBar.appendChild(page)
            }
        // 添加最后一列
            const LastPage = document.createElement('div')
            LastPage.className = 'pageItem'
            LastPage.innerHTML = ''+totalPages
            // 添加点击事件
            LastPage.addEventListener('click',() => {
                if(totalPages == currentPageNum)return
                showThis(getCurrentShowCards(totalPages))
            })
            // 添加到 分页条
            pageBar.appendChild(LastPage)
        }

    }else if(toPage >= totalPages - 2){
    // 加载 第一页 按钮
        const firstPage = document.createElement('div')
        firstPage.className = 'pageItem'
        firstPage.innerHTML = '1'
        // 添加点击事件
        firstPage.addEventListener('click',() => {
            if(1 == currentPageNum)return
            showThis(getCurrentShowCards(1))
        })
        // 添加到 分页条
        pageBar.appendChild(firstPage)
    // 添加省略号
        if(toPage - 5 > 1){
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 加载 末5页 按钮
        for(let i = Math.max(1,totalPages-4); i <= totalPages; i++){
            const thePage = document.createElement('div')
            thePage.className = 'pageItem'
            if(i == toPage){
                thePage.className = 'pageItem pageItemActive'
            }
            thePage.innerHTML = ''+i
            // 添加点击事件
            thePage.addEventListener('click',() => {
                if(i == currentPageNum)return
                showThis(getCurrentShowCards(i))
            })
            // 添加到 分页条
            pageBar.appendChild(thePage)
        }
    }else{
    // 加载 第一页 按钮
        const firstPage = document.createElement('div')
        firstPage.className = 'pageItem'
        firstPage.innerHTML = '1'
        // 添加点击事件
        firstPage.addEventListener('click',() => {
            if(1 == currentPageNum)return
            showThis(getCurrentShowCards(1))

        })
        // 添加到 分页条
        pageBar.appendChild(firstPage)
        if(toPage != 4){
        // 添加省略号
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 加载 中间五页 按钮
        for(let i = toPage-2; i <= toPage + 2; i++){
            const thePage = document.createElement('div')
            thePage.className = 'pageItem'
            if(i == toPage){
                thePage.className = 'pageItem pageItemActive'
            }
            console.log('添加第 '+ i + " 个,toPage为："+(i <= toPage));
            // 添加点击事件
            thePage.addEventListener('click',() => {
                if(i == currentPageNum)return
                showThis(getCurrentShowCards(i))
            })
            thePage.innerHTML = ''+i
            // 添加到 分页条
            pageBar.appendChild(thePage)
        }
        if(toPage != totalPages-3){
        // 添加省略号
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 添加最后一列
        const LastPage = document.createElement('div')
        LastPage.className = 'pageItem'
        LastPage.innerHTML = ''+totalPages
        // 添加点击事件
        LastPage.addEventListener('click',() => {
            if(totalPages == currentPageNum)return
            showThis(getCurrentShowCards(totalPages))
        })
        // 添加到 分页条
        pageBar.appendChild(LastPage)
    }


    
    // 加载 下一页 按钮
    const downPage = document.createElement('div')
    downPage.className = 'pageItem'
    downPage.id = 'downPage'
    downPage.innerHTML = '下一页'
    // 添加点击事件
    downPage.addEventListener('click',() => {
        if(currentPageNum < totalPages){
            showThis(getCurrentShowCards(currentPageNum+1))
        }
    })
    // 添加到 分页条
    pageBar.appendChild(downPage)
// 加载 页码 输入框
    const pageInput = document.createElement('input')
    pageInput.id = 'pageInput'
    pageInput.placeholder = '页码'
    // 添加到 分页条
    pageBar.appendChild(pageInput)
// 加载 跳转 按钮
    const toPageBtn = document.createElement('div')
    toPageBtn.id = 'toPageBtn'
    toPageBtn.innerHTML = '跳转'
    // 添加点击事件
    toPageBtn.addEventListener('click',() => {
        const toPage = document.getElementById('pageInput').value
        showThis(getCurrentShowCards(+toPage))
    })
    // 添加到 分页条
    pageBar.appendChild(toPageBtn)
}

// 搜索并展示
const searchCardAndShow = (searText)=>{
    // 展示最近更新
    hideMain.style.display = 'block'
    latestResource.style.display = 'none'
    niceResource.style.display = 'none'
    fireResource.style.display = 'none'

    showBar.innerHTML = '搜索 '+searText
    let current = []
    allCards.forEach(item=>{
        if(item.detail.toLowerCase().includes(searText.toLowerCase())
            || item.classify.toLowerCase().includes(searText.toLowerCase())
        ){
            current.push(item)
        }
    })
    document.getElementById('main-slider').style.display = 'none'
    currentClassifyCards = current
    // 计算总页数
    totalPages = Math.ceil(currentClassifyCards.length / perPageNum);
    showThis(getCurrentShowCards(1))
}

// 跳转新页面搜索并展示
const searchCardAndShowOnNewPage = (searText)=>{
    let ref = '../../index.html?search='+searText
    window.location.href = ref
}

// 点击搜索框下提示
const searchTags = document.getElementsByClassName('searchTag')

for(let i = 0; i < searchTags.length; i++){
    searchTags[i].addEventListener('click',() => {
        searchCardAndShowOnNewPage(searchTags[i].innerHTML)
    })
}

// 点击主页搜索按钮
search_btn.addEventListener('click',() => {
    searchCardAndShowOnNewPage(searchText.value)
})
// 搜索框回车
searchText.addEventListener('keypress', function(event) {
    // 检查是否按下的是回车键
    if (event.key === 'Enter') {
        // 阻止默认行为，防止表单提交或者页面刷新
        event.preventDefault();
        searchCardAndShowOnNewPage(searchText.value)
    }
});

// 点击card 事件 进入 detail 界面
const cardClick = (card) => {
    let ref = ''
    if(card.classify.includes('精品游戏')){
        ref = '../articles/精品游戏/'+card.id+'.html'
    }else if(card.classify.includes('热门游戏')){
        ref = '../articles/热门游戏/'+card.id+'.html'
    }else if(card.classify.includes('动漫漫画')){
        ref = '../articles/动漫漫画/'+card.id+'.html'
    }else if(card.classify.includes('小说图文')){
        ref = '../articles/小说图文/'+card.id+'.html'
    }else if(card.classify.includes('软件专区')){
        ref = '../articles/软件专区/'+card.id+'.html'
    }else{
        ref = '../articles/'+card.id+'.html'
    }
    window.location.href = ref
}

