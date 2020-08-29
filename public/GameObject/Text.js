class Text extends Component{

    #isRender = true;
    #color = new Color(0,0,0,1);
    #width = 0;
    #height = 0;
    constructor(text=''){
        super();
        this.text = text;
        this.pixel = false;
        this.color = new Color(0,0,0,1);
        this.font = 'Arial';
        this.size = 10;
        this.style = 'normal';
    }
    Awake(){
        if(!this.gameObject.render){
            this.gameObject.render = Render.CreateRender();
            
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
        if(this.#color.toString() != this.color.toString()){
            this.#isRender = true;
            this.#color = new Color(this.color.r,this.color.g,this.color.b,this.#color.a);
        }
    }

    Render(dt){
        if(this.#isRender){
            this.#isRender = false;
            console.log("重新渲染");
            let render = this.gameObject.render;
            Render.Clear(render);
            render.save();
            let font = this.style + ' ' + this.size + 'px ' + this.font;
            render.font = font;
            let width = this.gameObject.render.measureText(this.text).width | 0;
            this.#width = width;
            this.gameObject.render.canvas.width = this.#width;
            this.#height = this.size;
            this.gameObject.render.canvas.height = this.#height;
            render.font = font;
            render.fillStyle = new Color(this.#color.r,this.#color.g,this.#color.b,1).toString();
            render.textBaseline="top";
            render.fillText(this.text,0,0);
            render.restore();
        }
    }

    SetText(text){
        text = String(Text);
        this.text = text;
        this.#isRender = true;
    }
    SetColor(color){
        if(color.constructor.name == 'Color'){
            this.color = color;
        }else{
            console.log("Text组件--->>>","color错误",color);
        }
    }
    SetSize(size){
        if(typeof size == 'number'){
            this.size = size;
            this.#isRender = true;
        }else{
            // 警告信息
            console.log("Text组件--->>>","size错误",size);
        }
    }
    SetFont(font){
        font = String(font);
        this.font = font;
        this.#isRender = true;
    }
    SetStyle(style){
        style = String(style);
        this.style = style;
        this.#isRender = true;
    }
    OnDestroy(){
        this.gameObject.render = null;
    }
}