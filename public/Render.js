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
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.render = this.canvas.getContext("2d");
        document.body.oncontextmenu = () => {return false;}
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
    AddLayer(layer){
        if(typeof layer == "string" && !this.layers.includes(layer))this.layers.push(layer);
    }
    RemoveLayer(layer){
        this.layers.splice(this.layers.indexOf(layer),1);
    }
    CreateRender(width=0,height=0){
        let canvas = document.createElement('canvas');
        canvas.width = width | this.width;
        canvas.height = height | this.height;
        let context = canvas.getContext("2d");
        return context;
    }
    CameraRender(camera,gameObject){
        camera.canvas.save();
        gameObject.transform.Translate(camera);
        camera.canvas.imageSmoothingEnabled = !gameObject.render.pixel;
        camera.canvas.globalAlpha = gameObject.render.alpha;
        camera.canvas.drawImage(gameObject.render.canvas,-gameObject.render.canvas.width/2|0,-gameObject.render.canvas.height/2|0);
        camera.canvas.restore();
    }
    Render(){
        if(this.render){
            this.Clear(this.render);
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