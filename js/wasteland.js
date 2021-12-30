var nineMil = {
    name: "9mm Pistol",
    info(){
        //code to put item info in log-text-area for players to read
    },
    isWeapon: true,
    ranged: true,
    magSize: 12,
    damage (){
        let crit = 0;
        let roll = Math.floor(Math.random()*10);
        if(roll ===10){
            crit = Math.floor(Math.random()*6);
            textLog.value += "\nA critical hit!";
        }
        return 1 + roll + crit;
    },
    ammoLeftInMag: Math.floor(Math.random()*12),
    multiAttack: 3
}
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
    })
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
    console.log("You clicked the attack button");
    let target = getTarget();
    if(attackTypeSelection.value === "Ranged"){

    }
}
function renderInventory(){
    let inventoryHtml = "";
    player.inventory.forEach(function(inventoryItem){
        inventoryHtml += '<button id="' + inventoryItem.name + 'Button"> ' + inventoryItem.name + "</button>";
    })
}

var player = {
    name: "You",
    location: {
        x: 1,
        y: 1
    },
    inventory: [
        nineMil,knife
    ],
    punchGood: 25+statValueRoller(),
    shootGood: 25+statValueRoller(),
    Toughness: 25+statValueRoller(),
    Agility: 25+statValueRoller(),
    //setting an object property in it's instantiation to be based on another property doesn't work so we gotta make a getter function
    //https://stackoverflow.com/questions/4616202/self-references-in-object-literals-initializers
    get Move() { delete this.Move;
        return this.Move = Math.floor(player.Agility/10);
        },
    get HP(){ delete this.HP;
        return this.HP = Math.floor(player.Toughness/10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
        },
    get currentHP(){ delete this.currentHP;
        return this.currentHP = this.HP;
    },
    get meleeDamageBonus(){
        delete this.meleeDamageBonus;
        return this. meleeDamageBonus = Math.floor(player.punchGood/10);
    }
}

var scavenger = {
    name: "Scavenger",
    location: {
        x: 3,
        y: 1
    },
    inventory: [
        nineMil,knife
    ],
    punchGood: 25+statValueRoller(),
    shootGood: 25+statValueRoller(),
    Toughness: 25+statValueRoller(),
    Agility: 25+statValueRoller(),
    //setting an object property in it's instantiation to be based on another property doesn't work so we gotta make a getter function
    //https://stackoverflow.com/questions/4616202/self-references-in-object-literals-initializers
    get Move() { delete this.Move;
        return this.Move = Math.floor(player.Agility/10 * 2);
    },
    get HP(){ delete this.HP;
        return this.HP = Math.floor(player.Toughness/10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
    },
    get currentHP(){ delete this.currentHP;
        return this.currentHP = this.HP;
    },
    get meleeDamageBonus(){
        delete this.meleeDamageBonus;
        return this. meleeDamageBonus = Math.floor(player.punchGood/10);
    }
}

var charactersArray = [player,scavenger];

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


moveButton.addEventListener("click", moveButtonClick);
attackButton.addEventListener("click", attackButtonClick);