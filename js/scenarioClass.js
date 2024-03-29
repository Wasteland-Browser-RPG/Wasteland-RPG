'use strict';
class scenario{
    constructor(enemies, encounterIntroText, encounterConclusionText,loot){
        this.enemies = enemies;
        this.encounterIntroText=encounterIntroText;
        this.encounterConclusionText=encounterConclusionText;
        this.loot=loot;
    }
    commence(){
        textLog.value+='\n'+ this.encounterIntroText;
    }
    conclude(){
        textLog.value+='\n' + this.encounterConclusionText;
        if(this.loot != undefined){
            console.log("should be adding to inventory");
            player.inventory.push(this.loot);
            inventoryDiv.innerHTML=renderInventory();
        }
    }
}

//Scenarios / Levels

var scenarioOne = new scenario([new character
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
    )],
    '\nAs you are scavenging in a dilapidated corner store a hostile scavenger bursts in, sees you and attacks.',
    '\nStuff that happens when this level is over.',
    new desertEagle45(0));

var scenarioTwo = new scenario([new character
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
    )],
    '\nThis is level two',
    '\nWow you beat level two.');

var scenarioSequence = [scenarioOne,scenarioTwo];

//scenario/level
var scenarioIterator = 0;
var currentScenario = scenarioSequence[scenarioIterator];

function beginScenario(){
    textLog.value+= currentScenario.encounterIntroText;
}

function progressToNextScenario(){
    scenarioIterator++;
    currentScenario=scenarioSequence[scenarioIterator];
}

