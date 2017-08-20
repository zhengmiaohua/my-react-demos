//支持一个事件绑定多个操作
var Pubsub1=(function(){
	var quence={};//{'type1':[],'type2':[]}
	return {
		subscribe:function(event,fn){
			if(!quence[event]) quence[event]=[];
			quence[event].push(fn);
		},
		publish:function(event){
			var eventQuence=quence[event],
				len=eventQuence.length;
			if(len>0){
				eventQuence.forEach((item,index)=>{
					item()
				})
			}
		},
		off:function(event,fn){
			var eventQuence = quence[event];
	        if (eventQuence) {
	            quence[event] = eventQuence.filter(function(item) {
	                return item !== fn;
	            });
	        }
		}
	}
})()
function first(){
	console.log("emit first")
}
function second(){
	console.log("emit second")
}
Pubsub1.subscribe('a',first)
Pubsub1.subscribe('a',second)
Pubsub1.off('a',first)//退订一个first事件
Pubsub1.publish("a");