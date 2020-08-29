class Sprite extends Component{
    
    #filpX = false;
    #filpY = false;
    #isRender = false;
    #index = 0;
    #state = 0;
    constructor(sprite=null){
        super();
        this.sprite = sprite;
        this.pixel = true;
        this.color = new Color(255,255,255,1);
    }
    Awake(){
        if(!this.gameObject.render){
            this.gameObject.render = Render.CreateRender();
            this.SetSprite(this.sprite);
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
        if(this.#state != this.sprite.state && this.sprite.state == 1){
            console.log("加载完成");
            this.#state = this.sprite.state;
            this.#isRender = true;
        }
        if(this.#state == 1 && oldColor != color){
            this.#isRender = true;
            this.gameObject.render.fillStyle = color;
        }
    }

    Render(dt){
        if(this.#isRender){
            this.#isRender = false;
            console.log("重新渲染");
            Render.Clear(this.gameObject.render);
            this.gameObject.render.save();
            let sx,sy,sw,sh,width,height;
            if(this.sprite.type == "Image"){
                sx = this.sprite.x;
                sy = this.sprite.y;
                sw = this.sprite.width;
                sh = this.sprite.height;
                width = this.sprite.width;
                height = this.sprite.height;
            }else if(this.sprite.type = "Sprite"){
                console.log();
                sx = this.sprite.splice[this.#index*2];
                sy = this.sprite.splice[this.#index*2+1];
                sw = this.sprite.width;
                sh = this.sprite.height;
                width = this.sprite.width;
                height = this.sprite.height;
            }
            let scaleX = this.#filpX?-1:1;
            let scaleY = this.#filpY?-1:1;
            this.gameObject.render.scale(scaleX,scaleY);
            this.gameObject.render.translate(-this.#filpX * this.gameObject.render.canvas.width,-this.#filpY * this.gameObject.render.canvas.height);
            this.gameObject.render.drawImage(this.sprite.data,sx,sy,sw,sh,0,0,width,height);
            this.gameObject.render.globalCompositeOperation = "source-atop";
            this.gameObject.render.fillRect(0,0,this.sprite.width,this.sprite.height);
            this.gameObject.render.globalCompositeOperation = "darken";
            this.gameObject.render.drawImage(this.sprite.data,sx,sy,sw,sh,0,0,width,height);
            this.gameObject.render.restore();
        }
    }

    SetSprite(image){
        if(image.type == "Image" || image.type == "Sprite"){
            this.sprite = image;
            this.#state = image.state;
            this.gameObject.render.canvas.width = this.sprite.width;
            this.gameObject.render.canvas.height = this.sprite.height;
            if(this.#state != 0)this.#isRender = true;
        }else{
            // 警告信息
            console.warn("Image error!");
        }
    }
    SetFilpX(x){
        if(typeof x == "boolean"){
            this.#filpX = x;
            this.#isRender = true;
        }else{
            // 警告信息
        }
    }
    SetFilpY(y){
        if(typeof y == "boolean"){
            this.#filpY = y;
            this.#isRender = true;
        }else{
            // 警告信息
        }
    }
    SetColor(color){
        if(color.constructor.name == 'Color'){
            this.color = color;
        }else{
            console.log("Sprite组件--->>>","color错误",color);
        }
    }
    OnDestroy(){
        this.gameObject.render = null;
    }
}