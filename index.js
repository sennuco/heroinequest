///////////////////////////////////////////////////////////////////////////

                    // Global Variables 🌍  //

///////////////////////////////////////////////////////////////////////////


let gameMusic= document.querySelector(".dq-music")
let mainScoreboard = document.querySelector(".navbar-item.scoreboard")
let scoreboardImg = document.querySelector(".scoreboard-img")

let startBtn = document.querySelector(".button.is-primary.is-focused.start-btn")
let mainDiv= document.querySelector(".main-div")
let CharacterSelectDiv = document.querySelector(".character-select.characters")
// let blueCharacterSelect = document.querySelector(".blue-haired-character-select.blue-haired")
let miaCharacterSelect = document.querySelector(".mia-character-select.mia")
let meenaCharacterSelect = document.querySelector(".meena-character-select.meena")

let commentBox= document.querySelector(".comment-box")

let homeBtn = document.querySelector(".home-button")

let miaBtn= document.querySelector(".mia-btn")
let meenaBtn = document.querySelector(".meena-btn")

let singleMonsterImg = document.querySelector(".monster-img")

let meenaBattleComment = document.querySelector(".meena-battle-comment")
let miaBattleComment= document.querySelector(".mia-battle-comment")

let atkBtn = document.querySelector(".button.is-danger.is-large.atk-btn")

let spellBtn = document.querySelector("button.is-link.is-large.spell-btn")

let monsterSpellBtn = document.querySelector(".monster-spell")

let spellEffect = document.querySelector(".animated.infinite.bounce.spell-effect")

let thirdDiv= document.querySelector(".third-div")

let normalBg = document.querySelector(".normal-background")

let heroHealthBar = document.querySelector(".progress.hero-health-bar.is-primary")

let monsterHealthBar = document.querySelector(".progress.monster-health.is-danger")

let victoryDivImg = document.querySelector(".victory")

let monsterSingleImg =  document.querySelector(".monster-img")

let gameOverImg = document.querySelector(".gameover")

let heroSpellBg = document.querySelector(".spell-cast-bg")

let formInputVal = ""

let heroObj = {}

let monstersObj = {}

let playerVictories = []

let victoryForm = document.querySelector(".victory-form")

let state= "home"

let turnCounter = 0

let isBattleSystemOn = false

////////////////////////////////  END  ////////////////////////////////

const beginningFunc = delay =>{
    console.log('Hello after ' + delay + ' seconds')
};
setTimeout(beginningFunc, 1 * 1000, 1);
setTimeout(beginningFunc, 8 * 1000, 8);

//KEEP THIS HERE: SLEEP CALLBACK FUNCTION NEEDS TO REFER TO THIS//
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
//KEEP THIS HERE: SLEEP CALLBACK FUNCTION NEEDS TO REFER TO THIS//


///////////////////////////////////////////////////////////////////////////

                    //  TRANSITION TO THE BATTLE SYSTEM START//

///////////////////////////////////////////////////////////////////////////


function transitionToBattleSystem(){

    CharacterSelectDiv.style = "display: none"
    thirdDiv.style= "display"
    monsterSingleImg.style = "display"
    gameMusic.play()
    victoryForm.input.value = ""
    isBattleSystemOn=true
    turnCounter = 0
    document.getElementById("atk-btn").disabled = false;
    document.getElementById("spell-btn").disabled = false;
    battleSystem()
 }
 ///////////////////////////////////////////////////////////////////////////

             //  TRANSITION TO THE BATTLE SYSTEM END//

///////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////

                    //  ⚔️ EVENT LISTENERS /FUNCTIONS  //

///////////////////////////////////////////////////////////////////////////

startBtn.addEventListener("click",(evt) => {

//       while (mainDiv.hasChildNodes()) {
//           mainDiv.firstChild.remove()
//       }
turnEverythingOff()
      this.state = "start"
      characterSelect()
      
})

victoryForm.addEventListener("submit",(evt) => {
    evt.preventDefault()
    let usernameInput = ""
    if(evt.target.input.value){
    
    usernameInput = evt.target.input.value
    fetch(`http://localhost:3000/victories`, {
        method:'POST',
       headers: { 
           'Content-type': 'application/json',
           'accept': 'application/json'
       },
       body: JSON.stringify({
       username: usernameInput,
       monster_id: monstersObj.id,
       hero_id: heroObj.id,
       counter: turnCounter,
       scoreboard: ""
  
        })
      })
      .then(resp => resp.json())
      .then(json_resp => {
      playerVictories.push(json_resp);
      allVictories(playerVictories)
      mainScoreboard.click()
      })
    }
    else{
        alert('please enter a valid name')
    }
    
})

