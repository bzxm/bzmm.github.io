// 菜单条 navRow
const navRow = document.getElementById('navRow')
// 菜单条 menuCheck
const menuCheck = document.getElementById('menuCheck')
// 菜单条 标题ico
const homeICO = document.getElementById('homeICO')
// 菜单栏 menuSelector
const menuSelector= document.getElementById('menuSelector')

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
let menuFlag = 0;
let navRowBackC;
let navRowMuneBaBackr;



menuCheck.addEventListener('click',() => {
    if(menuFlag == 0){
        navRowBackC = navRow.style.boxShadow;
        navRow.style.boxShadow = 'none';
        menuMask.style.display = 'block';
        menuSelector.style.transform = 'translateX(0)';
        menuFlag = 1;
    }else{
        navRow.style.boxShadow = navRowBackC;
        menuMask.style.display = 'none'
        menuSelector.style.transform = 'translateX(-110%)';
        menuFlag = 0;
    }
    
})
menuMask.addEventListener('click',() => {
    navRow.style.boxShadow = navRowBackC;
    menuMask.style.display = 'none'
    menuSelector.style.transform = 'translateX(-110%)';
    menuFlag = 0;
})


// 点击主页图标跳转首页
homeICO.addEventListener('click',() => {
    toHome()
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
let menuSearchFlag = 0;
nav_search.addEventListener('click',() => {
    if(menuSearchFlag == 0){
        searchMask.style.display = 'block'
        searchToast.style.transform = 'translate(-50%,-50%)';
        menuSearchFlag = 1;
    }else{
        searchMask.style.display = 'none'
        searchToast.style.transform = 'translate(-50%,-300%)';
        menuSearchFlag = 0;
    }
})
searchMask.addEventListener('click',() => {
    searchMask.style.display = 'none'
    searchToast.style.transform = 'translate(-50%,-300%)';
    menuSearchFlag = 0;
})
searchToast.addEventListener('click',(event) => {
    event.stopPropagation(); // 阻止事件继续传播
})
toastClose.addEventListener('click',() => {
    searchMask.style.display = 'none'
    searchToast.style.transform = 'translate(-50%,-300%)';
    menuSearchFlag = 0;
})

// 点击搜索
toastBtn.addEventListener('click',() => {
    toHomeSearch(toastInput.value);
})


// 上下滑动页面显示隐藏下方导航栏
var lastScrollTop = 0;
const container2 = document.getElementById('container')
const navBottom = document.getElementById('navBottom')
if(container2 != undefined){
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
}


// 设置点击事件
const navBottomHomeBar = document.getElementById('navBottomHomeBar');
if(navBottomHomeBar != undefined){
    navBottomHomeBar.addEventListener('click',() => {
        document.location.href = '/'
    })
}
const navBottomRandBar = document.getElementById('navBottomRandBar');
if(navBottomRandBar != undefined){
    navBottomRandBar.addEventListener('click',() => {
        document.location.href = '../../html/random.html'
    })
}


window.addEventListener('resize', function() {
    var width = window.innerWidth;   // 获取当前窗口的宽度
    var height = window.innerHeight; // 获取当前窗口的高度
    if(+width >= 770){
        menuMask.style.display = 'none'
        menuSelector.style.transform = 'translateX(-110%)';
        menuFlag = 0;
    }
});