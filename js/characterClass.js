'use strict';
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

var levelUpPrompt = document.getElementById("levelUpPrompt");

class character {
    constructor(name, location, inventory, ammo, controlledByPlayer) {
        this.name = name;
        this.location = location;
        this.inventory = inventory;
        this.ammo = ammo;
        this.controlledByPlayer = controlledByPlayer;
        this.punchGood = 25 + statValueRoller();
        this.shootGood = 25 + statValueRoller();
        this.Toughness = 25 + statValueRoller();
        this.Agility = 25 + statValueRoller();
        this.hitPoints = Math.floor(this.Toughness / 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
        this.currentHP = this.hitPoints;
        this.moveDistance = Math.floor(this.Agility / 10);
        this.meleeDamageBonus = Math.floor(this.punchGood / 10);
        this.experiencePoints=0;
        this.level=1;
        this.dodgedThisRound=false;
        this.equippedRangedWeapon= this.inventory[0];
    }
    getMoveDistance() {
        return this.moveDistance;
    }
    getCurrentHP() {
        return this.currentHP;
    }

    getMeleeDamageBonus() {
        return this.meleeDamageBonus;
    }
    rangedEquip(weaponName){
        this.inventory.forEach((item)=>{
            if (item.name === weaponName){
                this.equippedRangedWeapon=item;
                return;
            }
        });
    }
    gainExperience(expGain){
        this.experiencePoints += expGain;
        textLog.value +="\nYou gained " + expGain + " experience points.";
        let nextLevelExpMark = this.getNextLevelExpMark()
        if (this.experiencePoints >= nextLevelExpMark){
            this.levelUp();
        }
    }
    levelUp(){
        this.level = this.level+1;
        textLog.value += "\nYour level increased to " + this.level +"."
        levelUpPrompt.innerHTML= `Select which stat you would like to improve.<br>` +
            `<input type="radio" id="punchGood" name="improvement_selection" value="PunchGood">
            <label for="punchGood">Punch Good: ${this.punchGood} +5</label><br>
            <input type="radio" id="shootGood" name="improvement_selection" value="ShootGood">
            <label for="shootGood">Shoot Good: ${this.shootGood} +5</label><br>
            <input type="radio" id="toughness" name="improvement_selection" value="Toughness">
            <label for="toughness">Toughness: ${this.Toughness} +5</label><br>
            <input type="radio" id="agility" name="improvement_selection" value="Agility">
            <label for="agility">Agility: ${this.Agility} +5</label><br>
            <input type="radio" id="hitPoints" name="improvement_selection" value="HitPoints">
            <label for="hitPoints">Hit Points: ${this.hitPoints} +1</label><br>
            <button onclick="levelUpStatImprovement()">Confirm</button>`;
        levelUpPrompt.style.display="block";
    //
    }
    getNextLevelExpMark(){
        let nextLevelExpMark = 0;
        for(let i = this.level; i > 0; i--){
            nextLevelExpMark += (i*100);
        }
        return nextLevelExpMark;
    }
    levelUpPunchGood(){
        let preImprovementPunchGood= this.punchGood;
        this.punchGood+=5;
        textLog.value+="\nYour Punch Good score increased from " + preImprovementPunchGood + " to " + this.punchGood + ".";
    }
    levelUpShootGood(){
        let preImprovementShootGood = this.shootGood;
        this.shootGood+=5;
        textLog.value+="\nYour Shoot Good score increased from " + preImprovementShootGood + " to " + this.shootGood + ".";
    }
    levelUpAgility(){
        let preImprovementAgility = this.Agility;
        this.Agility+=5;
        textLog.value+="\nYour Agility score increased from " + preImprovementAgility + " to " + this.Agility + ".";
    }
    levelUpToughness(){
        let preImprovementToughness = this.Toughness;
        this.Toughness+=5;
        textLog.value+="\nYour Toughness score increased from " + preImprovementToughness + " to " + this.Toughness + ".";
    }
    levelUpHP(){
        let preImprovementHP = this.hitPoints;
        this.hitPoints+=1;
        textLog.value+="\nYour Hit Point maximum increased from " + preImprovementHP + " to " + this.hitPoints + ".";
    }
}

var player = new character
("You",
    {x:1, y:1},
    [new nineMil(0),knife],
    {
        nineMm: {
            name: "9mm",
            amount: 0
        },
        desertEagle: {
            name: ".45",
            amount: 0
        }
    },
    true
);

function levelUpStatImprovement(e){
    let statToImprove = statImprovementSelection(e)
    switch(statToImprove) {
        case "PunchGood":
            player.levelUpPunchGood();
            break;
        case "ShootGood":
            player.levelUpShootGood();
            break;
        case "Toughness":
            player.levelUpShootGood();
            break;
        case "Agility":
            player.levelUpAgility();
            break;
        case "HitPoints":
            player.levelUpHP();
            break;
        default:
            console.log("This should never happen.")
    }
    levelUpPrompt.style.display="none";
    levelUpPrompt.innerHTML="";
}

function statImprovementSelection(e){
    console.log(e);
    let checkedOption = document.querySelector("input[type=\"radio\"]:checked");
    console.log(checkedOption);
    return checkedOption.value;
}



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