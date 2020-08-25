class Camera extends Component{
    constructor(){
        super();
        this.layers = Render.layer;
        this.canvas = Render.CreateCanvas();
        Render.cameras.push(this);
    }
    Awake(){
        console.log(this.canvas);
    }

    Update(dt){
        let data = this.gameObject.scene.data;
    }
}