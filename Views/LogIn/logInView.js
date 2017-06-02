
var showLogInTimeOut = 100; //will hide if join game in progress (allows tv to refresh)

function LogInView() {
    db.addListener("factions",this);

    this.div = createDiv("");
    this.div.class('logInView');

    this.resizeWindow(); //we need the w, h ect for things
    this.factionSelectBtns = {};
    this.updateButtons();

    this.clearBtn = createButton('Clear And Reset');
    this.clearBtn.class('clearAndReset');
    this.clearBtn.mouseReleased(db.clearAndSeedDataBase);
    //this.clearBtn.touchEnded(db.clearAndSeedDataBase);

    this.div.child(this.clearBtn);

    this.startGameBtn = createButton('Start Game');
    this.startGameBtn.class('startGame');

    this.startGameBtn.mouseReleased(function() {
            if (myKingdom) {
                if(myKingdom.hostID == userLocalID) {
                    debug = 'we are currently building';
                } else if(!myKingdom.hostID) {
                    myKingdom.hostID = userLocalID;
                    processLaws(myKingdom.gamePhase,STATIC.gamePhase.initialKingSelect);
                }
            }
        }
    );
    //this.startGameBtn.touchEnded(logTODOFunction('start game'));

    this.div.child(this.startGameBtn);

    this.isSelecting = false; //just testing stupid out

}
LogInView.prototype.updateButtons = function() {
    this.isSelecting = true;
    var tempBtns = {};
    for (var udid in db.factions) {
        if (db.factions.hasOwnProperty(udid)) {
            var faction = db.factions[udid];
            var btn = this.factionSelectBtns[udid];
            if(btn == undefined) {
                btn =  createButton(faction.name);
                btn.attribute('factionUdid',udid);
                btn.addClass('logInFactionSelectBtn')
                var weekThis = this;
                var onClick =  function () {
                    weekThis.onSelectFaction(this);
                    return false; //foces propegations to stop
                };
                btn.mouseReleased(onClick);
                //btn.touchEnded(onClick);
                this.div.child(btn);
            }
            if(faction.playerID == userLocalID) {
                if(btn.class().indexOf("logInSelectedFactionBtn") == -1) {
                    btn.addClass("logInSelectedFactionBtn");
                }
                if(myFaction == undefined) {
                    myFaction = faction;
                }
            } else {
                 if(btn.class().indexOf("logInSelectedFactionBtn") != -1) {
                     btn.removeClass("logInSelectedFactionBtn");
                 }
                if(faction.playerID && btn.class().indexOf("alreadySelectedFaction") == -1) {
                    print('add');
                    btn.addClass('alreadySelectedFaction');
                }
                if (faction.playerID == null && btn.class().indexOf("alreadySelectedFaction") != -1) {
                    print('remove');
                    btn.removeClass('alreadySelectedFaction');
                }
            }

            tempBtns[udid] = btn;
            delete this.factionSelectBtns[udid];
        }
    }
    //now remove no longer valid btns
    for(var udid  in this.factionSelectBtns) {
        var btn = this.factionSelectBtns[udid];
        btn.remove();
    }
    this.factionSelectBtns = tempBtns;
    var i = 10;
    for(var udid  in this.factionSelectBtns) {
        var btn = this.factionSelectBtns[udid];
        btn.style('top',i + '%');
        btn.style('border-color',db.factions[udid].color);
        i+=8;
    }

    this.isSelecting = false;
};
LogInView.prototype.destroy = function () {
    this.div.remove();
};
LogInView.prototype.onSelectFaction = function(button) {
    if(!this.isSelecting) {
        this.isSelecting = true;
        var factionUDID = button.attribute("factionUdid");
        var faction = db.factions[factionUDID];
        if (faction != undefined) {
            var othersSelection = button.class().indexOf("alreadySelectedFaction") != -1;
            var isMySelection = button.class().indexOf("logInSelectedFactionBtn") != -1;
            if (!isMySelection && !othersSelection) {
                faction.playerID = userLocalID;
                if (myFaction) {
                    if (myFaction.udid != faction.udid) {
                        myFaction.playerID = null;
                        db.updateFaction(myFaction);
                    }
                }
                myFaction = faction;
                db.updateFaction(myFaction);
            } else if (othersSelection) {
                print('WARNING: trying to select already selected faction');
            } else if (isMySelection) {
                if (faction.udid == myFaction.udid) {
                    myFaction.playerID = null;
                    db.updateFaction(myFaction);
                    myFaction = null;
                } else {
                    print('ERROR: selected faction and my faction and not matching');
                }
            }
        } else {
            print('ERROR: faction select button trying to select faction that dose not exist (' + factionUDID + ')');
        }
    } else {

    }
};
LogInView.prototype.factionsUpdated = function() {
    this.updateButtons();
};
LogInView.prototype.resizeWindow = function() {
    this.w = Math.min(Math.max(320,0.8 * width),width);
    this.h = Math.min(Math.max(320,0.8 * height),height);
    this.x = (width - this.w)/2;
    this.y = (height - this.h)/2;
    this.div.size(this.w,this.h);
    this.div.position(this.x,this.y);
    if (this.factionSelectBtns) {
        this.updateButtons();
    }
};
LogInView.prototype.didSelectFaction = function(factionSelected) {
    if (factionSelected.playerID == null) {
        factionSelected.playerID = userLocalID;
        db.updateFaction(factionSelected);
    }
};

function renderLogInView() {
  if (logInView) {
      showLogInTimeOut--;
  } else {
      logInView = new LogInView();
  }

  if (myKingdom) {
      if (myKingdom.gamePhase != STATIC.gamePhase.newGame && logInView && showLogInTimeOut < 0) {
          logInView.destroy();
          logInView = undefined;
          iAmPlayer = myFaction != null && myFaction != undefined; //only place this should be set
          iAmTV = !iAmPlayer;
      }
      if (iAmPlayer) {
        if(iAmHost) {
            
        } else {

        }
      } else if (iAmTV) {

      }
  }
}
