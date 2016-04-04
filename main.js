/**
 * Created by Administrator on 2016/3/24.
 */
//存放数组元素
var data = [];
var data_tmp = [];
var flag = true;
function $(id) {
    return document.getElementById(id);
}
$("left-in").onclick = function () {
    if (checkInput() == 0)return;
    if (flag == false)return;
    data.unshift(checkInput());
    update();
};
$("left-out").onclick = function () {
    if (flag == false)return;
    data.shift();
    update();
}
$('right-in').onclick = function () {
    if (flag == false)return;
    if (checkInput() == 0)return;
    data.push(checkInput());
    update();
}
$('right-out').onclick = function () {
    if (flag == false)return;
    data.pop();
    update();
}
$('random-queue').onclick = function () {
    if (flag == false)return;
    data = [];
    for (var i = 0; i < 50; i++) {
        var d = parseInt(Math.random() * 88 + 11);
        data.push(d);
    }
    update();
}
$('insert-sort').onclick = function () {
    if (flag == false)return;
    var min = data[0], minp = 0;
    var cur = 0;
    var i = cur;
    var cir = setInterval(run, 100);

    function run() {
        flag = false;
        for (i = cur + 1; i < data.length; i++) {
            if (data[i] < min) {
                min = data[i];
                minp = i;
            }
        }
        var tmp = data[cur];
        data[cur] = data[minp];
        data[minp] = tmp;

        cur++;
        min = data[cur];
        minp = cur;

        update();
        if (cur >= data.length) {
            flag = true;
            clearInterval(cir);
        }
    }
}
$('bubble-sort').onclick = function () {
    if (flag == false)return;
    var i = 0, j = 1;
    var cir = setInterval(run, 1);

    function run() {
        flag = false;
        if (i < data.length) {
            if (j < data.length) {
                if (data[i] > data[j]) {
                    var tmp = data[i];
                    data[i] = data[j];
                    data[j] = tmp;
                    update();
                    return;
                }
                j++;
            } else {
                i++;
                j = i + 1;
            }

        } else {
            flag = true;
            clearInterval(cir);
        }
    }

}
function update() {
    var res = '';
    for (var i = 0; i < data.length; i++) {
        var h = parseInt(data[i] * 2);
        res += "<div class='res-box' style='height:" + h + "px'>" + data[i] + "</div>"
    }
    $('box').innerHTML = res;

}
function checkInput() {
    var input = $('input').value.trim();
    if (data.length >= 60) {
        alert("元素超过60个");
        return 0;
    }
    if (input >= 100 || input <= 10) {
        alert("请输入11到99之间的数");
        return 0;
    }
    return input;
}

function quickSort(l, r) {
    console.log(l,r);
    var index = partition(l,r);
    console.log(index);
    if (l < (index - 1)) {
        quickSort(l,index-1);
    }
    if (index < r) {
        quickSort(index,r);
    }
}
function partition(l, r) {
    var mid=parseInt((l + r)/2);
    var pvt = data[mid];
    while (l <= r) {
        while (data[l] < pvt){l++;}
        while (data[r] > pvt){r--;}
        if (l <= r) {
            var tmp = data[l];
            data[l] = data[r];
            data[r] = tmp;
            l++;
            r--;
            data_tmp.push(data.toString());
        }
    }
    return l;
}

$('quick-sort').onclick = function () {
    quickSort(0,data.length-1);
    if (flag == false)return;
    var i = 0;
    var cir = setInterval(run, 100);
    function run() {
        data = data_tmp[i].split(',');
        update();
        i++;
        if (i >= data_tmp.length)clearInterval(cir);
    }
}
