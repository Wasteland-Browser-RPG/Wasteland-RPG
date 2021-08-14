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
        if(getDistance(characterLocationObject, specificMapSquare) <= characterMoveStat){
            arrayOfSquaresThisCharacterCanMoveTo.push(specificMapSquare);
        }
    })
    return arrayOfSquaresThisCharacterCanMoveTo;
}
function moveButtonClick(){
    console.log("You clicked the move button");
}
function attackButtonClick(){
    console.log("You clicked the attack button");
}
function renderInventory(){
    let inventoryHtml = "";
    player.inventory.forEach(function(inventoryItem){
        inventoryHtml += '<button id="' + inventoryItem.name + 'Button"> ' + inventoryItem.name + "</button>";
    })
}

var player = {
    location: {
        x: 3,
        y: 1
    },
    inventory: [
        nineMil,knife
    ],
    PunchGood: 25+statValueRoller(),
    ShootGood: 25+statValueRoller(),
    Toughness: 25+statValueRoller(),
    Agility: 25+statValueRoller(),
    //setting an object property in it's instantiation to be based on another property doesn't work so we gotta make a getter function
    //https://stackoverflow.com/questions/4616202/self-references-in-object-literals-initializers
    get Move() { delete this.Move;
        return this.Move = Math.floor(player.Agility/10 * 2);
        },
    get HP(){ delete this.HP;
        return this. HP = Math.floor(player.Toughness/10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
        },
    get currentHP(){ delete this.currentHP;
        return this.currentHP = Math.floor(player.Toughness/10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
    },
    get meleeDamageBonus(){
        delete this.meleeDamageBonus;
        return this. meleeDamageBonus = Math.floor(player.PunchGood/10);
    }
}
console.log(player.HP);
console.log(player.currentHP);
console.log(player.Move);
console.log(player.meleeDamageBonus);

var nineMil = {
    name: "9mm Pistol",
    info(){
        //code to put item info in log-text-area for players to read
    },
    isWeapon: true,
    magSize: 12,
    damage (){
        let crit = 0;
        let roll = Math.floor(Math.random()*10)
        if(roll ===10){
            crit = Math.floor(Math.random()*6)
        }
        return 1 + roll + crit;
    },
    multiAttack: 3
}
var knife = {
    name: "Knife",
    isWeapon: true,
    info (){
        //code to put item info in log-text-area for players to read
    },
    damage(characterPunchGoodBonus){
        let crit = 0;
        let roll = Math.floor(Math.random()*10)
        if(roll ===10){
            crit = Math.floor(Math.random()*6);
            //TODO log damage and when there's a crit. Maybe that can go with the call?
        }
        return characterPunchGoodBonus + roll + crit;
    }
}

//Listeners
var attackButton = document.getElementById("attackButton");
var moveButton = document.getElementById("moveButton");

moveButton.addEventListener("click", moveButtonClick);
attackButton.addEventListener("click", attackButtonClick);