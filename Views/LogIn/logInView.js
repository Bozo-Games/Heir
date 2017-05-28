function LogInView() {
    db.addListener("factions",this);

    this.div = createDiv("");
    this.div.class('logInView');

    this.resizeWindow(); //we need the w, h ect for things
    this.factionSelectBtns = {};
    console.log(this.factionSelectBtns);
    this.updateButtons();

    this.clearBtn = createButton('Clear And Reset');
    this.clearBtn.class('clearAndReset');
    this.clearBtn.mouseClicked(db.clearAndSeedDataBase);
    this.clearBtn.touchEnded(db.clearAndSeedDataBase);

    this.div.child(this.clearBtn);

    this.startGameBtn = createButton('Start Game');
    this.startGameBtn.class('startGame');

    this.startGameBtn.mouseClicked(logTODOFunction('start game'));
    this.startGameBtn.touchEnded(logTODOFunction('start game'));

    this.div.child(this.startGameBtn);

    this.isSelecting = false; //just testing stupid out

}
LogInView.prototype.updateButtons = function() {
    var tempBtns = {};
    for (var udid in db.factions) {
        if (db.factions.hasOwnProperty(udid)) {
            var faction = db.factions[udid];
            var btn = this.factionSelectBtns[udid];
            if(btn == undefined) {
                btn =  createButton(faction.name);
                btn.attribute('factionUdid',udid);
                btn.addClass('logInFactionSelectBtn');
                this.div.child(btn);
            }
            if(faction.playerCookieID == userLocalID) {
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
                if(faction.playerCookieID && btn.class().indexOf("alreadySelectedFaction") == -1) {
                    print('add');
                    btn.addClass('alreadySelectedFaction');
                }
                if (faction.playerCookieID == null && btn.class().indexOf("alreadySelectedFaction") != -1) {
                    print('remove');
                    btn.removeClass('alreadySelectedFaction');
                }
            }
            var weekThis = this;
            var onClick = function () {
                debug = userLocalID;
                weekThis.onSelectFaction(this);
            };
            btn.mouseClicked(onClick);
            btn.touchEnded(onClick);
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
LogInView.prototype.onSelectFaction = function(button) {
    if(!this.isSelecting) {
        this.isSelecting = true;
        print('-------------------------- start -----------------------------');
        var factionUDID = button.attribute("factionUdid");
        var faction = db.factions[factionUDID];
        if (faction != undefined) {
            print('faction found - ' + faction.name);
            var othersSelection = button.class().indexOf("alreadySelectedFaction") != -1;
            var isMySelection = button.class().indexOf("logInSelectedFactionBtn") != -1;
            print('faction is other selected - ' + othersSelection);
            print('faction is my selection - ' + isMySelection);
            if (!isMySelection && !othersSelection) {
                faction.playerCookieID = userLocalID;
                if (myFaction) {
                    if (myFaction.udid != faction.udid) {
                        myFaction.playerCookieID = null;
                        db.updateFaction(myFaction);
                    }
                }
                myFaction = faction;
                db.updateFaction(myFaction);
            } else if (othersSelection) {
                print('WARNING: trying to select already selected faction');
            } else if (isMySelection) {
                if (faction.udid == myFaction.udid) {
                    myFaction.playerCookieID = null;
                    db.updateFaction(myFaction);
                    myFaction = null;
                } else {
                    print('ERROR: selected faction and my faction and not matching');
                }
            }
        } else {
            debug = 'ERROR: faction select button trying to select faction that dose not exist (' + factionUDID + ')';
            Console.log('ERROR: faction select button trying to select faction that dose not exist (' + factionUDID + ')');
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
    if (factionSelected.playerCookieID == null) {
        factionSelected.playerCookieID = userLocalID;
        db.updateFaction(factionSelected);
    }
};