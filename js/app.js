

//碰撞函数
var overLap= function(f1,f2){
return ((f1.x+f1.width-f2.x)>0)&&((f2.x+f2.width-31-f1.x)>0);
};
//随机数生成函数
var randomNumber= function(nums){
	var numIndex=Math.floor(Math.random()*nums.length);
	return nums[numIndex];	
};

// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x=0;
    this.y= randomNumber([65,150,235]); //随机出现的列
    this.width=101;
    this.height=101;
    this.speed =randomNumber([100,150,200,250,300,350,400]); //随机速度
    
};
var allEnemies=[];
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
	this.x+=this.speed*dt;
};
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player= function(){
	this.sprite = 'images/char-boy.png';
	this.x=200;
	this.y=380;
	this.width=70;
    this.height=101;
};

Player.prototype.update= function(){
	for (i=0; i<allEnemies.length; i++){
		if((this.y==allEnemies[i].y-25)&&overLap(this,allEnemies[i])){
			this.y=380; 					//判断碰撞并复位player 位置
			alert("Game over")
		}
}};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	
};

//识别键盘输入操作
Player.prototype.handleInput=function(keyCode){
	    if(keyCode === 'left'){
        if(this.x - 101 < 0){ 
            this.x = 0;  
        } else {
            this.x -= 100; 
        }  
    } else if(keyCode == 'up'){
        if(this.y - 85 < 0){ 
   
            this.y =  380; 
            alert("Congratulations!") //过关并复位player 位置
        }
         else {
            this.y -= 85; 
        } 
    } else if(keyCode == 'right'){ 
         if(this.x + 101 > 400){
                this.x = 400; 
            } else {
                this.x += 100; 
            }
        } else if(keyCode == 'down') { 
            if(this.y + 85 > 380) {  
            	this.y = 380;
            } else {
                this.y += 85; 
            } 
        
    }
	
};
	
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

//移除跑出屏幕的enemy 函数
 var removeEnemy=function(){
		    allEnemies.forEach(function(enemy, index) {
     if(enemy.x > 505){
        allEnemies.splice(index, 1);
        }
    });
    
};
//随机时间生成enemy 实例， 并放入allEnemies 数组，函数
var createEnemy= function(){
	allEnemies.push(new Enemy());
	removeEnemy();
	var delay= randomNumber([500,800,1200]);
    setTimeout(createEnemy,delay);
    

};

createEnemy(); //创建Enemy 实例
var player= new Player(); // 创建player 实例

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
