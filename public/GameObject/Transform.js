class Transform extends Component{
    constructor(){
        super();
        this.position = new Vector(0,0);
        this.rotate = 0;
        this.scale = new Vector(1,1);
        this.anchor = new Vector(0.5,0.5);
    }
}