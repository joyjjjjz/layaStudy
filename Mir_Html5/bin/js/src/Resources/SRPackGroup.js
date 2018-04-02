/**
 * MDPBitmapPackage Group
 * @author 后天
 * 通过索引访问或加载媒体资源包
 * 资源包的命名规则必须是固定长度的数字序列，例如：00000.mdp,00001.mdp,...
 */
var Resources;
(function (Resources) {
    var SRPackGroup = /** @class */ (function () {
        function SRPackGroup(sGroupName) {
            this.m_sGroupName = ""; //组名称
            this.m_ArrSRPack = []; //资源包组
            this.m_Loading = []; //正在加载中
            this.m_sGroupName = sGroupName;
        }
        SRPackGroup.prototype.GetGroupName = function () {
            return this.m_sGroupName;
        };
        SRPackGroup.prototype.GetPackByName = function (szName) {
            if (this.m_ArrSRPack[szName] != null) {
                return this.m_ArrSRPack[szName];
            }
            var sFileName = Config.GlobalConfig._Instance._szUrl + this.m_sGroupName + "/" + szName + ".sr";
            this.m_Loading[szName] = sFileName;
            var asset = [];
            asset.push({ url: sFileName, type: Laya.Loader.BUFFER });
            Laya.loader.load(asset, Laya.Handler.create(this, this.OnLoader));
            var pack = new Resources.SRPack();
            this.m_ArrSRPack[szName] = pack;
            return pack;
        };
        SRPackGroup.prototype.GetPack = function (nIndex) {
            if (this.m_ArrSRPack[nIndex.toString()] != null) {
                return this.m_ArrSRPack[nIndex.toString()];
            }
            //文件名
            var sFileName = nIndex.toString();
            while (sFileName.length < 5) {
                sFileName = "0" + sFileName;
            }
            sFileName = Config.GlobalConfig._Instance._szUrl + this.m_sGroupName + "/" + sFileName + ".sr";
            this.m_Loading[nIndex] = sFileName;
            var asset = [];
            asset.push({ url: sFileName, type: Laya.Loader.BUFFER });
            Laya.loader.load(asset, Laya.Handler.create(this, this.OnLoader));
            var pack = new Resources.SRPack();
            this.m_ArrSRPack[nIndex.toString()] = pack;
            return pack;
        };
        SRPackGroup.prototype.OnLoader = function () {
            for (var nIndex in this.m_Loading) {
                var szFile = this.m_Loading[nIndex];
                var data = Laya.loader.getRes(szFile);
                if (data != null) {
                    var pack = this.m_ArrSRPack[nIndex.toString()];
                    if (pack.Load(szFile, new Laya.Byte(data))) {
                        this.m_Loading[nIndex] = null;
                    }
                }
            }
        };
        SRPackGroup.prototype.CheckFreeMemory = function () {
            var nRet = 0;
            for (var key in this.m_ArrSRPack) {
                var pack = this.m_ArrSRPack[key];
                if (pack != null) {
                    if (pack.CheckFreeMemory()) {
                        this.m_ArrSRPack[key] = null;
                        nRet++;
                    }
                }
            }
            return nRet;
        };
        return SRPackGroup;
    }());
    Resources.SRPackGroup = SRPackGroup;
})(Resources || (Resources = {}));
//# sourceMappingURL=SRPackGroup.js.map