homeBtn.addEventListener("click",(evt) => {
    isBattleSystemOn = false
    state = "home"
    turnEverythingOff()
    mainDiv.style="display"

})

//SCORE BOARD EVENT LISTENER

mainScoreboard.addEventListener("click", (evt) => {
    isBattleSystemOn = false
    state = "scoreBoard"

    if (scoreboardImg.style !== "display") {

        // while(scoreboardImg.hasChildNodes){
        //     console.log('removing', scoreboardImg.firstChild)
        //     //if(scoreboardImg.hasChildNodes)
        //    // scoreboardImg.firstChild.remove()
        // }
        turnEverythingOff()
        mainDiv.style = "display: none"
        scoreboardImg.style= "display"
    
        fetch("http://localhost:3000/victories")
        .then(resp => resp.json())
        .then(playerInfo=> {
            playerInfo.forEach(playerstat => {
                allVictories(playerstat )     
            });
        })
    }
})

//Turn everything off

function turnEverythingOff(){
    battleSystem.style = "display: none;"
    thirdDiv.style = "display: none;"
    victoryForm.style = "display: none;"
    victoryDivImg.style= "display: none;"
    singleMonsterImg.style = "display: none;"
    scoreboardImg.style="display: none;"
    miaBtn.style="display: none;"
    meenaBtn.style="display: none;"
    mainDiv.style="display: none;"
    gameOverImg.style = "display: none;"
}


///////////////////////////////////////////////////////////////////////////

                    // CHARACTER SELECTION //

///////////////////////////////////////////////////////////////////////////

function characterSelect(){
    if (state!== "characterSelect") {
        state = "characterSelect"
        miaBtn.style="display"
        meenaBtn.style="display"
    //Mia's Event Listener 
    miaBtn.addEventListener("click",(evt) => {

        fetch(`http://localhost:3000/heros/2`)
        .then(resp => resp.json())
        .then(miaObj => {
            heroObj = miaObj
            heroObj['spellObj'] = getSpells(heroObj.spell)
            transitionToBattleSystem()
            battleComment(miaBattleComment)
        })
    
    }) 
     miaCharacterSelect.append(this.miaBtn)  


    //Meena's Event Listener 
    meenaBtn.addEventListener("click",(evt) => {
        fetch(`http://localhost:3000/heros/1`)
        .then(resp => resp.json())
        .then(meenaObj => {
            heroObj = meenaObj
            heroObj['spellObj'] = getSpells(heroObj.spell)
            transitionToBattleSystem()
            battleComment(meenaBattleComment)
        })

        

        })

    meenaCharacterSelect.append(this.meenaBtn)

  }

  CharacterSelectDiv.style = "display"

}


///////////////////////////////////////////////////////////////////////////

                    //  ⚔️ BATTLE SYSTEM  START //

///////////////////////////////////////////////////////////////////////////


function battleSystem(){
    this.state = "battleSystem"

    fetch(`http://localhost:3000/monsters/1`)
    .then(resp => resp.json())
    .then(monsterObj => {
        monstersObj = monsterObj
        monstersObj['spellObj'] = getMonsterSpells(monsterObj.spell)
 

 
    //Attack & Spell Event Listeners 


    atkBtn.addEventListener("click",(evt) => {
        console.log(`${heroObj.name} attacked ${monstersObj.name}!`);
        turnCounter++
     
        disableButton(atkBtn)

        sleep(500).then(() => {
           
            let regAttackObj = {
    
                name: "attack",
                dmg: heroObj.atk,
                mpCost: 0
    
             }
          
             takeAction(regAttackObj)
            })
            


    })


    //Spell Event Listener 

    spellBtn.addEventListener("click",(evt) => {
        turnCounter++
        disableButton(spellBtn)
        spellEffect.style="display"
        console.log(`${heroObj.name} casts ${heroObj.spell} on ${monstersObj.name}!`);
        
        sleep(500).then(() => {
            spellEffect.style="display: none;"
            
        })
        
        sleep(500).then( () => {
            
                let regSpellObj = {
        
                    name: "Spell",
                    dmg: heroObj.spellObj.dmg,
                    mpCost: 0
                }

             takeAction(regSpellObj)
            
            })
        
        })
    })
    }

///////////////////////////////////////////////////////////////////////////

                    //  ⚔️ BATTLE SYSTEM END //

///////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////

                    // TAKE ACTION SYSTEM //
                    //  Hero VS Monster//

///////////////////////////////////////////////////////////////////////////



