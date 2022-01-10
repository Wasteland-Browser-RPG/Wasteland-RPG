'use strict';

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
}