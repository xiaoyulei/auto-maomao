// 养猫
var i = 0;
var j = 0;
//var taskList = ['去搜索', '去围观', '去浏览', '去完成', '去施肥'];
var taskList = ['去搜索', '逛一逛', '去围观', '去浏览', '去施肥', '领取奖励'];

var height = device.height; 
var width = device.width;
toast("设备宽" + width + "\n设备高" + height + "\n手机型号" + device.model + "\n安卓版本" + device.release);
setScreenMetrics(width, height);

// 浏览速度
var speed = 1;

menu: while (true) {
    var choose = dialogs.select("请选择速度", "快速", "一般", "低速", "缓慢");
    switch (choose) {
        case -1:
            toast("请选择");
            continue menu;
        case 0:
            toast("快速");
            speed = 0.75;
            break menu;
        case 1:
            toast("一般");
            speed = 1;
            break menu;
        case 2:
            toast("低速");
            speed = 1.5;
            break menu;
        case 3:
            toast("缓慢");
            speed = 2;
            break menu;

        default:
            break;
    }
}

auto.waitFor();

sleep(1000 * speed);

//打开活动页面
launch("com.taobao.taobao");
sleep(1000 * speed);
// toast("请手动点进养猫活动页面")
log("正在等待进入天猫双11喵喵喵活动页面\n如果没有反应请手动点击搜索框");
className("android.view.View").desc("搜索").waitFor();
let search = className("android.view.View").desc("搜索").depth(12).findOne().bounds();
click(search.centerX(),search.centerY());
desc("搜索发现").findOne();
sleep(random(3, 5) * speed);
setText("喵币");
sleep(random(1, 5) * speed);
id("searchbtn").findOne().click();
className("android.widget.Button").text("赚喵币").waitFor();

sleep(1000);
if (!textContains("淘宝成就点").exists()) {
    className("android.widget.Button").text("赚喵币").findOne().click();
    toast("点击成功");
}

sleep(2000 * speed);
if (className("android.widget.Button").text("签到").exists()) {
    className("android.widget.Button").text("签到").click();
    sleep(1000);
    toast("签到成功");
} else { toast("已签到"); }

sleep(1000 * speed);
taskList.forEach(task => {
    while (textContains(task).exists()) {
        toast("开始做第" + (i+1) + "次任务！");
        
        var a = text(task).findOnce(j);
        if (a ==  null) {
            toase("没找到" + task + "界面");
            continue;
        }
        
        switch (task) {
            case '去搜索':
            case '去围观':
            case '去浏览':
            case '去完成':
            case '逛一逛':
                sleep(500 * speed);
                a.click();
                sleep(2000 * speed);
                
                var count = 0;
                
                // 等待“浏览15秒得喵币”的界面出现
                while (count < 20 && !textContains("得喵币").exists()) {
                    count++;
                    toast("第" + count + "次没有找到得喵币。");
                    sleep(1000);
                }
                
                // 没有找到任务开始界面
                if (count >= 20) {
                    toast("已经20次没有找到得喵币，退出重新进入");
                    back();
                    break;
                }

                // 等待“完成”界面出现
                count  = 0;
                while (count < 20 && !textContains("完成").exists()) {
                    swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                    sleep(1000);
                    count++;
                    toast("第" + count + "次没有找到完成。");
                }

                if (count >= 20) { toast("没有按时完成"); }
                else {
                    i++;
                    toast("已完成第" + i + "次任务！");
                }
                back();
                break;
            case '去施肥':
                sleep(500 * speed);
                className("android.widget.Button").text("施肥").findOne().click()
                toast("施肥成功");
            case '领取奖励':
                sleep(random(501, 515) * speed);
                a.click();
                log('奖励领取成功');
                break;
            default:
                toast("default");
                break;
        }
        sleep(2000 * speed);
    }
});

toast("完成任务");

// 关闭任务界面
sleep(2000);
var closeBtn = textContains("关闭").findOne();
if (closeBtn != null) {
    closeBtn.click();
    sleep(1000);
}

toast("开始撸猫");
var cc = 0;
while (cc < 100) {
    textContains("点击撸猫").findOne().click();
    cc++;
    toast("第" + cc + "次撸猫");
    sleep(2000);
}

exit();
