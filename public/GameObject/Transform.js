class Transform extends Component{
    constructor(){
        super();
        this.position = new Vector(0,0);
        this.rotate = 0;
        this.scale = new Vector(1,1);
        this.anchor = new Vector(0.5,0.5);
        // this.worldPosition = new Vector(0,0);
        // this.worldRotate = 0;
        // this.worldScale = new Vector(1,1);
    }

    Update(dt){
        // console.log();
        // if(this.parent == null){
        //     this.worldPosition = this.position;
        //     this.worldRotate = this.rotate;
        //     this.worldScale = this.scale;
        // }else{
        //     this.worldPosition = Vector.Distance(this.position.x*this.worldScale.x,this.position.y*this.worldScale.y);
        //     this.worldRotate = this.gameObject.parent.transform.worldRotate + this.rotate;
        //     this.worldScale = new Vector(this.gameObject.parent.transform.worldScale.x * this.scale.x,this.gameObject.parent.transform.worldScale.y * this.scale.y);
        // }
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