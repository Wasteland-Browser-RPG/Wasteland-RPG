'use strict';
class scenario{
    scenario(enemies, encounterIntroText, encounterConclusionText){
        this.enemies = enemies;
        this.encounterIntroText=encounterIntroText;
        this.encounterConclusionText=encounterConclusionText;
    }
    commence(){
        textLog.value+='\n'+ this.encounterIntroText;
    }
    conclude(){
        textLog.value+='\n' + this.encounterConclusionText;
    }
}