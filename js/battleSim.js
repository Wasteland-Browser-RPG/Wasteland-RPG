textLog.value += '\nAs you are scavenging in a dilapidated corner store a hostile scavenger bursts in, sees you and attacks.';

if (player.currentHP>0 && scavenger.currentHP >0){
    textLog.value += "\nYou have 2 actions, what will you do?";
}

attackButton.addEventListener("click", attackClick);

function attackClick(){
    if(playerQueuedActions.length >1){
        return;
    }
    document.querySelector("#action-queue").innerText += attackTypeSelection.value +" attack ";
    playerQueuedActions.push(attackTypeSelection.value +" Attack");
    if (playerQueuedActions.length ===2){
        aimButton.disabled=true;
        attackButton.disabled=true;
    }
}

function aimClick(){
    if (playerQueuedActions.length >1 || attackTypeSelection.value =="Melee"){
        return;
    }
    document.querySelector("#action-queue").innerText += "Aim";
    playerQueuedActions.push("Aim");
    aimButton.disabled=true;
}

function clearActions(){
    document.querySelector("#action-queue").innerText = "";
    playerQueuedActions = [];
    if(attackTypeSelection.value =="Ranged"){
        aimButton.disabled=false;
    }
    attackButton.disabled=false;
}

function confirmActions(){
    let aiming;
    if(playerQueuedActions[0]==="Aim" || playerQueuedActions[1]==="Aim"){
        aiming=true;
    } else{
        aiming = false;
    }
    //    in this case, currently, the only other action should be a ranged attack but we will still check
    playerQueuedActions.forEach(function (action){
        if (action=="Ranged Single Attack"){
           rangedAttack(player, scavenger, aiming, 1);
           if(scavenger.currentHP <1){
               textLog.value+="\nWell, the fighting is over. You might as well check the body and scavenge around a bit before moving on."
               //Call to function for what happens after defeating foe
               return;
           }
        }
        if (action=="Ranged Multi Attack"){
            rangedAttack(player, scavenger, aiming, player.inventory[0].multiAttack);
            if(scavenger.currentHP <1){
                textLog.value+="\nWell, the fighting is over. You might as well check the body and scavenge around a bit before moving on."
                //Call to function for what happens after defeating foe
                return;
            }
        }
        if (action=="Melee Attack"){
            //TODO: use meeleeAttack Function
            meleeAttack(player, scavenger);
        }
    });
    scavenger.dodgedThisRound=false;
    if(scavenger.currentHP > 0){
        enemyTurn();
        aimButton.disabled=false;
    }
}

function enemyTurn(){
//    Todo: Write enemy turn
//    let's randomize it so it's not the same thing every time.

    let roll = Math.floor(Math.random() * 3);
    console.log(roll);
//    possibilities at this point are:

//    Todo: add reload action

//    aim and shoot
    if(roll === 0){
      if(scavenger.inventory[0].ammoLeftInMag < 1){
          roll = 2;
      } else{
          let singleOrMultiShotRoll = Math.floor(Math.random() * 2);
          console.log(singleOrMultiShotRoll);
          if(singleOrMultiShotRoll==0){
              rangedAttack(scavenger, player, true, 1);
              if (player.currentHP < 1) {
                  textLog.value += "\nYou have been slain. Game Over."
                  confirmActionsButton.disabled = true;
                  return;
              }
          } else{
              rangedAttack(scavenger, player, true, scavenger.inventory[0].multiAttack);
              if (player.currentHP < 1) {
                  textLog.value += "\nYou have been slain. Game Over."
                  confirmActionsButton.disabled = true;
                  return;
              }
          }
      }
    }
//    shoot twice
    if(roll === 1) {
        if (scavenger.inventory[0].ammoLeftInMag < 1) {
            roll = 2;
        } else {
            let singleOrMultiShotRoll = Math.floor(Math.random() * 2);
            console.log(singleOrMultiShotRoll)
            if (singleOrMultiShotRoll == 0) {
                rangedAttack(scavenger, player, false, 1);
                if (player.currentHP < 1) {
                    textLog.value += "\nYou have been slain. Game Over."
                    confirmActionsButton.disabled = true;
                    return;
                }
                rangedAttack(scavenger, player, false, 1);
                if (player.currentHP < 1) {
                    textLog.value += "\nYou have been slain. Game Over."
                    confirmActionsButton.disabled = true;
                    return;
                }
            } else {
                rangedAttack(scavenger, player, false, scavenger.inventory[0].multiAttack);
                if (player.currentHP < 1) {
                    textLog.value += "\nYou have been slain. Game Over."
                    confirmActionsButton.disabled = true;
                    return;
                }
                if (scavenger.inventory[0].ammoLeftInMag > 0) {
                    rangedAttack(scavenger, player, false, scavenger.inventory[0].multiAttack);
                    if (player.currentHP < 1) {
                        textLog.value += "\nYou have been slain. Game Over."
                        confirmActionsButton.disabled = true;
                        return;
                    }
                } else {
                    meleeAttack(scavenger, player);
                    if (player.currentHP < 1) {
                        // textLog.value+="\nYou have been slain. Game Over."
                        confirmActionsButton.disabled = true;
                        return;
                    }
                }
            }
        }
    }
//    melee twice
    if(roll === 2){
        meleeAttack(scavenger,player);
        if(player.currentHP <1){
           // textLog.value+="\nYou have been slain. Game Over."
            confirmActionsButton.disabled=true;
           return;
        }
        meleeAttack(scavenger,player);
        if(player.currentHP <1){
            // textLog.value+="\nYou have been slain. Game Over."
            confirmActionsButton.disabled=true;
            return;
        }
    }
    player.dodgedThisRound=false;
}

