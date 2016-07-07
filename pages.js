// 分页相关
// 复制之前的文章节点
var article = document.getElementById("article").cloneNode(true);

// 将原来的文章显示区域置空
var articleParent = document.getElementsByClassName("l-side-margins")[0];
var _parentElement = articleParent.parentNode;
if (_parentElement) {
    _parentElement.removeChild(articleParent);
}

// 添加自己的节点
var mainContent = document.createElement("div");
mainContent.id = "main-content";
var currentPage = 1;

// 文章内容主体
var _article = document.createElement("div");
_article.id = "inner-article";
_article.appendChild(article);
// 分页
var _pages = document.createElement("div");
_pages.id = "my-pages";

mainContent.appendChild(_article);
mainContent.appendChild(_pages);
document.getElementById("maincontent").appendChild(mainContent);

init(); //初始化文章显示区域大小
earseAd();
/**
 * [获取article的高度，获取浏览器的高度，由此确定分页策略]
 */
function init() {
    var articleHeight = document.getElementById("article").offsetHeight;
    console.log("article:" + articleHeight)
    var viewPortHeight = getBroswerSize().height;
    console.log(viewPortHeight);
    _article.style.height = 1.2 * (viewPortHeight) + "px";


    var pages = Math.ceil(articleHeight / (1.2 * viewPortHeight));
    document.ready = initPages(pages, (1.2 * viewPortHeight));


}

/** 
 * [initPages description]
 * @param  {[type]} pages         [总页数]
 * @param  {[type]} heightPerPage [每页的高度 px]
 * @return {[type]}               [description]
 */
function initPages(pages, heightPerPage) {
    var ul = document.createElement("ul");
    var pagesHTML = "<li><</li>";
    for (var i = 1; i <= pages; i++) {
        pagesHTML += "<li>" + i + "</li>";
    }
    pagesHTML += "<li>></li>";

    ul.innerHTML = pagesHTML;
    document.getElementById("my-pages").appendChild(ul);
    var allPages = document.querySelectorAll("#my-pages li");
    allPages[1].style.backgroundColor = "#1a6795";
    for (var i = 0, len = allPages.length; i < len; i++) {
        allPages[i].addEventListener("click", function() {
            var cur = i;
            return function() { changePage(cur, pages, heightPerPage) }
        }(), false);
    }
}

/**
 * [changePage description]
 * @param  {[type]} index         [li元素的下标]
 * @param  {[type]} pages         [总页数]
 * @param  {[type]} heightPerPage [每页的高度]
 */
function changePage(index, pages, heightPerPage) {
    if (index === 0) { //上一页
        if (currentPage !== 1)
            gotoPage(currentPage - 1, heightPerPage);
        return;
    }
    if (index === pages + 1) { //下一页
        if (currentPage !== pages)
            gotoPage(currentPage + 1, heightPerPage)
        return;

    }
    gotoPage(index, heightPerPage);

}
/**
 * [gotoPage分页的具体动作：1、消除当前页码的选中状态 2、给目标页码添加样式 3、对article进行偏移操作]
 * @param  {[type]} des           [目标页码]
 * @param  {[type]} heightPerPage [每页的高度]
 */
function gotoPage(des, heightPerPage) {

    var allPages = document.querySelectorAll("#my-pages li");
    allPages[currentPage].style.backgroundColor = "#fff";
    currentPage = des; //当前页切换回新的页数
    allPages[currentPage].style.backgroundColor = "#1a6795";
    article.style.top = (-heightPerPage * (des - 1) + 20) + "px";
    earseAd();
}

/**
 * [getBroswerSize返回浏览器的宽高信息]
 * @return {[type]} [{width:,height:}]
 */
function getBroswerSize() {
    // 获取窗口宽度
    var broswerSize = {
        width: 0,
        height: 0
    }
    if (window.innerWidth)
        broswerSize.width = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        broswerSize.width = document.body.clientWidth;
    // 获取窗口高度
    if (window.innerHeight)
        broswerSize.height = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        broswerSize.height = document.body.clientHeight;
    return broswerSize;
}


function earseAd() {
    var topAd = document.querySelectorAll(".top-banner-ad-container");
    for (var i = 0, len = topAd.length; i < len; i++) {
        topAd[i].style.display = "none";
    }
    document.getElementById("header").style.marginTop = "0";
    var rightAd = document.querySelectorAll(".content__secondary-column");
    for (var i = 0, len = rightAd.length; i < len; i++) {
        rightAd[i].style.display = "none";
    }
    if(document.getElementById("dfp-ad--inline1"))
    	document.getElementById("dfp-ad--inline1").style.display = "none";
    var leftAd = document.querySelectorAll(".content__meta-container");
    for (var i = 0, len = leftAd.length; i < len; i++) {
        leftAd[i].style.display = "none";
    }
    var footer = document.querySelectorAll(".l-footer__primary");
    for (var i = 0, len = rightAd.length; i < len; i++) {
        footer[i].style.display = "none";
    }
    var content__labels = document.querySelectorAll(".content__labels");
    for (var i = 0, len = content__labels.length; i < len; i++) {
        content__labels[i].style.display = "none";
    }
    var aside = document.querySelectorAll("aside");
    for (var i = 0, len = aside.length; i < len; i++) {
        aside[i].style.display = "none";
    }
    var topAd = document.querySelectorAll("p-banner-ad-container");
    for (var i = 0, len = topAd.length; i < len; i++) {
        topAd[i].style.display = "none";
    }
    var mainContent = document.getElementsByClassName("email-sub__iframe--post-article");
    for (var i = 0, len = mainContent.length; i < len; i++) {
        mainContent[i].style.paddingLeft = "1.25rem";
        mainContent[i].style.paddingRight = "1.25rem";
    }
}
