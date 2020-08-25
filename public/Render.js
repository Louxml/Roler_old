let Render = new class Render{
    constructor(){
        this.active = false;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.cameras = [];
        this.layer = ["default"];
    }
    Init(){
        this.canvas = document.getElementById("Game");
        this.canvas.width = this.width;
        this.canvas.heigth = this.height;
        this.context = this.canvas.getContext("2d");
    }
    Update(t){
        if(document.body && !this.active){
            this.active = true;
            this.Init();
        }
    }

    AddLayer(layer){
        if(typeof layer == "string" && !this.layer.includes(layer))this.layer.push(layer);
    }
    RemoveLayer(layer){
        this.layer.splice(this.layer.indexOf(layer),1);
    }
    CreateCanvas(){
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        return canvas.getContext("2d");
    }
}