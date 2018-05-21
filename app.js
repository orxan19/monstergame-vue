new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false, // Indicate when game is start or stop
		logs: [], // Display logs
		healIteration: 0, // Put limit when player want to heal many times 
		killYouIteration: 0, // Display message when player want to heal many many times
		specialAttackLimitation: 0,  // Limit for special attack
		healMax: 17,
		healMin: 7
	},
	methods:{
		startGame: function(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.logs = [];
			this.killYouIteration = 0;
			this.healIteration =  0;
			this.specialAttackLimitation = 0;
		},
		attack: function(){
			this.playerAttack(10, 8);

			if(this.checkWin()){
				return;
			}
			this.monsterAttack(13, 11);
			this.checkWin();

		},
		specialAttack: function(){
			this.specialAttackLimitation++;
			if(this.specialAttackLimitation < 4){
				this.playerAttack(15, 11);
				if(this.checkWin()){
					return;
				}
				this.monsterAttack(12, 9);
				this.checkWin();
			} else{
				this.setLog(false, 'You have not any special attacks');
			}
			
		},
		heal: function(){
			if(this.playerHealth < 90){
				if(this.healIteration < 4){
					heal = Math.floor(Math.random()*(this.healMax-this.healMin+1)+this.healMin);;
					this.playerHealth += heal;
					this.healIteration++;
					this.monsterAttack(11, 10);
					this.setLog(true, 'Player heals for ' + heal + ' hp');
					if(this.checkWin()){
						return;
					}
				} else{
					this.killYouIteration++;
					if(this.killYouIteration > 5){
						this.setLog(false, 'Just kill yourself');
						return;
					}
					this.setLog(false, 'You can not healing over 4 times');
				}
				
			}
			
		},
		giveUp: function(){
			if(confirm('Are you sure to give up?')){
				this.startGame();
			}
		},
		calculateDamage: function(max, min){
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		checkWin: function(){
			if(this.monsterHealth <= 0){
				this.monsterAttack(12, 9);
				if(this.playerHealth <= 0){
					if(confirm('Draw. Continue?')){
						this.startGame();
					} else{
						this.gameIsRunning = false;
					}
					return true;
				}	
				if(confirm('You win. Continue?')){
					this.startGame();
				} else{
					this.gameIsRunning = false;
				}
				return true;
			} else if(this.playerHealth <= 0){
				if(confirm('You lose. Continue?')){
					this.startGame();
				} else{
					this.gameIsRunning = false;
				}
				 return true;
			}
			return false;
		},
		monsterAttack: function(max, min){
			var damage = this.calculateDamage(max, min);
			this.playerHealth -= damage;
			this.setLog(false, 'Monster hits player for ' + damage + ' hp');
		},
		playerAttack: function(max, min){
			var damage = this.calculateDamage(max, min);
			this.monsterHealth -= damage;
			this.setLog(true, 'Player hits monster for ' + damage + ' hp');
		},
		setLog: function(isPlayer, text){
			this.logs.unshift({
				isPlayer: isPlayer,
				text: text
			});
		}
	}

});