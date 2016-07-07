/**
 * 屏幕取词及翻译功能
 * 2016.07.07
 */

// 添加监听事件
document.getElementById("article").ondblclick = getWord;

//插入翻译弹框节点
var tWindow = document.createElement("div");
tWindow.id = "translate";
document.getElementById("top").appendChild(tWindow);



var translateWindowPosition = {}; //记录翻译框显示位置，在隐藏弹框时作为距离判断的依据

var clickPosition = { x: 0, y: 0 }; //双击动作时，鼠标位置

/**
 * [getWord 拿到当前鼠标选中的单词，并交给getWordMessage处理]
 * @return
 */
function getWord() {
    clickPosition = getMousePos();
    var word = window.getSelection();
    if (word !== "") {
        getWordMyssage(word, handleWordMessage);
    }
}

//  
/**
 * [getWordMyssage 请求中文翻译及读音]
 * @param  {[type]}   word     [要查询的单词]
 * @param  {Function} callback [回调函数]
 * @return  
 */
function getWordMyssage(word, callback) {
    var base_url = "https://api.shanbay.com/bdc/search/?word=";
    var obj = new XMLHttpRequest();
    obj.open('GET', base_url + word, true);
    obj.onreadystatechange = function() {
        if (obj.readyState == 4 && obj.status == 200) {
            callback(word, obj.responseText);
        }
    };
    obj.send(null);

}




/**
 * [handleWordMessage 在屏幕上显示翻译信息]
 * @param  {[type]} word     [翻译的单词]
 * @param  {[type]} response [单词中文及音频信息]
 */
function handleWordMessage(word, response) {

    var wordDetail = JSON.parse(response);

    if (wordDetail.status_code === 0) {
        //查找成功
        //提取数据
        var cn_definition = wordDetail.data.cn_definition;
        if(cn_definition.defn.length>30) cn_definition.defn = cn_definition.defn.slice(0,30) + "...";
        var audio = wordDetail.data.audio;
        // 加载到翻译框

        tWindow.innerHTML = '<h4 class="translate-word">' + word + '</h4>' + '<h6> 中文释义</h6>' + '<p>' + cn_definition.defn + '</p>' +
            '<div class="audio-play">' +
            '<img src="http://tse1.mm.bing.net/th?&id=OIP.Mfe3bc62264924c3351569b55ad7f0667o0&w=168&h=168&c=0&pid=1.9&rs=0&p=0" width="16" height="16" alt="" id="playControl" onclick="var a = document.createElement(\'audio\');a.setAttribute(\'src\',\'' + audio + '\');a.play();">' + '<span>英文发音</span>' + '</div>';
        showTranslationWindow();
    }
}

/**
 * [showTranslationWindow 具体处理弹框显示位置的函数]
 */
function showTranslationWindow() {
    console.log("being showTranslationWindow");
    tWindow.style.display = "block";
    setTranslationPosition();

    tWindow.style.top = translateWindowPosition.y + "px";
    tWindow.style.left = translateWindowPosition.x + "px";
    document.onmousemove = hideTranslationWindow;
}


/**
 * [hideTranslationWindow 当鼠标远离翻译框的时候，隐藏它]
 */
function hideTranslationWindow() {
    var currentMousePosition = getMousePos();
    console.log(JSON.stringify(currentMousePosition));

    if (currentMousePosition.x - translateWindowPosition.x < 200 && //鼠标位于翻译框右侧
        currentMousePosition.x - translateWindowPosition.x > -80 && //鼠标位于翻译框左侧
        currentMousePosition.y - translateWindowPosition.y > -80 && //鼠标位于翻译框上方
        currentMousePosition.y - translateWindowPosition.y < 250) //鼠标位于翻译框上方
    ; //do nothing
    //否则 隐藏弹框
    else tWindow.style.display = "none";

}

/**
 * [hideTranslationWindow 确定翻译弹框在浏览器中的位置]
 */
function setTranslationPosition() {
    var currentMousePosition = clickPosition;;
    var broswerSize = getBroswerSize();
    console.log("sssd" + JSON.stringify(currentMousePosition))
    console.log("sssd" + JSON.stringify(broswerSize))

    var position = {}
        // 显示在左边的情况：鼠标点击位置距右侧小于 150px
    if (broswerSize.width - currentMousePosition.x < 150) {
        translateWindowPosition.x = currentMousePosition.x - 150;
    } else {
        translateWindowPosition.x = currentMousePosition.x + 30; //默认显示于点击右侧30px
    }

    if (broswerSize.height - currentMousePosition.y < 200) { //点击位置距底部小于 200px
        translateWindowPosition.y = currentMousePosition.y - 200;

    } else {
        translateWindowPosition.y = currentMousePosition.y + 30; //默认显示于点击右侧30px
    }

}
/**
 * [hideTranslationWindow 获取浏览器窗口大小]
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

// 得到鼠标位置
function getMousePos(en) {
    var e = en || window.event;
    return {
        'x': e.clientX,
        'y': e.clientY
    }
}
