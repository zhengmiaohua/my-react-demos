/*var Pubsub={};
var eventObj={};
Pubsub.subscribe=function(event,fn){
	eventObj[event]=fn
}
Pubsub.publish=function(event){
	if(eventObj[event]) eventObj[event]();
}
Pubsub.off=function(event,fn){
	if(eventObj[event]) eventObj[event]=null
}**/
var Pubsub=(function(){
	var eventObj={};
	return {
		subscribe:function(event,fn){
			eventObj[event]=fn
		},
		publish:function(event){
			if(eventObj[event]) eventObj[event]();
		},
		off:function(event,fn){
			if(eventObj[event]) eventObj[event]=null;
		}
	}
})()
Pubsub.subscribe('event',function(){
	console.log("正在执行,但是一个事件只能绑定一个操作");
})
Pubsub.publish("event");

