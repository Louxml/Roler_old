class GravityParticles{
    constructor(particles){
        this.speed = 0;
        this.speedCycle = 0;
        this.area = new Vector(0,0);
        this.gravity = new Vector(0,0);
        this.accelRad = 0;
        this.accelRadCycle = 0;
        this.accelTan = 0;
        this.accelTanCycle = 0;
        this.particles = particles;
    }
    Emit(){
        return {
            speed:Math.floor(Math.random() * (2*this.speedCycle + 1)) + this.speed - this.speedCycle,
            area:this.area,
            gravity:this.gravity,
            accelRad:Math.floor(Math.random() * (2*this.accelRadCycle + 1)) + this.accelRad - this.accelRadCycle,
            accelTan:Math.floor(Math.random() * (2*this.accelTanCycle + 1)) + this.accelTan - this.accelTanCycle,
            Update:function(){

            }
        };
    }
}
class RadiusParticles{
    constructor(){
        this.startRadius = 0;
        this.startRadiusCycle = 0;
        this.endRadius = 0;
        this.accelTan = 0;
        this.accelTanCycle = 0;
    }
    Emit(){
        return {
            startRadius:Math.floor(Math.random() * (2*this.startRadiusCycle + 1)) + this.startRadius - this.startRadiusCycle,
            endRadius:this.endRadius,
            accelTan:Math.floor(Math.random() * (2*this.accelTanCycle + 1)) + this.accelTan - this.accelTanCycle,
            Update:function(){

            }
        };
    }
}

class Particles extends Component{
    
    static POSITION = { WORLD:0, LOCAL:1, PARENT:2 };
    static TARGET = { POINT:0, CIRCLE:1, RECT:2, CIRCLEBORDER:3, RECTBORDER:4 };
    static MODE = { GRAVITY:GravityParticles ,RADIUS:RadiusParticles };


    #target = 0;
    #render = null;
    #assetState = 0;
    #state = 0;

