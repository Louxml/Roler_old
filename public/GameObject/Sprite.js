class Sprite extends Component{
    constructor(sprite=null){
        super();
        this.sprite = sprite;
        this.pixel = true;
        this.color = new Color(255,255,255,1);
        this.filpX = false;
        this.filpY = false;
        this.isRender = false;
    }
    Awake(){
        //创建canvas去渲染
        if(!this.gameObject.render){
            this.gameObject.render = Render.CreateRender();
            console.log(this.gameObject.render);
            if(image.nodeName == "IMG")this.SetSprite(this.sprite);
        }else{
            console.warn("render已存在,组件失效");
            this.SetEnabled(false);
        }
    }

    Start(){
        
    }

    Update(dt){
        this.gameObject.render.pixel = this.pixel;
        this.gameObject.render.alpha = this.color.a;
        let oldColor = Color.ToString(this.gameObject.render.fillStyle);
        let color = new Color(this.color.r,this.color.g,this.color.b,1).toString();
        if(oldColor != color){
            this.isRender = true;
            this.gameObject.render.fillStyle = color;
        }
    }

    Render(dt){
        if(this.isRender){
            console.log("重渲染");
            Render.Clear(this.gameObject.render);
            this.gameObject.render.save();
            let scaleX = this.filpX?-1:1;
            let scaleY = this.filpY?-1:1;
            console.log(scaleX,scaleY);
            this.gameObject.render.scale(scaleX,scaleY);
            this.gameObject.render.translate(-this.filpX * this.sprite.width,-this.filpY * this.sprite.height);
            this.gameObject.render.drawImage(this.sprite,0,0,this.sprite.width,this.sprite.height);
            this.gameObject.render.globalCompositeOperation = "source-atop";
            this.gameObject.render.fillRect(0,0,this.sprite.width,this.sprite.height);
            this.gameObject.render.globalCompositeOperation = "darken";
            this.gameObject.render.drawImage(this.sprite,0,0,this.sprite.width,this.sprite.height);
            this.gameObject.render.restore();
            this.isRender = false;
        }
    }

    SetSprite(image){
        if(image.nodeName == "IMG"){
            this.sprite = image;
            this.gameObject.render.canvas.width = this.sprite.width;
            this.gameObject.render.canvas.height = this.sprite.height;
            this.isRender = true;
        }else{
            // 警告信息
            console.warn("Image error!");
        }
    }
    SetFilpX(x){
        if(typeof x == "boolean"){
            this.filpX = x;
            this.isRender = true;
        }else{
            // 警告信息
        }
    }
    SetFilpY(y){
        if(typeof y == "boolean"){
            this.filpY = y;
            this.isRender = true;
        }else{
            // 警告信息
        }
    }
    OnDestroy(){
        this.gameObject.render = null;
    }
}