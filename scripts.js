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
			$(".player-total").removeClass("hide");
		}else if(clickedButton == "stand-button"){
			stand();
			$(".player-total").removeClass("hide");
		}
	});

	function deal() {
		shuffleDeck();
		playerHand = [theDeck[0],theDeck[2]];
		dealerHand = [theDeck[1], theDeck[3]];
		placeInDeck = 4;
		placeCard(playerHand[0], "player", "one",500);
		placeCard(dealerHand[0],"dealer","one",500);
		placeCard(playerHand[1], "player", "two", 1000, true);
	};

	function placeCard(card, who, slot, delay, delayTotal) {
		setTimeout(function() {
			var currId = "#" + who + "-card-" + slot;
			$(currId).removeClass("empty");
			// $(currId).html(card.name);
			var position = (card.x + card.y);
			$(currId).css("background-position", position);
				if(delayTotal) {
					calculateTotal(playerHand, "player");
					calculateTotal(dealerHand, "dealer");
					$(".player-total").removeClass("hide");
				}
		}, delay)

	};

	function calculateTotal(hand, who){
		var total = 0;
		var hasAce = false;
		for(i=0;i<hand.length;i++){
			var cardvalue = Number(hand[i].name.slice(0, -1));
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
		$(idToGet).html(total);
	 	if (total > 21){
	 		bust(who);
	 		placeCard(dealerHand[1],"dealer","two",500,true);
	 		setTimeout(function(){$(".dealer-total").removeClass("hide");}, 500);
	 		$("#hit-button").prop("disabled", "true");
	 		$("#stand-button").prop("disabled", "true");
	 	}
	 };
 //c:clubs/ s:spades/ h:hearts/ d:diamonds
	function shuffleDeck() {
		theDeck =[];
		var x = -1;
		var y = 0;
		for(s=1; s<=4; s++){
			var suit = "";
			if (s === 1) {
				suit="c";
				y = 0;
			}else if(s === 2){
				suit="s";
				y=98;
			}else if(s ===3) {
				suit="h";
				y=196;
			}else if(s === 4){
				suit="d";
				y=294;
			}
			//starting with Ace = 1; King = 13
			//subtract 73px each time through
			for(i=1;i<=13; i++){
				var newCard = new Object();
				newCard.name = i + suit;
				newCard.y = y +'px';
				newCard.x = x + 'px '; 
				theDeck.push(newCard);
				x -= 73;
			}
		}
		console.log(theDeck);

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
	};

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
		placeCard(theDeck[placeInDeck], "player", slot,500, true);
		playerHand.push(theDeck[placeInDeck]);
		placeInDeck++;
		playerTotalCards++;
	};

	function stand() {
		setTimeout(function(){$(".dealer-total").removeClass("hide");}, 500);
		var dealerTotal = $(".dealer-total").html();
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
		setTimeout(function(){$(".dealer-total").removeClass("hide");}, 500);
		placeCard(dealerHand[1],"dealer","two",500,true);
		var playerHas = Number($(".player-total").html());
		var dealerHas = Number($(".dealer-total").html());
		if(dealerHas > 21){
			bust("dealer");
		}else{
			if(playerHas > dealerHas){
				$("#message").html("You have beaten the dealer!");
				$("#hit-button").prop("disabled", "true");
				$("#stand-button").prop("disabled", "true");
			}else if (dealerHas > playerHas){
				$("#message").html("Sorry, dealer won!");
				$("#hit-button").prop("disabled", "true");
				$("#stand-button").prop("disabled", "true");
			}else {
				$("#message").html("Tied!");
				$("#hit-button").attr("disabled");
				$("#stand-button").attr("disabled");
			}
		}
	};

	function bust(who){
		if(who === "player"){
			$("#message").html("You have busted!");
		}else{
			$("#message").html("Dealer has busted!");
		}
	};

	function reset() {
		var emptyPosition = "-6px -6px";
		$(".card").addClass("empty");
		$(".card").css("background-position", emptyPosition);
		$(".player-total").html(0);
		$(".dealer-total").html(0);
		$(".dealer-total").addClass("hide");
		$("#message").html("");
		$(".card").html('');
		$("#hit-button").removeAttr("disabled");
		$("#stand-button").removeAttr("disabled");
		playerTotalCards = 2;
		dealerTotalCards = 2;
		placeInDeck = 0;
	};

});