function meleeAttack(attacker, target){
    if(target.currentHP <1){
        clearActions();
        return;
    }
    let roll = Math.floor(Math.random() * 100);
    textLog.value += "\n"+ attacker.name +" rolled " + roll + " versus "+ attacker.punchGood +" to hit.";
    if ((attacker.punchGood) >= roll){
        if(!target.dodgedThisRound){
            if(target.controlledByPlayer){
                textLog.value+="\nYou attempt to dodge the attack!"
            }else{
                textLog.value+="\n"+target.name +" attempts to dodge your attack!"
            }
        }
        if(target.Agility < (Math.floor(Math.random() * 100))|| target.dodgedThisRound){//hit case
            target.dodgedThisRound = true;
            let damage = attacker.inventory[1].damage(attacker.meleeDamageBonus) - Math.floor(target.Toughness / 10);
            if (damage < 0) {
                damage = 0;
            }
            textLog.value += "\n" + attacker.name + " hit " + target.name + " for " + damage + " damage";
            target.currentHP -= damage;
            if (target.currentHP < 1) {
                if (!target.controlledByPlayer) {
                    enemyDead(target);
                    return;
                } else {
                    gameOver();
                    return;
                }
            } else {
                if (target.controlledByPlayer) {
                    textLog.value += "\nYou are still standing after the " + attacker.name + "\'s attack."
                } else {
                    textLog.value += "\n" + target.name + " is still standing after enduring your attack."
                }
            }
        }else{//successful dodge case
            textLog.value+="\n"+target.name + " nimbly dodged the otherwise accurate attack."
            target.dodgedThisRound = true;
        }
    }else{//miss case
        if(target.controlledByPlayer){
            textLog.value += "\n"+ attacker.name +"\'s attack misses you.";
        }else {
            textLog.value += "\nYour attack misses.";
        }
    }
    clearActions();
}

function rangedAttack(attacker, target, aiming, shots){
    if(target.currentHP < 1){
        clearActions();
        return;
    }
    let bonus = 0;
    let penalty = 0;
    if(aiming){
        bonus = 10;
    }
    if(shots > 1){
        penalty = 10;
    }
    console.log(attacker.inventory[0].ammoLeftInMag);
    for(let i = 0; i < shots; i++) {
        if (attacker.inventory[0].ammoLeftInMag > 0) {
            attacker.inventory[0].ammoLeftInMag--;
            let roll = Math.floor(Math.random() * 100);
            textLog.value += "\n" + attacker.name + " rolled " + roll + " against a "+ (attacker.shootGood+bonus-penalty) + " to hit.";
            if ((attacker.shootGood + bonus - penalty) >= roll) {
                if (!target.dodgedThisRound) {
                    if (target.controlledByPlayer) {
                        textLog.value += "\nYou attempt to dodge the attack!"
                    } else {
                        textLog.value += "\n" + target.name + " attempts to dodge your attack!"
                    }
                }
                if (target.Agility < (Math.floor(Math.random() * 100)) || target.dodgedThisRound) {//hit case
                    // target.dodgedThisRound = true;
                    let damage = attacker.inventory[0].damage() - Math.floor(target.Toughness / 10);
                    if (damage < 0) {
                        damage = 0;
                    }
                    textLog.value += "\n" + attacker.name + " hit " + target.name + " for " + damage + " damage";
                    target.currentHP -= damage;
                    if (target.currentHP < 1) {
                        if (!target.controlledByPlayer) {
                            enemyDead(target);
                            return;
                        } else {
                            gameOver();
                            return;
                        }
                    } else {
                        textLog.value += "\n" + target.name + " didn't like getting shot. Imagine that."
                    }
                } else {//successful dodge case
                    textLog.value += "\n" + target.name + " nimbly dodged the otherwise accurate attack."
                    // target.dodgedThisRound = true;
                }
            } else { //miss case
                if (target.controlledByPlayer) {
                    textLog.value += "\n" + attacker.name + " fired at you and missed. Lucky.";
                } else {
                    textLog.value += "\n" + attacker.name + " fired at " + target.name + " and missed. You should aim more carefully.";
                }
            }
            clearActions();
        } else {
            textLog.value += "\nClick. No cartridges left in the magazine.";
            clearActions();
        }
    }
    target.dodgedThisRound=true;
}

function enemyDead(target){
    textLog.value +="\n"+target.name+" is deceased...";
    clearActions();
    player.gainExperience(100);
    //TODO: Handle end of combat. Is it looting time? Are there additional foes?
    endBattle(target);
}

function endBattle(enemy){
    textLog.value += "\nYou retrieve " + (enemy.ammo.nineMm.amount + enemy.inventory[0].ammoLeftInMag) + " " + enemy.ammo.nineMm.name + " rounds from the defeated " + enemy.name;
    player.ammo.nineMm.amount += enemy.ammo.nineMm.amount + enemy.inventory[0].ammoLeftInMag;
}

function gameOver(){
    textLog.value+="\nGAME OVER.\n\nRefresh the page to play again."
}

clearActionsButton.addEventListener("click", clearActions);
aimButton.addEventListener("click", aimClick);
confirmActionsButton.addEventListener("click", confirmActions);

var playerQueuedActions = [];