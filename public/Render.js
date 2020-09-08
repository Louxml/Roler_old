let Render = new class Render{
    constructor(){
        this.active = false;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = null;
        this.render = null;
        this.cameras = [];
        this.layers = ["default"];
    }
    Init(){
        this.canvas = document.getElementById("Game");
        this.ui = document.createElement("div");
        this.ui.style.width = "100%";
        this.ui.style.height = "100%";
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.render = this.canvas.getContext("2d");
        document.body.oncontextmenu = () => {return false;}
        document.body.appendChild(this.ui);
    }
    Update(t){
        if(document.body && !this.active){
            this.active = true;
            this.Init();
        }
        this.Render();
    }
    SetCameras(cameras){
        this.cameras = cameras;
    }
    CreateDIV(type='div'){
        let div = document.createElement(type);
        div.style.border = "none";
        div.style.outline = "none";
        div.style.width = "0px";
        div.style.height = "0px";
        return div;
    }
    AddLayer(layer){
        if(typeof layer == "string" && !this.layers.includes(layer))this.layers.push(layer);
    }
    RemoveLayer(layer){
        this.layers.splice(this.layers.indexOf(layer),1);
    }
    AddUI(html){
        this.ui.appendChild(html);
    }
    RemoveUI(html){
        this.ui.removeChild(html);
    }
    CreateRender(width=0,height=0){
        let canvas = document.createElement('canvas');
        canvas.width = width || this.width;
        canvas.height = height || this.height;
        let context = canvas.getContext("2d");
        //完美像素
        context.pixel = false;
        //Alpha通道
        context.alpha = 1;
        // document.body.appendChild(canvas);
        return context;
    }

    
    Render(){
        if(this.render){
            this.Clear(this.render);
            // console.log(this.cameras);
            for(var i in this.cameras){
                let camera = this.cameras[i];
                let x = this.render.canvas.width * camera.viewport.x;
                let y = this.render.canvas.height * camera.viewport.y;
                let width = this.render.canvas.width * camera.viewport.width;
                let height = this.render.canvas.height * camera.viewport.height;
                this.render.drawImage(camera.canvas.canvas,x,y,width,height);
            }
        }else{
            //警告信息
        }
    }
    Clear(render){
        render.clearRect(0,0,render.canvas.width,render.canvas.height);
    }
}