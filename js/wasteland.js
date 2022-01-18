//todo: Make the nineMil a class, because currently the player and scavenger SHARE THE EXACT SAME GUN
//Scavenger's gun has the same # of rounds in it as the players because they are THE SAME
// var nineMil = {
//     name: "9mm Pistol",
//     info(){
//         //code to put item info in log-text-area for players to read
//     },
//     isWeapon: true,
//     ranged: true,
//     magSize: 12,
//     damage (){
//         let crit = 0;
//         let roll = Math.floor(Math.random()*10);
//         if(roll ===10){
//             crit = Math.floor(Math.random()*6);
//             textLog.value += "\nA critical hit!";
//         }
//         return 1 + roll + crit;
//     },
//     ammoLeftInMag: Math.floor(Math.random()*12),
//     multiAttack: 3
// }

var knife = {
    name: "Knife",
    isWeapon: true,
    ranged: false,
    info (){
        //code to put item info in log-text-area for players to read
    },
    damage(characterPunchGoodBonus){
        let crit = 0;
        let roll = Math.floor(Math.random()*10)
        if(roll ===10){
            crit = Math.floor(Math.random()*6);
            //TODO log damage and when there's a crit. Maybe that can go with the call?
            textLog.value += "\nA critical hit!";
        }
        return characterPunchGoodBonus + roll + crit;
    }
}

function statValueRoller(){
    let dTenOne = Math.ceil(Math.random()*10);
    let dTenTwo = Math.ceil(Math.random()*10);
    let dTenThree = Math.ceil(Math.random()*10);
    console.log(dTenOne + " " + dTenTwo + " " + dTenThree);
    if(dTenOne <= dTenTwo && dTenOne <= dTenThree){
        return dTenTwo+dTenThree;
    } else if (dTenTwo <= dTenThree && dTenTwo <= dTenOne){
        return dTenOne+dTenThree;
    } else {
        return dTenOne+dTenTwo;
    }
}

function getDistance(locationObj, destinationObj){
    //takes in objects with properties x & y
    //returns the number of spaces between them
    return Math.abs(locationObj.x - destinationObj.x) + Math.abs(locationObj.y - destinationObj.y);
}

function getLegalMoves(arrayOfAllMapSquares, characterLocationObject, characterMoveStat){
    //this will get way more complicated with walls and difficult terrain but for now it's fine
    let arrayOfSquaresThisCharacterCanMoveTo = [];
    arrayOfAllMapSquares.forEach(function (specificMapSquare){
        if(getDistance(characterLocationObject, specificMapSquare) <= characterMoveStat && getDistance(characterLocationObject, specificMapSquare) !== 0){
            arrayOfSquaresThisCharacterCanMoveTo.push(specificMapSquare);
        }
    });
    return arrayOfSquaresThisCharacterCanMoveTo;
}

function activateMoveButton(arrayOfSquaresYouCanMoveTo){
    arrayOfSquaresYouCanMoveTo.forEach(function (square){
        document.querySelector("#button" + square.x + "-" + square.y +"").style.setProperty('display','inline');
    });
}

function moveButtonClick(){
    console.log("You clicked the move button");

    activateMoveButton(getLegalMoves(allSquares, player.location, player.Move));
}

function moveHereClick(x, y){
   if (confirm('Are you sure you wish to move here?')){
       player.location = {
           x: x,
           y: y
       }
       hideMoveHere();
       //document.getElementById('moveButton').setAttribute('disabled', 'true');
       textLog.value += '\nYou have moved to ' + player.location.x + ', ' + player.location.y + '.';
       //renderLocation()
   }
}

//alternate to moving, you can take aim and get +10 to your aim stat. Will add function later

function hideMoveHere(){
    allSquares.forEach(function (square){
        document.querySelector("#button" + square.x + "-" + square.y +"").style.setProperty('display','none');
    });
}

function getTarget(){

}

function attackButtonClick(){
    let target = getTarget();
    // if(attackTypeSelection.value === "Ranged"){
    //
    // }
}

function renderInventory(){
    let inventoryHtml = "";
    player.inventory.forEach(function(inventoryItem) {
        if (inventoryItem.isWeapon && inventoryItem.ranged) {
            inventoryHtml += '<button id="' + inventoryItem.name + 'Button" title="In clip: '+ inventoryItem.ammoLeftInMag+'" onclick="player.rangedEquip('+ inventoryItem.name +')"> ' + inventoryItem.name + "</button><br>";
        }else{
            inventoryHtml += '<button id="' + inventoryItem.name + 'Button"> ' + inventoryItem.name + "</button><br>";
        }
    });
    inventoryHtml += player.ammo.nineMm.name +": "+ player.ammo.nineMm.amount +"<br>";
    return inventoryHtml;
}

var player = new character
    ("You",
    {x:1, y:1},
    [new nineMil(0),knife],
        {
                nineMm: {
                    name: "9mm",
                    amount: 0
                    }
                },
true
    );

var scavenger = new character
("Scavenger",
    {x:3, y:1},
    [new nineMil(0),knife],
    {
        nineMm: {
            name: "9mm",
            amount: 0
        }
    },
    false
);


var charactersArray = [player,scavenger];

var levelTwoFoes = [new character("Scavenger",
    {x:3, y:1},
    [nineMil,knife],
    {
        nineMm: {
            name: "9mm",
            amount: 0
        }
    },
    false
)];

console.log(player.HP);
console.log(player.currentHP);
console.log(player.Move);
console.log(player.meleeDamageBonus);


function createTwelveByTwelveArray(){
    var x = 1;
    var y = 1;
    var twelveByTwelve = [];
    while(y < 13){
        twelveByTwelve.push({
            x: x,
            y: y
        });
        x++;
        if (x === 13){
            x=1;
            y++;
        }
    } return twelveByTwelve;
}

function attackSelection(){
    if(attackTypeSelection.value ==="Melee"){
        aimButton.disabled = true;
        if(playerQueuedActions[0]==="Aim" || playerQueuedActions[1]==="Aim"){
            clearActions();
        }
    }else{
        aimButton.disabled = false;
    }
}

var allSquares = createTwelveByTwelveArray();
    // {name: '1-1', x:1, y:1},
    // {name: '2-1', x:2, y:1},
    // {name: '3-1', x:3, y:1},
    // {name: '4-1', x:4, y:1}

//Listeners
var attackButton = document.getElementById("attackButton");
var moveButton = document.getElementById("moveButton");
var attackTypeSelection = document.getElementById("attack-type-selection");
var textLog = document.getElementById('gameLog');
var aimButton = document.getElementById('aimButton');
var clearActionsButton = document.getElementById("clearActions");
var confirmActionsButton = document.getElementById("confirmActions");
var inventoryDiv = document.getElementById('inventory');


moveButton.addEventListener("click", moveButtonClick);
attackButton.addEventListener("click", attackButtonClick);
inventoryDiv.innerHTML= renderInventory();