class Camera extends Component{
    constructor(){
        super();
        this.layers = Render.layer;
        this.depth = 0;
        this.canvas = Render.CreateRender();
        this.viewport = {
            x:0,y:0,width:1,height:1
        };
    }
    Awake(){
        // this.gameObject.transform.position = new Vector(100,0);
    }
    Start(){
        
    }

    Update(dt){
        
    }

    Render(dt){
        let table = [];
        let tree = this.gameObject.scene.data;
        let data = [];
        for(var i in tree){
            this.Tree(tree[i],table);
        }
        for(var i in table){
            data = data.concat(table[i]);
        }
        Render.Clear(this.canvas);
        this.canvas.save();
        let centerX = (this.canvas.canvas.width / 2)|0;
        let centerY = (this.canvas.canvas.height / 2)|0;
        this.canvas.translate(centerX,centerY);
        this.Origin(this.gameObject);
        for(var i in data){
            this.CameraRender(data[i]);
        }
        this.canvas.restore();
    }
    CameraRender(gameObject){
        this.canvas.save();
        gameObject.transform.Translate(this);
        this.canvas.imageSmoothingEnabled = !gameObject.render.pixel;
        this.canvas.globalAlpha = gameObject.render.alpha;
        this.canvas.drawImage(gameObject.render.canvas,-gameObject.transform.anchor.x * gameObject.render.canvas.width|0,-gameObject.transform.anchor.y * gameObject.render.canvas.height|0);
        this.canvas.restore();
    }
    Tree(gameObject,table){
        if(gameObject.render && Render.layers.includes(gameObject.layer)){
            if(table[gameObject.zoom]){
                table[gameObject.zoom].push(gameObject);
            }else{
                table[gameObject.zoom] = [gameObject];
            }
        }
        for(var i in gameObject.data){
            this.Tree(gameObject.data[i],table);
        }
    }
    Origin(gameObject){
        this.canvas.rotate(-gameObject.transform.rotate * Math.PI/180);
        this.canvas.translate(-gameObject.transform.position.x,-gameObject.transform.position.y);
        if(gameObject.parent)this.Origin(gameObject.parent);
    }
}