    // 粒子列表
    #data = [];
    // 位置定位
    #position = Particles.POSITION.LOCAL;
    // 粒子最大数
    #total = 10;
    // 时长（-1为永久）
    #duration = -1;
    // 已持续时长
    #time = 0;
    // 粒子生命周期
    #life = 1000;
    // 生命周期浮动值
    #lifeCycle = 0;
    // 粒子发射速率（每秒粒子数）
    #emission = 10;
    // 发射次数
    #emitTimes = 0;
    // 发射角度
    #angular = 0;
    // 角度浮动值
    #angularCycle = 0;
    // 起始状态
    #start = {
        size:40,
        sizeCycle:0,
        spin:0,
        spinCycle:0,
        color:new Color(255,255,255,1),
        colorCycle:new Color(0,0,0,0)
    };
    // 终止状态
    #end = {
        size:40,
        sizeCycle:0,
        spin:0,
        spinCycle:0,
        color:new Color(255,255,255,1),
        colorCycle:new Color(0,0,0,0)
    };
    // 发射模式
    #mode = null;


    constructor(target=0){
        super();
        if(typeof target != "number" && target.type != "Image")console.warn("Particles组件--->>>","不支持资源",target);
        this.#target = target;
        if(typeof this.#target == "number")this.#CreateRender();
        this.#mode = new Particles.MODE.GRAVITY();
        this.#Emit();
    }
    
    #CreateRender(){
        if(this.#target.type == "Image"){
            this.#render = Render.CreateRender(target.wdith,target.height);
            this.#render.drawImage(0,0,target.width,target.height);
        }else{
            this.#render = Render.CreateRender(49,49);
            console.log(this.#render);
            switch(this.#target){
                case Particles.TARGET.POINT:
                    this.#render.translate(this.#render.canvas.width/2,this.#render.canvas.height/2);
                    let grd = this.#render.createRadialGradient(0,0,0,0,0,this.#render.canvas.width/2-4);
                    grd.addColorStop(0,"rgba(255,255,255,1)");
                    grd.addColorStop(1,"rgba(255,255,255,0)");
                    this.#render.fillStyle = grd;
                    this.#render.arc(0,0,this.#render.canvas.width/2-2,0,2 * Math.PI);
                    this.#render.fill();
                break;
                case Particles.TARGET.CIRCLE:
                    this.#render.translate(this.#render.canvas.width/2,this.#render.canvas.height/2);
                    this.#render.fillStyle = "#ffffff";
                    this.#render.arc(0,0,this.#render.canvas.width/2-3,0,2 * Math.PI);
                    this.#render.fill();
                break;
                case Particles.TARGET.RECT:
                    this.#render.fillStyle = "#ffffff";
                    this.#render.fillRect(0,0,this.#render.canvas.width,this.#render.canvas.height);
                break;
                case Particles.TARGET.CIRCLEBORDER:
                    this.#render.translate(this.#render.canvas.width/2,this.#render.canvas.height/2);
                    this.#render.strokeStyle = "#ffffff";
                    this.#render.lineWidth = 2;
                    this.#render.arc(0,0,this.#render.canvas.width/2-4,0,2 * Math.PI);
                    this.#render.stroke();
                break;
                case Particles.TARGET.RECTBORDER:
                    this.#render.strokeStyle = "#ffffff";
                    this.#render.lineWidth = 2;
                    this.#render.strokeRect(this.#render.lineWidth/2,this.#render.lineWidth/2,this.#render.canvas.width-1*this.#render.lineWidth,this.#render.canvas.height-1*this.#render.lineWidth);
                break;
                default:
                    console.warn("Particles组件--->>>","target未定义内置",this.#target);
                break;
            }
        }
    }

    Update(dt){
        if(this.#target.type == "Image" && this.#target.state != this.#assetState && this.#assetState == 0){
            console.log("加载完成");
            this.#assetState = this.#target.state;
            this.#CreateRender();
        }
        if(this.#state == 1){
            if(this.#duration == -1 || this.#time < this.#duration){
                while(this.#time/(1000/this.#emission)>=this.#emitTimes){
                    this.#Emit();
                }
                this.#time += dt;
            }else{
                this.Stop();
            }
        }
        if(this.#state != 2){
            for(var i in this.#data){
                if(this.#data[i].life < 0){
                    this.#data.splice(i,1);
                    continue;
                }
                // this.data[i].size = (this.data[i].startSize-this.data[i].endSize)*this.data[i].life/this.data[i].Life+this.data[i].endSize;
                // this.data[i].spin = (this.data[i].startSpin-this.data[i].endSpin)*this.data[i].life/this.data[i].Life+this.data[i].endSpin;
                // this.data[i].update(dt);

                // this.data[i].a = ((((this.data[i].startA-this.data[i].endA)*this.data[i].life/this.data[i].Life+this.data[i].endA)*100)|0) /100;
                // this.data[i].r = ((this.data[i].startR-this.data[i].endR)*this.data[i].life/this.data[i].Life+this.data[i].endR)|0;
                // this.data[i].g = ((this.data[i].startG-this.data[i].endG)*this.data[i].life/this.data[i].Life+this.data[i].endG)|0;
                // this.data[i].b = ((this.data[i].startB-this.data[i].endB)*this.data[i].life/this.data[i].Life+this.data[i].endB)|0;

                // if(this.data[i].life<=dt+3 && this.data[i].life > 0)this.data[i].life = 0;
                // else this.data[i].life-=dt;
            }
        }
        this.#Render();
    }

    Awake(){
        if(!this.gameObject.render){
            this.gameObject.render = Render.CreateRender();
        }else{
            console.warn("Particles组件--->>>","render已存在","该组件失效");
            this.SetEnabled(false);
        }
    }
    
    Play(){
        this.#state = 1;
    }

    Pause(){
        this.#state = 2;
    }

    Stop(){
        this.#state = 0;
        this.#time = 0;
    }

    #Emit(){
        this.#emitTimes++;
        if(this.#data.length < this.#total){
            let p = this.#mode.Emit();
            p.x = 0;
            p.y = 0;
            p.life = Math.floor(Math.random() * (2*this.#lifeCycle + 1)) + this.#life - this.#lifeCycle;
            p.angular = Math.floor(Math.random() * (2* this.#angularCycle + 1)) + this.#angular - this.#angularCycle;
            p.start = {
                size:Math.floor(Math.random() * (2*this.#start.sizeCycle + 1)) + this.#start.size - this.#start.sizeCycle,
                spin:Math.floor(Math.random() * (2*this.#start.spinCycle + 1)) + this.#start.spin - this.#start.spinCycle,
                color:new Color(Math.floor(Math.random() * (2*this.#start.colorCycle.r + 1)) + this.#start.color.r - this.#start.colorCycle.r,Math.floor(Math.random() * (2*this.#start.colorCycle.g + 1)) + this.#start.color.g - this.#start.colorCycle.g, Math.floor(Math.random() * (2*this.#start.colorCycle.b + 1)) + this.#start.color.b - this.#start.colorCycle.b, Math.floor(Math.random() * (2*this.#start.colorCycle.a + 1)) + this.#start.color.a - this.#start.colorCycle.a)
            };
            p.end = {
                size:Math.floor(Math.random() * (2*this.#end.sizeCycle + 1)) + this.#end.size - this.#end.sizeCycle,
                spin:Math.floor(Math.random() * (2*this.#end.spinCycle + 1)) + this.#end.spin - this.#end.spinCycle,
                color:new Color(Math.floor(Math.random() * (2*this.#end.colorCycle.r + 1)) + this.#end.color.r - this.#end.colorCycle.r,Math.floor(Math.random() * (2*this.#end.colorCycle.g + 1)) + this.#end.color.g - this.#end.colorCycle.g, Math.floor(Math.random() * (2*this.#end.colorCycle.b + 1)) + this.#end.color.b - this.#end.colorCycle.b, Math.floor(Math.random() * (2*this.#end.colorCycle.a + 1)) + this.#end.color.a - this.#end.colorCycle.a)
            };
            this.#data.push(p);
        }
    }

    #Render(){
        let render = this.gameObject.render;
        let image = this.#render.canvas;
        Render.Clear(render);
        render.save();
        render.translate(render.canvas.width/2,render.canvas.height/2);

        // 渲染每一个粒子
        // 调试render
        render.drawImage(image,-0.5*image.width,-0.5*image.height);
        render.fillStyle = "#ff0000";
        render.globalCompositeOperation="source-in";
        render.fillRect(-0.5*image.width,-0.5*image.height,image.width,image.height);

        render.restore();
        //轴点固定，且失效
        this.gameObject.transform.anchor = new Vector(0.5,0.5);
    }

}