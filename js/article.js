// window.addEventListener("DOMContentLoaded",() => {
//     // 获取标题 前往下载 gotoDown
// const gotoDown = document.getElementById('gotoDown')

// // 获取所有img并添加load
// const imgs = document.getElementsByClassName('articleImg')
// console.log("imgs:",imgs);
// // 遍历所有图片元素并为它们添加load事件监听器
// for (let i = 0; i < imgs.length; i++) {
//     console.log("img"+i+":",imgs[i]);
//     imgs[i].addEventListener('load',() => {
//         console.log("img"+i+"load");
//         imgs[i].style.display = 'block'
//         // 隐藏 img_load
//         document.getElementById('img_load_'+imgs[i].id).style.display='none'
//     })
// }

// gotoDown.addEventListener('click',() => {
//     const downLoad = document.getElementById('downLoad')
//     downLoad.scrollIntoView({behavior:'smooth'})
// })

// function goLink(link){
//     document.location.href = link
// }

// })



// 获取标题 前往下载 gotoDown
const gotoDown = document.getElementById('gotoDown')


if(gotoDown != null){
    gotoDown.addEventListener('click',() => {
        const downLoad = document.getElementById('downLoad')
        downLoad.scrollIntoView({behavior:'smooth'})
    })
}


function goLink(link){
    document.location.href = link
}

const articleTags = document.getElementById('articleTags')
const tags = articleTags.children;
for(let i = 0; i < tags.length; i++){
    tags[i].addEventListener('click',() => {
        // 搜索标签
        let ref = '../../index.html?search='+tags[i].innerHTML
        window.location.href = ref
    })
}

function isToday(someDate) {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
}

const PERDAYDOWNLOAD = document.getElementById('PERDAYDOWNLOAD')



window.addEventListener('pageshow', function(event) {
    // event.persisted 属性可以用于区分页面是从缓存中加载还是从服务器重新加载的
    isPERDAY();
  });

  const isPERDAY = () => {
    if(isTimeInRange()){
        PERDAYDOWNLOAD.style.display = 'block'
    }else{
        PERDAYDOWNLOAD.style.display = 'none'
    }
  }

  isPERDAY();

  function isTimeInRange() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    // 将时间转换为分钟数，方便比较
    var currentTimeInMinutes = hours * 60 + minutes;

    // 将 0:00 和 0:20 转换为分钟数
    var startTimeInMinutes = 0 * 60;
    var endTimeInMinutes = 0 * 60 + 15;

    // 判断当前时间是否在指定范围内
    if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
        return true;
    } else {
        return false;
    }
}