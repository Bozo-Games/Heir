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
            if(faction.playerIP == userIPAddress) {
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
                console.log('here ' + faction.playerIP);
                if(faction.playerIP && btn.class().indexOf("alreadySelectedFaction") == -1) {
                    print('add');
                    btn.addClass('alreadySelectedFaction');
                }
                if (faction.playerIP == null && btn.class().indexOf("alreadySelectedFaction") != -1) {
                    print('remove');
                    btn.removeClass('alreadySelectedFaction');
                }
            }
            var weekThis = this;
            var onClick = function () {
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
};
LogInView.prototype.onSelectFaction = function(button) {
    var factionUDID = button.attribute("factionUdid");
    var faction = db.factions[factionUDID];
    if (faction != undefined) {
        var othersSelection = button.class().indexOf("alreadySelectedFaction") != -1;
        var isMySelection = button.class().indexOf("logInSelectedFactionBtn") != -1;
        if (!isMySelection && !othersSelection) {
            faction.playerIP = userIPAddress;
            db.updateFaction(faction);
            if(myFaction) {
                if (myFaction.udid != faction.udid) {
                    myFaction.playerIP = null;
                    print('updating my factioi');
                    db.updateFaction(myFaction);
                }
            }
            myFaction = faction;
        } else if (othersSelection) {
            print('WARNING: trying to select already selected faction');
        } else if (isMySelection) {
            if(faction.udid == myFaction.udid) {
                myFaction.playerIP = null;
                db.updateFaction(myFaction);
                myFaction = null;
            } else {
                print('ERROR: selected faction and my faction and not matching');
            }
        }
    } else {
        Console.log('ERROR: faction select button trying to select faction that dose not exist (' + factionUDID + ')');
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
    if (factionSelected.playerIP == null) {
        factionSelected.playerIP = userIPAddress;
        db.updateFaction(factionSelected);
    }
};