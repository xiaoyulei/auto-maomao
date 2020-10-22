// 养猫
var i = 0;
var j = 0;
var taskList = ['去搜索', '去围观', '去浏览', '去完成', '去施肥'];

var height = device.height; 
var width = device.width;
toast("设备宽" + width + "\n设备高" + height + "\n手机型号" + device.model + "\n安卓版本" + device.release)
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
toast("请手动点进养猫活动页面")
className("android.widget.Button").text("赚喵币").waitFor()

sleep(1000);
if (!textContains("淘宝成就点").exists()) {
    className("android.widget.Button").text("赚喵币").findOne().click()
    toast("点击成功");
}
sleep(1500 * speed);
if (className("android.widget.Button").text("签到").exists()) {
    className("android.widget.Button").text("签到").click()
    sleep(200);
    toast("签到成功");
} else { toast("已签到"); }
sleep(1500 * speed);

taskList.forEach(task => {
    while (textContains(task).exists()) {
        toast("开始做第" + (i+1) + "次任务！");
        var a = text(task).findOnce(j);
        switch (task) {
            case '去搜索':
            case '去围观':
            case '去浏览':
            case '去完成':
                sleep(500 * speed);
                a.click();
                sleep(1500 * speed);
                swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                sleep(2500 * speed);
                swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                sleep(8000 * speed);
                swipe(width / 2, height - 500, width / 2, 0, 800 * speed);
                textContains("完成").findOne(10000 * speed);
                i++;
                toast("已完成第" + i + "次任务！")
                back();
                break;
            case '去施肥':
                sleep(500 * speed);
                className("android.widget.Button").text("施肥").findOne().click()
                toast("施肥成功");
            default:
                toast("default")
                break;
        }
        sleep(2000 * speed);
    }
});

toast("完成");
exit();
