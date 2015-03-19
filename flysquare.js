function Square () {
	this.instance = (function () {
		var body = document.getElementById("body");
		var div = document.createElement('div');
		var id = Math.random().toString();
		div.setAttribute('class',"square");
		div.setAttribute('id',id);	
		//div.setAttribute('onclick','getId()');		
		body.appendChild(div);		

		 var color = '#';
         var letters = ['0','1','2','3','4','5','6','7','8','9','9','a','b','c','d','e','f']; 
         for (var i = 0; i < 6; i++) {
         	var index =  Math.floor(Math.random() * letters.length);
         	color += letters[index];
         };
        // color += letters[Math.floor(Math.random() * letters.length)];
         div.style.background = color;

		return document.getElementById(id);

	})();
	
	this.left = 0;
	this.top = 0;
	this.width = this.instance.clientWidth;
	this.height = this.instance.clientHeight;
	this.dx = 1;
	this.dy = 1;
	this.isPaused = false;
	this.interval = 0;
};

Square.prototype.move = function (){
	this.left += this.dx;
	this.top += this.dy;
	this.render();
}

Square.prototype.render = function (){
	this.instance.style.top = this.top +"px";
	this.instance.style.left = this.left +"px";
	this.check();
}
Square.prototype.check = function(){
	var pos = {
	top: this.top + this.dy,
	left: this.left + this.dx,
	bottom: this.top + this.dy + this.height,
	right: this.left + this.dx + this.width
	};

	if(this.dx > 0 && this.dy > 0){
		if(pos.bottom >= window.innerHeight){
			this.dy = -1;			
		}
		if(pos.right >= window.innerWidth){
			this.dx = -1;
		}
	}
	else if (this.dx > 0 && this.dy < 0){
		if(pos.top <= 0){
			this.dy = 1;
		}
		if(pos.right >= window.innerWidth){
			this.dx = -1;
		}		
	}
	else if (this.dx < 0 && this.dy > 0){
		if(pos.bottom >= window.innerHeight){
			this.dy = -1;
		}
		if(pos.left <= 0 ){
			this.dx = 1
		}
	}
	else if (this.dx < 0 && this.dy < 0){
		if(pos.top <= 0){
			this.dy = 1;
		}
		if(pos.left <= 0 ){
			this.dx = 1;
		}
	}	
};

Square.prototype.stop = function(event) {

	if(this.isPaused){
		this.interval = setInterval( this.move.bind(this), 3);
		this.isPaused = false;
	}else{
	clearInterval(this.interval);
	alert('stop');
	console.log(this);
	this.isPaused = true;
	}
	return;
}


Square.prototype.run = function() {
	this.instance.addEventListener('click', this.stop.bind(this));
    this.interval = setInterval( this.move.bind(this), 3);
};

window.addEventListener('load', function() {
    
     $('#create').on('click', function (event) {
        var square = new Square();
        square.run();
       
     }); 
});