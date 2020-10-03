class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500,100,100);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500,100,100);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();

                if(allPlayers !== undefined){
                 image(back_img, 0, 0, 1000, 800);
                 textSize(20);
                 fill(255);
                 text("Score to win: 50", 450,60);
                 text(player.name+" (You): "+player.score,100,200);

                 var otherPlayerIndex;
                 otherPlayerScore;
                 otherPlayerName;
                 if(player.index === 1){
                    otherPlayerIndex = 2;
                 }
                 else if(player.index === 2){
                     otherPlayerIndex = 1;
                 }
                 var otherPlayerScoreRef = database.ref('players/player'+otherPlayerIndex+'/score');
                 otherPlayerScoreRef.on("value", (data) => {
                    otherPlayerScore = data.val();
                 })
                 var otherPlayerNameRef = database.ref('players/player'+otherPlayerIndex+'/name');
                 otherPlayerNameRef.on("value", (data) => {
                    otherPlayerName = data.val();
                 })

                 text(otherPlayerName+": "+otherPlayerScore,100,250);
                 var x;
                 var y;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index-1].x = x;
                     players[index-1].y = y;
                 }
                
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                     
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0 && player.index !== null) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.visible = true;
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     fruitsArray.push(fruits);                     
                 }
                 
                  if (player.index !== null) {
                     //fill code here, to destroy the objects.
                     for(var i = 0; i<fruitsArray.length; i++){
                        if(fruitsArray[i].isTouching(players[player.index-1])){
                            fruitsArray[i].destroy();
                            player.score++;
                            player.update();
                            //fruitsArray.splice(i);
                        }
                     }
                  }

        

                  
                

         
         
        
         

    }

    end(){
        console.log(player.score);
       textSize(120);
       text("Game Over", 200, 350);
       if(player.index >= 9){
           textSize(50)
           text(player.name+" Wins!", 200,400);
       }
       else {
           textSize(50);
           text(otherPlayerName+" Wins!", 200, 400);
       }
    }
}