function takeAction(regSpellObj){


    sleep(500).then(() => {

        let remainingHP = monstersObj.hp 
        if (monstersObj.hp > 1 ) {
            remainingHP -= regSpellObj.dmg
            monstersObj.hp = remainingHP
           
            monsterHealthBar.value -=regSpellObj.dmg
            animateCSS(singleMonsterImg, "bounce", () => {
    
     
                sleep(100).then(() => {
                    console.log(`Enemy ${monstersObj.name} took ${regSpellObj.dmg} damage! Hp Left: ${monstersObj.hp}`)
                })

                    sleep(1300).then(() => {
                        console.log(`Enemy ${monstersObj.name} attacks!`)
                        // thirdDiv.className="third-div animated bounce"
                       

                        sleep(700).then(() => {
                            commentBox.className="comment-box"
                            
                          

                            

                        })
                        

                    })

            })

            
            if (monstersObj.hp < 0) {
                monstersObj.hp = 0
                    if ( monstersObj.hp <= 0) {
                        console.log("defeat")
                        isBattleSystemOn=false
                        thirdDiv.style = "display: none;"
                        meenaBattleComment.style="display: none;"
                        miaBattleComment.style="display: none;"
                        monsterSingleImg.style = "display: none;"
                        sleep(1500).then(() => {
                                victoryDivImg.style = "display"
                                victoryForm.style= "display"
                                gameMusic.pause()
                        })
                            
                        }
                }else { //if monster.Obj is greater than 0
                    enemyAction()
                }
    
        }
    })
    
}


///////////////////////////////////////////////////////////////////////////

                    // ENEMY TAKE ACTION SYSTEM //
                            //ENEMY ACTION//

///////////////////////////////////////////////////////////////////////////



function enemyAction(){
    
    sleep(1150).then(() => {
        let monsterAttack= Math.round(Math.random(100)*3)
        let remainingHeroHp = heroObj.hp
        // console.log(monsterObj);


        sleep(500).then(() => {

            switch(monsterAttack) {
                case 1:

                    remainingHeroHp -= monstersObj.atk

                    heroObj.hp = remainingHeroHp

                    if (heroObj.hp <= 0 ) {
                       
                        defeated()
                
                    }
                    sleep(2000).then(() => {
                    console.log(`${heroObj.name} took ${monstersObj.atk} damage!`)
                    console.log(`${heroObj.name} Remaining Hp: ${heroObj.hp}`)

                        sleep(1000).then(() => {
                            console.log("Your turn!")
                        })
                        
                    })

                     
                    break;
                case 2:

                        remainingHeroHp -= 70
                        heroObj.hp = remainingHeroHp

                        sleep(3000).then(() => {

                            console.log(`${heroObj.name} took ${70} damage!`)
                            console.log(`${heroObj.name} Remaining Hp: ${heroObj.hp}`)

                            sleep(1000).then(() => {
                                console.log("Your turn!")
                            })
                            
                        })
                      
                    break;
                case 3:

                        monstersObj.atk = 90
                        remainingHeroHp -= monstersObj.atk
                        heroObj.hp = remainingHeroHp

                        sleep(2000).then(() => {
                        monsterSpellBtn.style="display"
                        console.log(`${monstersObj.name} does a super attack! Watchout!`)

                        sleep(500).then(() => {
                            monsterSpellBtn.style="display: none;"
                            console.log(`${heroObj.name} Remaining Hp: ${heroObj.hp}`)
                            console.log("Your Turn!")
                        })
                    })
                    break;

                default:
                    sleep(2000).then(() => {
                        console.log(`${monstersObj.name} tripped and fell!!`);

                        sleep(1000).then(() => {
                            console.log("Your turn!");
                            
                        })
                        
                    })
                }
                heroHealthBar.value -= monstersObj.atk
        })
            disableButton(atkBtn)
        
        })
    
}


///////////////////////////////////////////////////////////////////////////

                   //  DISABLE BUTTONS //

///////////////////////////////////////////////////////////////////////////


function disableButton(button){
    
    if (heroObj.hp <= 0 ) {
        button.disabled = true;
        atkBtn.disabled =true;
        spellBtn.disabled=true
        // defeated()

        
    
    }else{
        sleep(500).then(() => {

            if (button.disabled) {
                // console.log("Your Turn!")
                document.getElementById("atk-btn").disabled = false;
                document.getElementById("spell-btn").disabled = false;
            }else{
                document.getElementById("atk-btn").disabled = true;
                document.getElementById("spell-btn").disabled = true;
                sleep(1800).then(() => {
                if(isBattleSystemOn)
                alert("Enemy's Turn!");
                })
            }
        })
    }


}


function defeated(){
    isBattleSystemOn=false 
    thirdDiv.style="display: none;"
    meenaBattleComment.style="display: none;"
    monsterSingleImg.style = "display: none;"
    turnEverythingOff()
    gameOverImg.style = "display"
    gameMusic.pause()

 
}


