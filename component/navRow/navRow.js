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

// 最近搜索tags recentSearchTags
const recentSearchTags = document.getElementById('recentSearchTags')


// 点击显示隐藏菜单项
let menuFlag = 0;
let navRowBackC;
let navRowMuneBaBackr;



menuCheck.addEventListener('click',() => {
    if(menuFlag == 0){
        if(navBottom != undefined){
            navBottom.style.display = 'none';
        }
        menuCheck.checked = true;
        navRowBackC = navRow.style.boxShadow;
        navRow.style.boxShadow = 'none';
        menuMask.style.display = 'block';
        menuSelector.style.transform = 'translateX(0)';
        menuFlag = 1;
    }else{
        if(navBottom != undefined){
            navBottom.style.display = 'flex';
        }
        menuCheck.checked = false;
        navRow.style.boxShadow = navRowBackC;
        menuMask.style.display = 'none'
        menuSelector.style.transform = 'translateX(-110%)';
        menuFlag = 0;
    }
    
})
menuMask.addEventListener('click',() => {
    if(navBottom != undefined){
        navBottom.style.display = 'flex';
    }
    menuCheck.checked = false;
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
    // 获取最近搜索存储
    let recentTags = localStorage.getItem('recentSearchTags');
    recentSearchTags.innerHTML = ''
    if(recentTags!=null){
        const recentTagss = JSON.parse(recentTags);
        recentTagss.forEach(tag => {
            let searchToastTag = document.createElement('div');
            searchToastTag.className = 'searchToastTag';
            searchToastTag.innerHTML = tag;
            searchToastTag.addEventListener('click',() => {
                if (toastInput !== undefined) {
                    toastInput.focus();
                    toastInput.value = searchToastTag.innerHTML;
                }
            })
            recentSearchTags.appendChild(searchToastTag);
        });
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
// 回车搜索
if(toastInput!=undefined){
    toastInput.addEventListener('keydown', function(event) {
        // 检查按下的键是否是回车键
        if (event.key == 'Enter') {
            // 在这里执行回车键按下时的操作
            toHomeSearch(toastInput.value);
        }
    });
}


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
const navBottomfljBar = document.getElementById('navBottomfljBar');
if(navBottomfljBar != undefined){
    navBottomfljBar.addEventListener('click',() => {
        document.location.href = '../../html/18tu.html'
    })
}

// 点击搜索框聚焦事件
const searchPlaceHolder = document.getElementById('searchPlaceHolder');
const inputDiv = document.getElementById('inputDiv')
const underLine = document.getElementById('underLine')
if(toastInput != undefined){
    let isFo = false;
    toastInput.addEventListener('focus',() => {
        if(searchPlaceHolder != undefined){
            searchPlaceHolder.style.transform = 'translateY(-12px)';
            searchPlaceHolder.style.top = '0'
            searchPlaceHolder.style.color = '#ff53a9'
            searchPlaceHolder.style.fontSize = '12px'
            underLine.style.width = '100%'
        }
        isFo = true;
    })
    toastInput.addEventListener('blur',() => {
        if(searchPlaceHolder != undefined && toastInput.value == ''){
            searchPlaceHolder.style.transform = 'translateY(-50%)';
            searchPlaceHolder.style.top = '50%'
            searchPlaceHolder.style.color = '#555659'
            searchPlaceHolder.style.fontSize = '16px'
            underLine.style.width = '0'
        }
        isFo = false;
    })
    toastInput.addEventListener("mouseover",() => {
        underLine.style.width = '100%'
    })
    toastInput.addEventListener("mouseleave",() => {
        if(!isFo){
            underLine.style.width = '0'
        }
    })
}

// 点击 searchToastTag 填充输入框
 // 使用 document.getElementsByClassName() 获取类名为 "example" 的所有元素
 var elements = document.getElementsByClassName('searchToastTag');

 // 遍历这些元素
 for (var i = 0; i < elements.length; i++) {
     (function(element) {
         // 在闭包中为每个元素添加事件监听器
         element.addEventListener('click', function() {
             if (toastInput !== undefined) {
                 toastInput.focus();
                 toastInput.value = element.innerHTML;
             }
         });
     })(elements[i]);
    }

window.addEventListener('resize', function() {
    var width = window.innerWidth;   // 获取当前窗口的宽度
    var height = window.innerHeight; // 获取当前窗口的高度
    if(+width >= 800){
        menuMask.style.display = 'none'
        menuSelector.style.transform = 'translateX(-110%)';
        menuCheck.checked = false;
        menuFlag = 0;
    }
});