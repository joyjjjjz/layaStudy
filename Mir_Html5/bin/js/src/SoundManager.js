//音效管理
var SoundInfo = /** @class */ (function () {
    function SoundInfo() {
        this._szFile = "";
        this._nLastTick = 0;
    }
    return SoundInfo;
}());
var SoundManager = /** @class */ (function () {
    function SoundManager() {
        this.m_sBackFile = ""; //背景音乐
        Laya.SoundManager.autoReleaseSound = false;
        this.m_ArrSound = new Array();
    }
    SoundManager.GetInstance = function () {
        if (SoundManager._Instance == null) {
            SoundManager._Instance = new SoundManager();
        }
        return SoundManager._Instance;
    };
    SoundManager.prototype.PlayBackMusic = function (sBackMusic, nPlayCount) {
        if (nPlayCount === void 0) { nPlayCount = 0; }
        if (this.m_sBackFile != "") {
            Laya.SoundManager.stopMusic();
            Laya.SoundManager.destroySound(sBackMusic);
        }
        this.m_sBackFile = sBackMusic;
        Laya.SoundManager.playMusic(sBackMusic, nPlayCount);
    };
    SoundManager.prototype.PlayGameSound = function (id) {
        var s = id.toString();
        while (s.length < 5) {
            s = "0" + s;
        }
        s = "data/sound/game/" + s + ".mp3";
        this.PlaySoundByFile(s);
    };
    SoundManager.prototype.PlayEffectSound = function (id) {
        var s = id.toString();
        while (s.length < 5) {
            s = "0" + s;
        }
        s = "data/sound/effect/" + s + ".mp3";
        this.PlaySoundByFile(s);
    };
    SoundManager.prototype.PlaySoundByFile = function (sFile) {
        for (var i = 0; i < this.m_ArrSound.length; i++) {
            if (sFile == this.m_ArrSound[i]._szFile) {
                Laya.SoundManager.playSound(sFile);
                this.m_ArrSound[i]._nLastTick = Config.GlobalConfig.s_dwUpdateTick + Config.GlobalConfig._Instance._nClearFreeMemoryTime;
                return;
            }
        }
        var pSoundInfo = new SoundInfo();
        pSoundInfo._szFile = sFile;
        pSoundInfo._nLastTick = Config.GlobalConfig.s_dwUpdateTick + Config.GlobalConfig._Instance._nClearFreeMemoryTime;
        this.m_ArrSound.push(pSoundInfo);
        Laya.SoundManager.playSound(sFile);
    };
    SoundManager.prototype.Upadte = function (nCurrentTick) {
        var pCfg = Config.GlobalConfig._Instance;
        for (var i = this.m_ArrSound.length - 1; i >= 0; i--) {
            if (this.m_ArrSound[i]._nLastTick <= nCurrentTick) {
                Laya.SoundManager.destroySound(this.m_ArrSound[i]._szFile);
                this.m_ArrSound.splice(i, 1);
            }
        }
    };
    SoundManager.GAME_RUN = 9; //跑步
    SoundManager.GAME_WALK = 10; //走路
    SoundManager.GAME_NORMAL_ATTACK = 11; //普通攻击
    SoundManager._Instance = null;
    return SoundManager;
}());
//# sourceMappingURL=SoundManager.js.map