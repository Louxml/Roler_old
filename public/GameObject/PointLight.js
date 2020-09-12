class PointLight extends Component{

    #isRender = true;
    #radius = 0;
    #start = 0;
    #end = 360;
    #brightness = 0;
    #color = null;
    #light = null;
    constructor(){
        super();
        this.#light = Render.CreateRender(100,100);
        this.#color = new Color(255,255,255);
        this.radius = 300;
        this.start = 0;
        this.end = 360;
        this.brightness = 0.8;

    }

    // set color(value){

    // }
    // get color(){
        
    // }
    set radius(value){
        this.#isRender = true;
        this.#light.canvas.width = value * 2 + 2;
        this.#light.canvas.height = value * 2 + 2;
        this.#radius = value;
    }
    get radius(){
        return this.#radius;
    }
    set start(value){
        this.#isRender = true;
        this.#start = value;
    }
    get start(){
        return this.#start;
    }
    set end(value){
        this.#isRender = true;
        this.#end = value;
    }
    get end(){
        return this.#end;
    }
    set brightness(value){
        this.isRender = true;
        this.#brightness = value;
    }
    get brightness(){
        return this.#brightness;
    }

    Awake(){
        if(!this.gameObject.light){
            this.gameObject.light = this.#light;
        }else{
            console.warn("Light组件--->>>","light已存在","该组件失效");
            this.SetEnabled(false);
        }
    }

    Start(){
        
    }

    Update(dt){
        
    }

    Render(dt){
        console.log()
        if(this.#isRender){
            this.#isRender = false;
            console.log("光线重绘");
            let render = this.gameObject.light;
            render.save();
            render.translate((render.canvas.width/2)|0,(render.canvas.height/2)|0);
            render.beginPath();
            render.moveTo(0,0);
            render.arc(0,0,this.#radius,this.#start/180*Math.PI,this.#end/180*Math.PI);
            render.closePath();
            var grd=render.createRadialGradient(0,0,0,0,0,this.radius);
            grd.addColorStop(0,`rgba(${this.#color.r},${this.#color.g},${this.#color.b},${this.#brightness}`);
            grd.addColorStop(1,`rgba(${this.#color.r},${this.#color.g},${this.#color.b},0)`);
            render.fillStyle=grd;
            render.fill();
            render.restore();
        }
    }
    OnDestroy(){

    }
}