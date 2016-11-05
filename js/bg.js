
	var ctx1;
	var ctx2;
	var lastTime;
	var deltaTime;
	var bg_pic = new Image();
	var can_width;
	var can_height;
	var actn;
	var fruit;
	var mom;
	var baby;
	var mouseX;
	var mouseY;
	var babytail = [];
	var momtail = [];
	var babyeye = [];
	var momeye = [];
	var babybody = [];
	var data;
	var wave;
	var halo;

	document.body.onload = game;

		function game(){
			init();
			lastTime = Date.now();
			deltaTime = 0;
			gameloop();
		}

		function init(){
			can1 = document.getElementById('canvas1');
			ctx1 = can1.getContext('2d');
			can2 = document.getElementById('canvas2');
			ctx2 = can2.getContext('2d');

			can1.addEventListener('mousemove',fish_mousemove,false);

			can_width = can1.width;
			can_height = can1.height;
			bg_pic.src = 'images/background.jpg';

			actn = new actnObj();
			actn.init();

			fruit = new fruitObj();
			fruit.init();

			mom = new momObj();
			mom.init();

			baby = new babyObj();
			baby.init();

			for(var i=0; i<8 ;i++){
				babytail[i] = new Image();
				momtail[i] = new Image();
				babytail[i].src = 'images/babyTail'+i+'.png';
				momtail[i].src = 'images/bigTail'+i+'.png';
			}

			for(var i=0; i<2; i++){
				babyeye[i] = new Image();
				momeye[i] = new Image();
				babyeye[i].src = 'images/babyEye'+i+'.png';
				momeye[i].src = 'images/bigEye'+i+'.png';
			}

			for(var i=0; i<20;i++){
				babybody[i] = new Image();
				babybody[i].src = 'images/babyFade'+i+'.png';
			}

			data = new dataObj();

			ctx1.font = "30px Verdana";
			ctx1.textAlign = 'center';

			wave = new waveObj();
			wave.init();

			halo = new haloObj();
			halo.init();
		}
		function gameloop(){
			requestAnimFrame(gameloop);
			var now = Date.now();
			deltaTime = now-lastTime;
			if(deltaTime>40){ deltaTime=40; }
			lastTime = now;
			drawBg();
			fruitMonitor();

			ctx1.clearRect(0,0,can_width,can_height);
			mom.draw();
			baby.draw();

			clision();
			momBabyClision();
			data.draw();
			wave.draw();
			halo.draw();
			
		}
		function drawBg(){
			ctx2.drawImage(bg_pic,0,0,can_width,can_height);
			actn.draw();
			fruit.draw();
		}


		function fruitMonitor(){
			var count = 0;
			for(var i=0; i<fruit.num; i++){
				if(fruit.alive[i]) count++;
			}
			if(count < 15){
				sendFruit();
				return;
			}
		}

		function sendFruit(){
			for(var i=0; i<fruit.num; i++){
				if(!fruit.alive[i]){
					fruit.born(i);
					return;
				}
				
			}
		}

		function fish_mousemove(e){
			if(e.offSetX||e.layerX&&!data.gameOver){
				mouseX = e.offSetX==undefined ? e.layerX: e.offSetX;
				mouseY = e.offSetY==undefined ? e.layerY: e.offSetY;
			}
		}

		//大鱼和果实的碰撞检测
		function clision(){
			if(!data.gameOver){
				for(var i=0; i<fruit.num; i++){
					if(fruit.alive[i]){
						var dis = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
						if(dis<900){
							fruit.alive[i] = false;
							data.fruitNum ++;
							if(fruit.fruitType[i] == 'blue'){
								data.doub = 2;
							}
							wave.born(fruit.x[i],fruit.y[i]);
						}
					}
				}
			}
		}

		//大鱼碰小鱼
		function momBabyClision(){
			if(!data.gameOver){
				var dis = calLength2(baby.x,baby.y,mom.x,mom.y);
				if(dis<900){
					if(data.fruitNum>0){
						baby.babybodyCounter = 0;
					}
					
					mom.mombodyCounter = 0;
					data.addScore();
					halo.born(baby.x,baby.y);
				}
			}
		}