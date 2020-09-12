class Light{

    static data = [];
    static color = new Color(0,0,0);
    static brightness = 0;

    static Update(t){
        for(var i in this.data){
            this.data[i].Update(t);
        }
    }

    constructor(brightness=1){
        this.brightness = brightness;
        this.color = Light.color;
        this.render = Render.CreateRender();
        document.body.appendChild(this.render.canvas);
        this.render.globalCompositeOperation = "destination-out";
        Light.data.push(this);
    }

    Update(t){
        Render.Clear(this.render);
        this.render.save();
        this.render.globalCompositeOperation = "source-over";
        this.render.fillStyle = new Color(this.color.r,this.color.g,this.color.b,1-this.brightness);
        this.render.fillRect(0,0,this.render.canvas.width,this.render.canvas.height);
        this.render.restore();
    }
}