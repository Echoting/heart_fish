
	var actnObj = function(){
		this.x = [];
		this.len = [];
		this.headx = [];
		this.heady = [];
		this.alpha = 0;
		this.amp = [];
	}
	actnObj.prototype.num = 50;
	actnObj.prototype.init = function(){
		for(var i=0 ; i<this.num; i++){
			this.x[i] = i*16+ Math.random()*20;
			this.len[i] = 200+Math.random()*50;
			this.headx[i] = this.x[i];
			this.heady[i] = can_height - 250 +Math.random()*50;
			this.amp[i] = Math.random()*50+50;
		}
		
	}
	actnObj.prototype.draw = function(){
		this.alpha += deltaTime*0.0008;
		var dis = Math.sin(this.alpha);
		ctx2.save();
		ctx2.globalAlpha = 0.6;
		ctx2.lineWidth = 20;
		ctx2.strokeStyle = '#3b1541';
		ctx2.lineCap = 'round';	
		for(var j=0; j<this.num; j++){
			// console.log(this.headx[j]);
			ctx2.beginPath();
			ctx2.moveTo(this.x[j],can_height);
			this.headx[j] = this.x[j]+dis*this.amp[j];
			ctx2.quadraticCurveTo(this.x[j],can_height-80,this.headx[j], this.heady[j]);			
			ctx2.stroke();
		}
		ctx2.restore();
	}



	var fruitObj = function(){
		this.alive = [];
		this.orange = new Image();
		this.blue = new Image();
		this.x = [];
		this.y = [];
		this.size = [];
		this.spd = [];
		this.fruitType = [];
		this.actnNum = [];
	}
	fruitObj.prototype.num = 20;
	fruitObj.prototype.init = function(){
		for(var i=0; i<this.num; i++){
			this.alive[i] = false; 
			this.x[i] = 0;
			this.y[i] = 0;
			this.spd[i] = Math.random()*0.02+0.005;
			this.actnNum[i] = 0;
			this.born(i);
		}
		this.orange.src = 'images/fruit.png';
		this.blue.src = 'images/blue.png';		
	}
	fruitObj.prototype.draw = function(){
		var pic ; 
		for(var i=0; i<this.num; i++){
			if(this.alive[i]){
				var no = this.actnNum[i];
				if(this.fruitType[i] == 'orange'){
					pic = this.orange;
				}else{
					pic = this.blue;
				}
				if(this.size[i]<=16){
					this.x[i] = actn.headx[no];
					this.y[i] = actn.heady[no];
					this.size[i] += this.spd[i]*deltaTime;
				}else{
					this.y[i]-= this.spd[i]*deltaTime;
				}

				if(this.y[i]<=10){
					this.alive[i] = false;
				}
				ctx2.drawImage(pic,this.x[i]-this.size[i]*0.5,this.y[i]-this.size[i]*0.5,this.size[i],this.size[i]);
			}
			
		}
	}
	fruitObj.prototype.born = function(i){
		this.actnNum[i] = Math.floor(Math.random()*actn.num);
		this.size[i] = 0;
		this.alive[i] = true;
		var ran = Math.random();
		if(ran<0.2){
			this.fruitType[i] = 'blue';
		}else{
			this.fruitType[i] = 'orange';
		}		
	}

	var momObj = function(){
		this.x;
		this.y;
		this.angle;
		this.eye = new Image();
		this.body = new Image();
		this.tail = new Image();

		this.bigtailTimer = 0;
		this.bigtailCounter = 0;
	}
	momObj.prototype.init=function(){
		this.x = can_width*0.5;
		this.y = can_height*0.5;
		this.angle = 0;
		this.body.src = 'images/big.png';

		this.bigeyeTimer = 0;
		this.bigeyeCounter = 0;
		this.bigeyeInterval = 2000;
	}
	momObj.prototype.draw = function(){
		if(mouseX!=undefined&&mouseY!=undefined){

			this.x = lerpDistance(mouseX, this.x, 0.98);
			this.y = lerpDistance(mouseY, this.y, 0.98);

			var deltaX = this.x - mouseX;
			var deltaY = this.y - mouseY ;
			var beta = Math.atan2(deltaY,deltaX);

			this.angle = lerpAngle(beta,this.angle,0.6);
		}

		this.bigtailTimer += deltaTime;
		if(this.bigtailTimer>=50){
			this.bigtailCounter = (this.bigtailCounter+1)%8;
			this.bigtailTimer = this.bigtailTimer%50;
		}

		//bigeye
		this.bigeyeTimer+=deltaTime;
		if(this.bigeyeTimer>this.bigeyeInterval){
			this.bigeyeCounter = (this.bigeyeCounter+1)%2;
			this.bigeyeTimer%=this.bigeyeInterval;
			if(this.bigeyeCounter==0){
				this.bigeyeInterval = Math.random()*1500+2000;
			}else{
				this.bigeyeInterval = 200;
			}
		}

		ctx1.save();
		ctx1.translate(this.x,this.y);
		ctx1.rotate(this.angle);
		ctx1.drawImage(momtail[this.bigtailCounter], -momtail[this.bigtailCounter].width*0.5+30, -momtail[this.bigtailCounter].height*0.5);		
		ctx1.drawImage(this.body, -this.body.width*0.5, -this.body.height*0.5);
		ctx1.drawImage(momeye[this.bigeyeCounter], -momeye[this.bigeyeCounter].width*0.5, -momeye[this.bigeyeCounter].height*0.5);
		ctx1.restore();
	}

	var babyObj = function(){
		this.x;
		this.y;
		this.angle;
		this.eye = new Image();
		this.body = new Image();
		this.tail = new Image();

		this.babytailTimer = 0;
		this.babytailCounter = 0;

		this.babyeyeTimer = 0;
		this.babyeyeCounter = 0;
		this.babyeyeInterval = 2000;

		this.babybodyTimer = 0;
		this.babybodyCounter = 0;
	}
	babyObj.prototype.init = function(){
		this.x = can_width*0.5 + 60;
		this.y = can_height*0.5;
		this.angle = 0;
		this.body.src = 'images/baby.png';
	}
	babyObj.prototype.draw = function(){

		this.x = lerpDistance(mom.x, this.x, 0.98);
		this.y = lerpDistance(mom.y, this.y, 0.98);

		var deltaX = this.x - mom.x;
		var deltaY = this.y - mom.y ;
		var beta = Math.atan2(deltaY,deltaX);

		this.angle = lerpAngle(beta,this.angle,0.6);
		//babytail
		this.babytailTimer += deltaTime;
		if(this.babytailTimer>=50){
			this.babytailCounter = (this.babytailCounter+1)%8;
			this.babytailTimer = this.babytailTimer%50;
		}
		//babyeye
		this.babyeyeTimer+=deltaTime;
		if(this.babyeyeTimer>this.babyeyeInterval){
			this.babyeyeCounter = (this.babyeyeCounter+1)%2;
			this.babyeyeTimer%=this.babyeyeInterval;
			if(this.babyeyeCounter==0){
				this.babyeyeInterval = Math.random()*1500+2000;
			}else{
				this.babyeyeInterval = 200;
			}
		}

		this.babybodyTimer+=deltaTime;
		if(this.babybodyTimer>160){
			this.babybodyTimer %= 160;
			this.babybodyCounter = this.babybodyCounter+1;
			if(this.babybodyCounter>=19) 
			{
				this.babybodyCounter = 19;
				data.gameOver=true;
			}
		}
		ctx1.save();
		ctx1.translate(this.x,this.y);
		ctx1.rotate(this.angle);
		
		ctx1.drawImage(babytail[this.babytailCounter], -babytail[this.babytailCounter].width*0.5+30, -babytail[this.babytailCounter].height*0.5);
		ctx1.drawImage(babybody[this.babybodyCounter], -babybody[this.babybodyCounter].width*0.5, -babybody[this.babybodyCounter].height*0.5);
		ctx1.drawImage(babyeye[this.babyeyeCounter], -babyeye[this.babyeyeCounter].width*0.5, -babyeye[this.babyeyeCounter].height*0.5);

		ctx1.restore();
	}

	var dataObj = function(){
		this.fruitNum = 0;
		this.doub = 1;
		this.score = 0;
		this.gameOver = false;
	}

	dataObj.prototype.draw = function(){
		ctx1.fillStyle = 'white' ;
		ctx1.fillText('score: ' +this.score,can_width*0.5,can_height-100);
		if(this.gameOver){
			ctx1.fillText('GAMEOVER',can_width*0.5,can_height*0.5);
		}
	}
	dataObj.prototype.addScore = function(){
		this.score += this.fruitNum*100*this.doub
		this.fruitNum = 0;
		this.doub = 1;
	}

	var waveObj = function(){
		this.x = [];
		this.y = [];
		this.alive = [];
		this.r = [];
	}
	waveObj.prototype.num = 10;
	waveObj.prototype.init = function(){
		for(var i=0; i<this.num; i++){
			this.alive[i] = false;
			this.r[i] = 0;
		}
	}
	waveObj.prototype.draw = function(){
		ctx1.save();
		ctx1.lineWidth = 1;
		ctx1.shadowBlur = 6;
		ctx1.shadowColor = 'white';
		for(var i=0; i<this.num; i++){
			if(this.alive[i]){
				//draw
				this.r[i] += deltaTime*0.04;
				var alpha = 1-this.r[i]/50;
				if(this.r[i]>50){
					this.alive[i] = false;
					this.r[i] = 0;
					break;
				}
				
				ctx1.strokeStyle = 'rgba(255,255,255,'+alpha+')';
				
				ctx1.beginPath();
				ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
				ctx1.stroke();
			}
		}
		ctx1.restore();
	}
	waveObj.prototype.born = function(x,y){
		for(var i=0; i<this.num; i++){
			if(!this.alive[i]){
				//born
				this.alive[i] = true;
				this.r[i] =10;
				this.x[i] = x;
				this.y[i] = y;
				return;
			}
		}
	}

	var haloObj = function(){
		this.x = [];
		this.y = [];
		this.alive = [];
		this.r = [];
	}
	haloObj.prototype.num = 3;
	haloObj.prototype.init = function(){
		for(var i=0; i<this.num; i++){
			this.alive[i] = false;
			this.r[i] = 0;
		}
	}
	haloObj.prototype.draw = function(){
		ctx1.save();
		ctx1.lineWidth = 1;
		ctx1.shadowBlur = 6;
		ctx1.shadowColor = 'rgba(203,91,0,1)';
		for(var i=0; i<this.num; i++){
			if(this.alive[i]){
				//draw
				this.r[i] += deltaTime*0.05;
				var alpha = 1-this.r[i]/100;
				if(this.r[i]>100){
					this.alive[i] = false;
					this.r[i] = 0;
					break;
				}
				
				ctx1.strokeStyle = 'rgba(203,91,0,'+alpha+')';
				
				ctx1.beginPath();
				ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
				ctx1.stroke();
			}
		}
		ctx1.restore();
	}
	haloObj.prototype.born = function(x,y){
		for(var i=0; i<this.num; i++){
			if(!this.alive[i]){
				//born
				this.r[i] =10;
				this.x[i] = x;
				this.y[i] = y;
				this.alive[i] = true;
				return;
			}
		}
	}


	