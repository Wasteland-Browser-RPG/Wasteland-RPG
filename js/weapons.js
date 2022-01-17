'use strict';

class nineMil{
    constructor(qualityBonus) {
        this.name="9mm Pistol";
        this.isWeapon=true;
        this.ranged=true;
        this.magSize=12;
        //maybe incorporate a quality thing kinda like a +1 broadsword in D&D?
        this.qualityBonus = qualityBonus;
        this.ammoLeftInMag= Math.floor(Math.random()*12);
        this.multiAttack=3;
    }

    info(){
        //code to put item info in log-text-area for players to read
    }
    //if we bring in the quality bonus, add it to the damage
    damage (){
        let crit = 0;
        let roll = Math.floor(Math.random()*10);
        if(roll ===10){
            crit = Math.floor(Math.random()*6);
            textLog.value += "\nA critical hit!";
        }
        return 1 + roll + crit;
    }
}