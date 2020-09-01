class Loader{
    constructor(){
        
    }
}

Loader.data = {};
Loader.current = 0;
Loader.total = 0;
Loader.Image = function(name,url){
    if(this.data[name]){
        //警告信息
        console.warn("加载管理器--->>>资源命名已存在，将覆盖",name);
    }
    let image = new Image();
    let data = new ImageAsset(image);
    image.onload = function(e){
        data.SetState(1);
        data.SetSize(image.width,image.height);
        this.current++;
        this.Check();
    }.bind(this);
    image.onerror = function(e){
        data.SetState(2);
        this.current++;
        this.Check();
    }
    this.total++;
    image.src = url;
    this.data[name] = data;
    return data;
}
Loader.Sprite = function(name,url,width=null,height=null){
    if(this.data[name]){
        //警告信息
        console.warn("加载管理器--->>>资源键值已存在",name);
    }
    let image = new Image();
    let data = new SpriteAsset(image,width,height);
    image.onload = function(e){
        data.SetState(1);
        data.SetSize(image.width,image.height);
        this.current++;
        this.Check();
    }.bind(this);
    image.onerror = function(e){
        data.SetState(2);
        this.current++;
        this.Check();
    }
    this.total++;
    image.src = url;
    this.data[name] = data;
    return data;
}
Loader.Check = function(){
    this.OnProgress();
    if(this.current == this.total){
        this.OnComplete();
    }
}
Loader.OnProgress = function(){

}
Loader.OnComplete = function(){

}
Loader.GetAsset = function(name){
    if(this.data[name]){
        return this.data[name];
    }else{
        //警告信息
        console.warn("加载管理器--->>>资源键值不存在",name);
    }
}