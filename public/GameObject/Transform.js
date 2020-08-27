class Transform extends Component{
    constructor(){
        super();
        this.position = new Vector(0,0);
        this.rotate = 0;
        this.scale = new Vector(1,1);
        this.anchor = new Vector(0.5,0.5);
    }

    Update(dt){
        
    }

    Destroy(){
        console.warn("不可移除");
    }

    Translate(camera,scale=true){
        if(this.gameObject.parent){
            this.gameObject.parent.transform.Translate(camera);
        }
        camera.canvas.translate(this.position.x,this.position.y);
        if(scale)camera.canvas.scale(this.scale.x,this.scale.y);
        camera.canvas.rotate(this.rotate * Math.PI/180);
    }
}