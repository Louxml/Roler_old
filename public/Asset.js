class Asset{
    constructor(type="undefined",data=null){
        if(Asset.type.includes(type))this.type = type;
        else{
            console.warn("资源管理器--->>>未知资源类型",type);
            this.type = Asset.type[0];
        }
        this.data = data;
        this.state = 0;
    }
    SetState(state){
        if(typeof state == "number" && Asset.state.includes(state)){
            this.state = state;
        }else{
            //警告信息
            console.warn("资源管理器--->>>未知资源状态",state);
        }
    }
}
Asset.type = [
    "undefined",    //未定义资源
    "Image",        //图片资源
    "Sprite",       //精灵图集资源
];

Asset.state = [
    0,      //未完成
    1,      //已完成
    2,      //已失败
];

class ImageAsset extends Asset{
    constructor(data=null){
        super("Image",data);
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
    }
    SetSize(width,height){
        if(typeof width === "number" && typeof height == "number"){
            this.width = width;
            this.height = height;
        }else{
            //警告信息
            console.warn("资源管理器--->>>参数类型错误",width,height);
        }
    }
    GetSize(){
        return {width:this.width,height:this.height};
    }
}
class SpriteAsset extends Asset{
    constructor(data=null,width,height){
        super("Sprite",data);
        this.splice = [];
        this.swidth = 0;
        this.sheight = 0;
        this.width = width;
        this.height = height;
    }
    SetSize(swidth,sheight){
        if(typeof swidth === "number" && typeof sheight == "number"){
            this.swidth = swidth;
            this.sheight = sheight;
            if(!this.width)this.width = swidth;
            if(!this.height)this.height = sheight;
            //裁剪信息
            this.splice = [];
            for(var j = 0;(j + 1) * this.height <= this.sheight;j++){
                for(var i = 0;(i + 1) * this.width <= this.swidth;i++){
                    this.splice.push(i*this.width);
                    this.splice.push(j*this.height);
                }
            }
        }else{
            //警告信息
            console.warn("资源管理器--->>>参数类型错误",swidth,sheight);
        }
    }
    GetSize(){
        return {width:this.width,height:this.height};
    }
}