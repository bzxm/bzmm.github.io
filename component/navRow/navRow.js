// 菜单条 menuBar
const menuBar = document.getElementById('menuBar')
// 菜单条 标题ico
const homeICO = document.getElementById('homeICO')
// 菜单栏 menuSelect
const menuSelect = document.getElementById('menuSelect')
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
})
menuMask.addEventListener('click',() => {
    menuMask.style.display = 'none'
    menuSelect.style.display = 'none'
})


// 点击主页图标跳转首页
homeICO.addEventListener('click',() => {
    toHome('全部')
})


// 点击菜单栏 homeBtn
homeBtn.addEventListener('click',() => {
    toHome('全部')
})

// 点击菜单栏 精品游戏
niceGame.addEventListener("click",() => {
    let ref = '../../html/classify.html?classify=精品游戏'
    window.location.href = ref
})
// 点击菜单栏 热门游戏
pcGame.addEventListener("click",() => {
    toHome('热门游戏')
})


// 跳转主页 携带参数：classify
const toHome = (classify) => {
    let ref = '../../index.html?classify='+classify
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