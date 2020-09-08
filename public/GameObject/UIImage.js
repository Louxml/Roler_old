class UIImage extends UIComponent{

    constructor(src=''){
        super('image');
        this.html = new Image();
        this.text = '';
        this.width = 400;
        this.height = 400;
        this.lineHeight = 40;
        this.size = 20;
        this.color = "#000";
        this.background = "";
        this.radius = 0;
        this.align = "left";
        this.alpha = 1;
        this.weight = 500;
        this.overflow = false;
        this.borderBottom = "";
        this.boxShadow = "";
        this.cursor = "";
        this.left = "";
        this.top = "";
        this.anchor = new Vector(0,0);
        this.zoom = 0;
        this.src = src;
    }

    Onclick(e){
        
    }

    Awake(){
        super.Awake();
    }

    OnEnable(){
        super.OnEnable();
    }

    OnDisable(){
        super.OnDisable();
    }

    OnDestroy(){
        super.OnDestroy();
    }
}