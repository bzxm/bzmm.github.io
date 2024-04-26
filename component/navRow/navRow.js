// 菜单条 menuBar
const menuBar = document.getElementById('menuBar')
// 菜单条 标题ico
const homeICO = document.getElementById('homeICO')
// 菜单栏 menuSelect
const menuSelect = document.getElementById('menuSelect')
// 菜单栏 menuSelector
const menuSelector= document.getElementById('menuSelector')
// 菜单栏 option 主页
const homeBtn = document.getElementById('homeBtn')
// 菜单栏 niceGame 精品游戏
const niceGame = document.getElementById('niceGame')
// 菜单栏 pcGame 热门游戏
const pcGame = document.getElementById('pcGame')
// 菜单栏 menuMask
const menuMask = document.getElementById('menuMask')
// 菜单搜索 nav_search
const nav_search = document.getElementById('nav_search')
// 菜单搜索框 searchMask
const searchMask = document.getElementById('searchMask')
// 菜单搜索框 searchToast
const searchToast = document.getElementById('searchToast')
// 菜单搜索框close按钮 toastClose
const toastClose = document.getElementById('toastClose')
// 菜单搜索框 搜索框 toastInput
const toastInput = document.getElementById('toastInput')
// 菜单搜索框 搜索按钮 toastBtn
const toastBtn = document.getElementById('toastBtn')


// 点击显示隐藏菜单项
menuBar.addEventListener('click',() => {
    menuSelect.style.display = 'block'
    menuMask.style.display = 'block'
    menuSelector.style.transform = 'translateX(0)';
})
menuMask.addEventListener('click',() => {
    menuMask.style.display = 'none'
    menuSelect.style.display = 'none'
    menuSelector.style.transform = 'translateX(-110%)';
})


// 点击主页图标跳转首页
homeICO.addEventListener('click',() => {
    toHome()
})


// 点击菜单栏 homeBtn
homeBtn.addEventListener('click',() => {
    toHome()
})

// 点击菜单栏 精品游戏
niceGame.addEventListener("click",() => {
    let ref = '../../html/classify.html?classify=精品游戏'
    window.location.href = ref
})
// 点击菜单栏 热门游戏
pcGame.addEventListener("click",() => {
    let ref = '../../html/classify.html?classify=热门游戏'
    window.location.href = ref
})

// 点击菜单栏 动漫漫画
animal.addEventListener("click",() => {
    let ref = '../../html/classify.html?classify=动漫漫画'
    window.location.href = ref
})

// 点击菜单栏 小说图文
novel.addEventListener("click",() => {
    let ref = '../../html/classify.html?classify=小说图文'
    window.location.href = ref
})


// 跳转主页 携带参数：classify
const toHome = () => {
    let ref = '../../index.html';
    window.location.href = ref
}

// 跳转主页搜索
const toHomeSearch = (searchText) => {
    let ref = '../../index.html?search='+searchText
    window.location.href = ref
}

// 点击显示隐藏搜索框
nav_search.addEventListener('click',() => {
    searchMask.style.display = 'block'
})
searchMask.addEventListener('click',() => {
    searchMask.style.display = 'none'
})
searchToast.addEventListener('click',(event) => {
    event.stopPropagation(); // 阻止事件继续传播
})
toastClose.addEventListener('click',() => {
    searchMask.style.display = 'none'
})

// 点击搜索
toastBtn.addEventListener('click',() => {
    toHomeSearch(toastInput.value);
})


// 上下滑动页面显示隐藏下方导航栏
var lastScrollTop = 0;
const container2 = document.getElementById('container')
const navBottom = document.getElementById('navBottom')
container2.addEventListener("scroll", function() {
    var currentScroll = container2.scrollTop

    if (currentScroll > lastScrollTop) {
       console.log('下');
       navBottom.style.bottom = '-100px'
    } else {
        console.log('上');
        navBottom.style.bottom = '0px'
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 当滚动到顶部时重置
});

// 设置点击事件
document.getElementById('navBottomHomeBar').addEventListener('click',() => {
    document.location.href = '/'
})
document.getElementById('navBottomRandBar').addEventListener('click',() => {
    
    document.location.href = '../../html/random.html'
})

