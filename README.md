#BlackJack 

HTML/CSS Practice

###Setup the table using Bootstrap. 
Create a dealers and players hand to hold the totals.  
Set each card to custom width;
Add 3 buttons to bottom of table for user interaction.
Bind each button to a JQUERY click and call correct function depending on the click.


### Wrote some JS.
Binds each button to a JQuery click funtion
--bind a funcion called deal ot the deal button.
--when called, it will create aa deck in default order, then swap two cards in array x times;
--After the deck is shuffled, playerHand and dealerHand arrays created with 0,2 and 1,3 cards in deck array.
--then placeCard function is called which takes 3 params--playerHand array, who's turn, and slot card goes in.
--placeCard removes empty class and updates hmtl to use the card value.
--calculateTotal funciton is then called which is sent two parameters-plaeryHand array and who's turn.
--it slices each card in array via a loop and removes letter on teh end.  result is turned into number.
--total is updated with new number.


### More JS
--Disabled buttons after bust or win.
--Added reset button.  
