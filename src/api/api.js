
 // export const path = "http://192.168.199.122:8000/cloud"
export const path = "http://localhost:8080/cloud"

export const phonewidth = '150'
//beta设置为5   s.bolink设置为2 
export const percision = 5

 export const moveStyle = [
     {'value_no':0,'value_name':'自适应'},
     {'value_no':1,'value_name':'从左向右移动'},
     {'value_no':2,'value_name':'从右向左移动'},
     {'value_no':3,'value_name':'从下向上移动'},
     {'value_no':4,'value_name':'从上向下移动'},
     {'value_no':5,'value_name':'从左向右展开'},
     {'value_no':6,'value_name':'从右向左展开'},
     {'value_no':7,'value_name':'从下向上展开'},
     {'value_no':8,'value_name':'从上向下展开'},
     {'value_no':9,'value_name':'立即显示'},
     {'value_no':10,'value_name':'从中间向两边展开'},
     {'value_no':11,'value_name':'从两边向中间展开'},
     {'value_no':12,'value_name':'从中间向上下展开'},
     {'value_no':13,'value_name':'从上下向中间展开'},
     {'value_no':14,'value_name':'闪烁'},
     {'value_no':15,'value_name':'右百叶'}
 ]

 export const fontSize = [
     {'value_no':0,'value_name':'12×12'},
     {'value_no':1,'value_name':'16×16'},
     {'value_no':2,'value_name':'24×24'},
     {'value_no':3,'value_name':'32×32'},
     {'value_no':4,'value_name':'48×48'},
     {'value_no':5,'value_name':'64×64'},
     {'value_no':6,'value_name':'80×80'},
     {'value_no':7,'value_name':'96×96'}
 ]

 export const redirectPort = [
     {'value_no':0,'value_name':'rs232-1'},
     {'value_no':1,'value_name':'rs232-2'},
     {'value_no':2,'value_name':'rs485'}
 ]

 export const LEDStyle = [
     {'value_no':0,'value_name':'普通屏'},
     {'value_no':1,'value_name':'余位屏'}
 ]

 export const fontStyle = [
     {'value_no':0,'value_name':'宋体'},
     {'value_no':1,'value_name':'楷体'},
     {'value_no':2,'value_name':'黑体'},
     {'value_no':3,'value_name':'隶属'},
     {'value_no':4,'value_name':'行书'}
 ]

 export const color = [
     {'value_no':0,'value_name':'红'},
     {'value_no':1,'value_name':'绿'},
     {'value_no':2,'value_name':'黄'}
 ]

 export const LEDColor = [
     {'value_no':0,'value_name':'单基色'},
     {'value_no':1,'value_name':'双基色'}
 ]

 export const waitingTime = [
     {'value_no':0,'value_name':'0s'},
     {'value_no':1,'value_name':'1s'},
     {'value_no':2,'value_name':'2s'},
     {'value_no':3,'value_name':'3s'},
     {'value_no':4,'value_name':'4s'},
     {'value_no':5,'value_name':'5s'}
 ]

 export const moveSpeed = [
     {'value_no':0,'value_name':'0'},
     {'value_no':1,'value_name':'1'},
     {'value_no':2,'value_name':'2'},
     {'value_no':3,'value_name':'3'},
     {'value_no':4,'value_name':'4'},
     {'value_no':5,'value_name':'5'},
     {'value_no':6,'value_name':'6'},
     {'value_no':7,'value_name':'7'},
     {'value_no':8,'value_name':'8'}
 ]

export const channlManager = [
    {'value_no':-1,'value_name':'默认车场设置'},
    {'value_no':0,'value_name':'不限制'},
    {'value_no':1,'value_name':'禁止进入'}
]

export const channlManagerType = [
    {'value_no':0,'value_name':'出'},
    {'value_no':1,'value_name':'入'},
    {'value_no':2,'value_name':'出入'}
]

export const monitorType = [
    {'value_no':0,'value_name':'显示'},
    {'value_no':1,'value_name':'隐藏'}
]

export const workStation = [
    {'value_no':0,'value_name':'流量'},
    {'value_no':1,'value_name':'宽带'}
]

export const payType = [
    {'value_no':0,'value_name':'现金'},
    {'value_no':1,'value_name':'电子支付'}
]

export var checkPhone = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入正确的电话号码'))
    } else if (!((/^800[0-9]{7}$/.test(value)) || (/^400[0-9]{7}$/.test(value)) || (/^1[34578]\d{9}$/.test(value)) || (/^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})$/.test(value)))) {
        return callback(new Error('请输入手机,座机(区号后加-),或400,800开头号码'))
    } else {
        callback()
    }
}

export var checkMobile = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入正确的手机号码'))
    } else if (!((/^1[34578]\d{9}$/.test(value)))) {
        return callback(new Error('请输入正确的手机号码'))
    } else {
        callback()
    }
}

export var checkURL = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入地址'))
    } else if (!(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value))) {
        return callback(new Error('请输入正确的地址'))
    } else {
        callback()
    }
}

export var checkUpload = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请上传图片'))
    } else {
        return callback()
    }
}

export var checkNumber = (rule, value, callback) => {
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请输入权重'))
    } else if (!(/^[0-9]{1,2}$/.test(value)) || value == 0) {
        return callback(new Error('权重值在1-99'))
    } else {
        callback()
    }
}

export var checkPass = (rule, value, callback) => {
    if (!(/^(\w){6,12}$/.test(value))) {
        return callback(new Error('密码为6-12位字母,数字或下划线'))
    } else {
        callback()
    }
}

export var checkCityInfo = (rule, value, callback) => {
    console.log("1111=>" + value)
    if (typeof(value) == 'undefined' || value == '') {
        return callback(new Error('请选择城市信息'))
    } else {
        callback()
    }
}

//export const distinctslist = () => { return axios.get('http://jarvisqh.vicp.io/cms-web/getdata/getdistinctlist') }