function animateCSS(element, animationName, callback) {
    const node = element
    node.classList.add('animated', animationName)
    
    function handleAnimationEnd() {
    node.classList.remove('animated', animationName)
    node.removeEventListener('animationend', handleAnimationEnd)
    
    if (typeof callback === 'function') callback()
    }
    
    node.addEventListener('animationend', handleAnimationEnd)
    }


    //Get Hero Spells //

    function getSpells(spell){
        let newSpellObj ={}
        switch (spell) {
            case "Alakazam":
                newSpellObj={
                    name: "Alakazam",
                    dmg: 95,
                    mp: 5
                }

                break;

                case "hocuspocus":
                    newSpellObj={
                        name: "hocuspocus",
                        dmg: 95,
                        mp: 5
                    }
    
                    break;
        
            default:
                    newSpellObj={
                        name: "Blizzard",
                        dmg: 75,
                        mp: 10
                    }
                break;
        }
        return newSpellObj
    }


    //Get Monster Spells

    function getMonsterSpells(spell){
        newSpellObj ={}
        switch (spell) {
            case "hocuspocus":
                  newSpellObj ={
                    name: "hocus",
                    dmg: 55,
                    mp: 10
                 }
                break;
        
            default:
                break;
        }
        return newSpellObj
    }


    //Battle Comments
    function battleComment(element){
        meenaBattleComment.style="display: none;"
        element.style="display"
    }


    //function iterates through victories and logs the instances

    function allVictories(playerstat){
      
        let li = document.createElement("li")
            li.innerText= `Player Name: ${playerstat.username}   Player Score:${playerstat.counter}   Hero: ${playerstat.hero_id} `

        let editBtn = editBtnFactory()
        
        let editForm = document.createElement("form")

    

        let editFormInput = document.createElement("input")
            editFormInput.setAttribute("type","text")
            editFormInput.className= "form-input"
            editForm.style="display: none;"

            
        let submitBtn = document.createElement("input")
            submitBtn.setAttribute("type","submit")
            submitBtn.setAttribute("value","Submit")
            submitBtn.className="submit"
            submitBtn.style="display: none;"

        let deleteBtn = document.createElement("button")
            deleteBtn.className= "delete-button"
            deleteBtn.innerText="Delete"
            deleteBtn.style="display"
   
    
         //SubmitButton  Event 
        submitBtn.addEventListener("click",(evt) => {
            evt.preventDefault()
             let updatedName = document.querySelector(".form-input").value
            fetch(`http://localhost:3000/victories/${playerstat.id}`, {
                    method:'PATCH',
                    headers: { 
                        'Content-type': 'application/json',
                        'accept': 'application/json'
                    },
                        body: JSON.stringify({
                    username: updatedName ,
                    monster_id: 1,
                    hero_id: 1

                        })
                    })
                    .then(resp => resp.json())
                    .then(updatedObj => {
                        console.log(updatedObj)

                    let oldName= evt.target.parentElement.parentElement
                    let newName = `Player Name:${updatedObj.username}  Player Score:${updatedObj.counter}  Hero:${updatedObj.hero_id} `
                     oldName.innerText= newName
                     console.log(oldName)
                     editForm.style="display: none;"
                     submitBtn.style="display:none;"
                     editBtn.style="display"
                     deleteBtn.style="display"
                     oldName.append(deleteBtn)
                     oldName.append(editBtn)
                     oldName.append(editForm)



                    
                })
                
                
            //     editBtn = editBtnFactory
            //     console.log(editBtn);

            //     console.log(li);
                
            
            })

         //EditButton Event
        editBtn.addEventListener("click",(evt) => {
            editForm.style="display"
            submitBtn.style="display"
            evt.target.style="display: none;"
        
        })
        //DeleteButton Event
        deleteBtn.addEventListener("click",(evt) => {
           
            fetch(`http://localhost:3000/victories/${playerstat.id}`, {
              method:'DELETE',
             headers: { 
                 'Content-type': 'application/json',
                 'accept': 'application/json'
             },
           
            })
            .catch((error) => {
                console.log(error);
                
            })
            evt.target.parentElement.remove()
        })

        
        editForm.append(editFormInput)
        editForm.append(submitBtn)
        li.append(editForm)
        li.append(editBtn)
        li.append(deleteBtn)
        scoreboardImg.append(li)


    }


    function editBtnFactory(){
        console.log("tester");
        
        let newEditBtn = document.createElement("button")
            newEditBtn.innerText="Edit"
            newEditBtn.style="display"
            
        return newEditBtn
    }


