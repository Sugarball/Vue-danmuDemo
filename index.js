require('./index.css')
require('bootstrap/dist/css/bootstrap.css')
var Wilddog = require("wilddog");
var Vue = require('vue');

Vue.config.debug = true;
Vue.config.devtools = true;

var danmu = Vue.extend({

  props : ['top','msg','index'],	
  data: function () {
    return {
    	style : {
    		top : this.top,
    		right : 0,
    		color : ['pink','black','blue','green','yellow'][this.index % 6]
    	}
    	
    }
  },
  template : '<div class="danmu" v-bind:style="style" >{{msg}}</div>',
  ready : function(){
  	
  	var self = this;
  	
  	var inter = setInterval(function(){
  		if(!self.$el)return clearInterval(inter);
  		self.style.right = Number(String(self.style.right).split('px')[0]) + 2 + 'px';
  		if(Number(String(self.style.right).split('px')[0])+ self.$el.offsetWidth  >= 790){
  			self.$destroy(true);
  			clearInterval(inter);
  		}
  	},10);
  }
})

Vue.component('danmu', danmu)

var vm = new Vue({
  el: '#example',
  data: {
    list : [],
    newDanmu : "",
  },
  computed: {
    
  },
  ready: function(){
  	var self = this;
  	ref = new Wilddog("https://danmudemo.wilddogio.com/");
        // ref.once("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     for(i in snapshot.val()){
        //     	self.list.push(snapshot.val()[i])
        //     }
            
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // });
        ref.on("child_added", function(snapshot) {
            console.log('12313123',snapshot.val());
            self.list.push(snapshot.val())
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
  },

  methods: {
    sendNew : function(){
    	console.log(this.newDanmu);

    	// this.list.push({
    	// 	msg : this.newDanmu
    	// });

        ref.push({
            "msg" : this.newDanmu
        });

    	this.newDanmu = "";
    },
    clear : function(){
    	this.list = [];

    }
  }
})