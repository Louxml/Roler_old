class GravityParticles{
    constructor(particles){
        this.speed = 100;
        this.speedCycle = 40;
        this.area = new Vector(0,0);
        this.gravity = new Vector(0,0);
        this.accelRad = 0;
        this.accelRadCycle = 0;
        this.accelTan = 0;
        this.accelTanCycle = 0;
    }
    Emit(p){
        p.x = Math.floor(Math.random() * (2*this.area.x + 1)) - this.area.x;
        p.y = Math.floor(Math.random() * (2*this.area.y + 1)) - this.area.y;
        p.speed = Math.floor(Math.random() * (2*this.speedCycle + 1)) + this.speed - this.speedCycle;
        p.area = this.area;
        p.gravity = this.gravity;
        p.accelRad = Math.floor(Math.random() * (2*this.accelRadCycle + 1)) + this.accelRad - this.accelRadCycle;
        p.accelTan = Math.floor(Math.random() * (2*this.accelTanCycle + 1)) + this.accelTan - this.accelTanCycle;
        p.Update = function(dt){
            if(this.life == this.totalLife)dt = 0;
            let nx = this.x?this.x/Math.hypot(this.x,this.y):0;
            let ny = this.y?this.y/Math.hypot(this.x,this.y):0;
            let rx = nx*this.accelRad;
            let ry = -ny*this.accelRad;
            let tx = ny * this.accelTan;
            let ty = nx * this.accelTan;
            let gx = this.gravity.x;
            let gy = this.gravity.y;
            let ax = rx+tx+gx;
            let ay = ry+ty+gy;
            ax *= (this.totalLife-this.life)/1000;
            ay *= (this.totalLife-this.life)/1000;
            let x = Math.cos(this.angular * Math.PI/180)*this.speed + ax;
            let y = Math.sin(this.angular * Math.PI/180)*this.speed + ay;
            x *= dt/1000;
            y *= dt/1000;
            x = (x*100|0)/100;
            y = (y*100|0)/100;
            this.x += x;
			this.y -= y;
        }.bind(p);
    }
}
class RadiusParticles{
    constructor(){
        this.startRadius = 0;
        this.startRadiusCycle = 0;
        this.endRadius = 100;
        this.accelTan = 0;
        this.accelTanCycle = 180;
    }
    Emit(p){
        p.startRadius = Math.floor(Math.random() * (2*this.startRadiusCycle + 1)) + this.startRadius - this.startRadiusCycle;
        p.endRadius = this.endRadius;
        p.accelTan = Math.floor(Math.random() * (2*this.accelTanCycle + 1)) + this.accelTan - this.accelTanCycle;
        p.x = Math.cos(p.angular * Math.PI/180) * p.startRadius;
        p.y = Math.sin(p.angular * Math.PI/180) * p.startRadius;
        p.Update = function(dt){
            let radius = (this.startRadius - this.endRadius) * this.life/this.totalLife + this.endRadius;
            let angle = this.angular + this.accelTan * (this.totalLife - this.life)/this.totalLife;
            this.x = Math.cos(angle * Math.PI/180)*radius;
            this.y = Math.sin(angle * Math.PI/180)*radius;
        }.bind(p);
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
    #total = 100;
    // 时长（-1为永久）
    #duration = -1;
    // 已持续时长
    #time = 0;
    // 粒子生命周期
    #life = 1000;
    // 生命周期浮动值
    #lifeCycle = 0;
    // 粒子发射速率（每秒粒子数）
    #emission = 100;
    // 发射次数
    #emitTimes = 0;
    // 发射角度
    #angular = 90;
    // 角度浮动值
    #angularCycle = 0;
    // 起始状态
    #start = {
        size:40,
        sizeCycle:0,
        spin:0,
        spinCycle:0,
        color:new Color(26,77,140,1),
        colorCycle:new Color(0,0,0,0)
    };
    // 终止状态
    #end = {
        size:6,
        sizeCycle:0,
        spin:0,
        spinCycle:0,
        color:new Color(0,0,0,1),
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
			this.#render.save();
			this.#render.drawImage(0,0,target.width,target.height);
			this.#render.restore();
        }else{
			this.#render = Render.CreateRender(49,49);
			this.#render.save();
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
			this.#render.restore();
		}
		this.#render.globalCompositeOperation="source-in";
    }

    Update(dt){
		dt = dt | 0;
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
                let p = this.#data[i];
                p.size = (p.start.size-p.end.size)*p.life/p.totalLife+p.end.size;
				p.spin = (p.start.spin-p.end.spin)*p.life/p.totalLife+p.end.spin;
				p.color = new Color(
					((p.start.color.r-p.end.color.r)*p.life/p.totalLife+p.end.color.r)|0,
					((p.start.color.g-p.end.color.g)*p.life/p.totalLife+p.end.color.g)|0,
					((p.start.color.b-p.end.color.b)*p.life/p.totalLife+p.end.color.b)|0,
					((((p.start.color.a-p.end.color.a)*p.life/p.totalLife+p.end.color.a)*100)|0)/100
				);
                p.Update(dt);

                if(p.life<=dt+3 && p.life > 0)p.life = 0;
                else p.life-=dt;
            }
        }
        this.#Render();
    }

    Awake(){
        if(!this.gameObject.render){
			this.gameObject.render = Render.CreateRender();
			console.log(this.gameObject.render);
			this.gameObject.render.globalCompositeOperation="lighter";
        }else{
            console.warn("Particles组件--->>>","render已存在","该组件失效");
            this.SetEnabled(false);
        }
    }

    #Emit(){
        this.#emitTimes++;
        if(this.#data.length < this.#total){
            let p = {};
            p.x = p.x || 0;
            p.y = p.y || 0;
            p.life = Math.floor(Math.random() * (2*this.#lifeCycle + 1)) + this.#life - this.#lifeCycle;
            p.angular = Math.floor(Math.random() * (2* this.#angularCycle + 1)) + this.#angular - this.#angularCycle;
            p.start = {
                size:Math.floor(Math.random() * (2*this.#start.sizeCycle + 1)) + this.#start.size - this.#start.sizeCycle,
                spin:Math.floor(Math.random() * (2*this.#start.spinCycle + 1)) + this.#start.spin - this.#start.spinCycle,
                color:new Color(
					Math.floor(Math.random() * (2*this.#start.colorCycle.r + 1)) + this.#start.color.r - this.#start.colorCycle.r,
					Math.floor(Math.random() * (2*this.#start.colorCycle.g + 1)) + this.#start.color.g - this.#start.colorCycle.g,
					Math.floor(Math.random() * (2*this.#start.colorCycle.b + 1)) + this.#start.color.b - this.#start.colorCycle.b,
					Math.floor(Math.random() * (2*this.#start.colorCycle.a + 1)) + this.#start.color.a - this.#start.colorCycle.a
				)
            };
            p.end = {
                size:Math.floor(Math.random() * (2*this.#end.sizeCycle + 1)) + this.#end.size - this.#end.sizeCycle,
                spin:Math.floor(Math.random() * (2*this.#end.spinCycle + 1)) + this.#end.spin - this.#end.spinCycle,
                color:new Color(
					Math.floor(Math.random() * (2*this.#end.colorCycle.r + 1)) + this.#end.color.r - this.#end.colorCycle.r,
					Math.floor(Math.random() * (2*this.#end.colorCycle.g + 1)) + this.#end.color.g - this.#end.colorCycle.g,
					Math.floor(Math.random() * (2*this.#end.colorCycle.b + 1)) + this.#end.color.b - this.#end.colorCycle.b,
					Math.floor(Math.random() * (2*this.#end.colorCycle.a + 1)) + this.#end.color.a - this.#end.colorCycle.a
				)
            };
            p.totalLife = p.life;
            this.#mode.Emit(p)
            this.#data.push(p);
        }
    }

    #Render(){
        let render = this.gameObject.render;
        let image = this.#render.canvas;
        Render.Clear(render);
        render.save();
		render.translate(render.canvas.width/2,render.canvas.height/2);
		let data = this.#data;
		for(var i in data){
			this.#render.fillStyle = new Color(data[i].color.r,data[i].color.g,data[i].color.b);
			this.#render.fillRect(0,0,this.#render.canvas.width,this.#render.canvas.height);
			render.save();
			render.translate(data[i].x,data[i].y);
			render.rotate(data[i].spin * Math.PI / 180);
			render.globalAlpha = data[i].color.a;
			render.drawImage(image,-0.5*data[i].size,-0.5*data[i].size,data[i].size,data[i].size);
			render.restore();
		};
        render.restore();
        //轴点固定，且失效
        this.gameObject.transform.anchor = new Vector(0.5,0.5);
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
		this.#emitTimes = 0;
	}
	
	setTotal(value){
		this.#total = Number(value);
	}
	getTotal(){
		return this.#total;
	}
	setDuration(value){
		this.#duration = Number(value);
		this.#time = 0;
		this.#emitTimes = 0;
	}
	getDuration(){
		return this.#duration;
	}
	setLife(value){
		this.#life = Number(value);
	}
	getLife(){
		return this.#life;
	}
	setLifeCycle(value){
		this.#lifeCycle = Number(value);
	}
	getLifeCycle(){
		return this.#lifeCycle;
	}
	setEmission(value){
		this.#emission = Number(value);
	}
	getEmission(){
		return this.#emission;
	}
	setAngular(value){
		this.#angular = Number(value);
	}
	getAngular(){
		return this.#angular;
	}
	setAngularCycle(value){
		this.#angularCycle = Number(value);
	}
	getAngularCycle(){
		return this.#angularCycle;
	}
	setStart(key,value){
		this.#start[key] = Number(value);
	}
	getStart(key){
		return this.#start[key];
	}
	setEnd(key,value){
		this.#end[key] = Number(value);
	}
	getEnd(key){
		return this.#end[key];
	}
	setMode(mode){
		if(mode == 0){
			this.#mode = new GravityParticles();
		}else if(mode == 1){
			this.#mode = new RadiusParticles();
		}
	}
	setGravitySpeed(value){
		if(this.#mode.constructor.name == "GravityParticles"){
			this.#mode.speed = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getGravitySpeed(){
		return this.#mode.speed;
	}
	setGravitySpeedCycle(value){
		if(this.#mode.constructor.name == "GravityParticles"){
			this.#mode.speedCycle = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getGravitySpeedCycle(){
		return this.#mode.speedCycle;
	}
	setGravityArea(value){
		if(this.#mode.constructor.name == "GravityParticles" && value.constructor.name == "Vector"){
			this.#mode.area = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器错误");
		}
	}
	getGravityArea(){
		return this.#mode.area;
	}
	setGravity(value){
		if(this.#mode.constructor.name == "GravityParticles" && value.constructor.name == "Vector"){
			this.#mode.gravity = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器错误");
		}
	}
	getGravity(){
		return this.#mode.gravity;
	}
	setGravityAccelRad(value){
		if(this.#mode.constructor.name == "GravityParticles"){
			this.#mode.accelRad = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getGravityAccelRad(){
		return this.#mode.accelRad;
	}
	setGravityAccelRadCycle(value){
		if(this.#mode.constructor.name == "GravityParticles"){
			this.#mode.accelRadCycle = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getGravityAccelRadCycle(){
		return this.#mode.accelRadCycle;
	}
	
	setGravityAccelTan(value){
		if(this.#mode.constructor.name == "GravityParticles"){
			this.#mode.accelTan = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getGravityAccelTan(){
		return this.#mode.accelTan;
	}
	setGravityAccelTanCycle(value){
		if(this.#mode.constructor.name == "GravityParticles"){
			this.#mode.accelTanCycle = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getGravityAccelTanCycle(){
		return this.#mode.accelTanCycle;
	}

	setRadiusStartRadius(value){
		if(this.#mode.constructor.name == "RadiusParticles"){
			this.#mode.startRadius = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getRadiusStartRadius(){
		return this.#mode.startRadius;
	}
	
	setRadiusStartRadiusCycle(value){
		if(this.#mode.constructor.name == "RadiusParticles"){
			this.#mode.startRadiusCycle = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getRadiusStartRadiusCycle(){
		return this.#mode.startRadiusCycle;
	}

	setRadiusEndRadius(value){
		if(this.#mode.constructor.name == "RadiusParticles"){
			this.#mode.endRadius = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getRadiusEndRadius(){
		return this.#mode.endRadius;
	}

	setRadiusAccelTan(value){
		if(this.#mode.constructor.name == "RadiusParticles"){
			this.#mode.accelTan = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getRadiusAccelTan(){
		return this.#mode.accelTan;
	}
	setRadiusAccelTanCycle(value){
		if(this.#mode.constructor.name == "RadiusParticles"){
			this.#mode.accelTanCycle = Number(value);
		}else{
			console.log("Particles组件--->>>","发射器不存在");
		}
	}
	getRadiusAccelTanCycle(){
		return this.#mode.accelTanCycle;
	}
}