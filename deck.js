function shuffleDeck(){
	theDeck = [];
	var x = 0;
	var y = 0;
	for(var s = 1; s <= 4; s++)	{
		var suit = "";
		if(s === 1){
			suit = "h";
			y = "0px";
			x = 0;
		}else if(s===2){
			suit = "d";
			y = "-120px";
			x = 0;
		}else if(s===3){
			suit = "c";
			y = "-240.5px";
			x = 0;
		}else if(s===4){
			suit = "s";
			y = "-361px";
			x = 0;
		}
		for(var i = 2; i <= 14; i++){
			var valueToPush = [];
			valueToPush[0] = (i+suit);
			valueToPush[1] = x;
			valueToPush[2] = y;
			theDeck.push(valueToPush);
			x = (x - 86.2);
		}
		console.log(theDeck.length);
	}
	var numberOFTimesToShuffle = 500;
	for(var i = 1; i < numberOFTimesToShuffle; i++){
		card1 = Math.floor(Math.random()*theDeck.length);
		card2 = Math.floor(Math.random()*theDeck.length);
		if(card1 != card2){
			temp = theDeck[card1];
			theDeck[card1] = theDeck[card2];
			theDeck[card2] = temp;
		}
	}
}