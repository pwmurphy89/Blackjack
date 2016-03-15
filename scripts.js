var theDeck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;

$(document).ready(function() {
	$("button").click(function() {
		var clickedButton = ($(this).attr("id"));
		if(clickedButton == "draw-button") {
			reset();
			deal();
		}else if(clickedButton == "hit-button"){
			hit();
		}else if(clickedButton == "stand-button"){
			stand();
		}

	});
	function deal() {
		shuffleDeck();
		playerHand = [theDeck[0],theDeck[2]];
		dealerHand = [theDeck[1], theDeck[3]];
		placeInDeck = 4;
		placeCard(playerHand[0], "player", "one",500);
		placeCard(dealerHand[0],"dealer","one",500);
		placeCard(playerHand[1], "player", "two",1000);
		calculateTotal(playerHand, "player");
		calculateTotal(dealerHand, "dealer");
	
	
	}

	function placeCard(card, who, slot,delay) {
		setTimeout(function() {
			var currId = "#" + who + "-card-" + slot;
			// if (currId != "#dealer-card-two") {
		
		 	$(currId).removeClass("empty");
		 	$(currId).html(card);
	
			// }
		}, delay)
	}


	function calculateTotal(hand, who){
		var total = 0;
		var hasAce = false;
		for(i=0;i<hand.length;i++){
			var cardvalue = Number(hand[i].slice(0, -1));
			if (cardvalue > 10) {
				cardvalue = 10;
			}
			if (cardvalue == 1 && total < 11) {
				cardvalue = 11;
				hasAce = true;
			}


				total += cardvalue;
		}

		if(total > 21 && hasAce) {
			total -= 10;
		}


		var idToGet = "." + who + "-total";
		//setTimeout(function(){
	 	$(idToGet).html(total);
	 	//}, 500);
	
		if (total > 21){
			bust(who);
			placeCard(dealerHand[1],"dealer","two",500);
			$(".dealer-total").removeClass("hide");
			$("#hit-button").prop("disabled", "true");
			$("#stand-button").prop("disabled", "true");
		}
	}

//s1 = hearts, s2=spades, s3 = diamonds, s4 = clubs
	function shuffleDeck() {
		theDeck =[];
	
		for(s=1; s<=4; s++){
			var suit = "";
			if (s === 1) {
				suit="h";
			}else if(s === 2){
				suit="s";

			}else if(s ===3) {
				suit="d";
			}else if(s === 4){
				suit="c";
			}
			for(i=1;i<=13; i++){
				theDeck.push(i+suit);
			}
		}
	var numberOfTimesToShuffle = 500;
	for(i=1; i<numberOfTimesToShuffle;i++) {
		card1 = Math.floor(Math.random() * 52);
		card2 = Math.floor(Math.random() * 52);
		if(card1 !== card2) {
			temp = theDeck[card1];
			theDeck[card1] = theDeck[card2];
			theDeck[card2] = temp;
		}
	}



	






function hit() { 
	var slot = "";
	if(playerTotalCards == 2) {
		slot = "three";
	}else if(playerTotalCards == 3) {
		slot="four";
	}else if(playerTotalCards == 4) {
		slot = "five";
	}else if(playerTotalCards == 5) {
		slot="six";
	}
	setTimeout(function() {
	placeCard(theDeck[placeInDeck], "player", slot,500);
	playerHand.push(theDeck[placeInDeck]);
	placeInDeck++;
	playerTotalCards++;
	calculateTotal(playerHand, "player");
	}, 600);


function stand() {
	var dealerTotal = $(".dealer-total").html();
	// or you could write--var dealerHas = calculateTotal(dealerHand, "dealer");
	while(dealerTotal < 17) {
		if(dealerTotalCards == 2){
			slot = "three";
	}else if(playerTotalCards == 3) {
		slot="four";
	}else if(playerTotalCards == 4) {
		slot = "five";
	}else if(playerTotalCards == 5) {
		slot="six";
	}
	placeCard(theDeck[placeInDeck],"dealer", slot,500);
	dealerHand.push(theDeck[placeInDeck]);
	dealerTotalCards++;
	placeInDeck++;
	calculateTotal(dealerHand, "dealer");
	dealerTotal = $(".dealer-total").html();
	}

	checkWin();
}

function checkWin() {
	$(".dealer-total").removeClass("hide");
	placeCard(dealerHand[1],"dealer","two",500);
	var playerHas = Number($(".player-total").html());
	var dealerHas = Number($(".dealer-total").html());
	if(dealerHas > 21){
		bust("dealer");
		
		

		//The delaer has busted
	}else{
		//Neither has busted, dealer has atleast 17.
		if(playerHas > dealerHas){
			$("#message").html("You have beaten the dealer!");
			$("#hit-button").prop("disabled", "true");
			$("#stand-button").prop("disabled", "true");

	
			//PLayer won
		}else if (dealerHas > playerHas){
			$("#message").html("Sorry, dealer won!");
			$("#hit-button").prop("disabled", "true");
			$("#stand-button").prop("disabled", "true");

		
			//Dealer won
		}else {
			$("#message").html("Tied!");
			$("#hit-button").attr("disabled");
			$("#stand-button").attr("disabled");

			//Tie
		}
	}
}
 

function bust(who){
	if(who === "player"){
		$("#message").html("You have busted!");


	}else {
		$("#message").html("Dealer has busted!");
	}
}



function reset() {
	$(".card").addClass("empty");

	$(".player-total").html(0);
	$(".dealer-total").html(0);
	$(".dealer-total").addClass("hide");
	$("#message").html("");
	$(".card").html('');
	$("#hit-button").removeAttr("disabled");
	$("#stand-button").removeAttr("disabled");
	playerTotalCards = 2;
	dealerTotalCards = 2;


}

});