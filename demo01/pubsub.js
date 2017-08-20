/**
 * 有一个发布者
 * 发布者拥有一个笔记本，上面记录着与订阅者约定好的事情和该事情的类型
 * 发布者拥有一个广播的方法，该方法接受一个类型参数，每次广播时，就会把笔记本上的该类型的事情都执行一遍
 * 发布者可以在笔记本中添加某件事情，并且要指定该事情的类型
 * 发布者也可以从笔记本删掉某件事情
 */
//1、发布者
var publisher={};
//2、拥有一个笔记本，键值对形式
publisher.notebook={};
//3、拥有广播的方法，会将类型的事情都执行一遍
publisher.broadcast=function(type){
	//取出事情，一个类型的，可以有多个事情
	var funArray=getArr(type);
	//把所有事情都执行一遍
	for(var i=0;i<funArray.length;i++){
		funArray[i]();
	}
}
//4、笔记本可以添加事情并指定类型
publisher.addFun=function(type,fun){
	getArr(type).push(fun);
}
//5、记事本可以删除事情
function getArr(type){
	var arr=[]
	for(var key in publisher.notebook){
		if(key===type){
			arr.push(publisher.notebook[key])
		}
	}
	return arr;
}
publisher.removeFun=function(type,fun){
	var funArray=getArr(type);
	for(var i=0;i<funArray.length;i++){
		if(fun===item){
			funArray.splice(i,1)
		}
	}
}

//订阅者
var use={
	yue:function(){
		console.log("正在执行要约的事情")
	}
}
//添加到发布者的笔记本，给定随意的类型
publisher.addFun("type1",use.yue);
//广播
publisher.broadcast("type1")