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
// 菜单栏 menuMask
const menuMask = document.getElementById('menuMask')


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
    toHome('精品游戏')
})

// 跳转主页 携带参数：classify
const toHome = (classify) => {
    let ref = '../../index.html?classify='+classify
    window.location.href = ref
}