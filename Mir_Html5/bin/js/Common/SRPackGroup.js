/**
 * MDPBitmapPackage Group
 * @author 后天
 * 通过索引访问或加载媒体资源包
 * 资源包的命名规则必须是固定长度的数字序列，例如：00000.mdp,00001.mdp,...
 */
var Common;
(function (Common) {
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
        SRPackGroup.prototype.GetPack = function (nIndex) {
            if (this.m_ArrSRPack[nIndex] != null) {
                return this.m_ArrSRPack[nIndex];
            }
            if (this.m_Loading[nIndex] != null) {
                return null;
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
            return null;
        };
        SRPackGroup.prototype.OnLoader = function () {
            for (var index in this.m_Loading) {
                var szFile = this.m_Loading[index];
                var data = Laya.loader.getRes(szFile);
                if (data != null) {
                    var pack = new Common.SRPack();
                    if (pack.Load(szFile, new Laya.Byte(data))) {
                        this.m_Loading[index] = null;
                        this.m_ArrSRPack[index] = pack;
                    }
                }
            }
            // if(data != null)
            // {
            // }
        };
        return SRPackGroup;
    }());
    Common.SRPackGroup = SRPackGroup;
})(Common || (Common = {}));
//# sourceMappingURL=SRPackGroup.js.map