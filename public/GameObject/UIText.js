class UIText extends UIComponent{

    constructor(text=''){
        super();
        this.html = Render.CreateDIV();
        this.text = text;
        this.width = 100;
        this.height = 40;
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
        this.cursor = "pointer";
        this.left = "";
        this.top = "";
        this.anchor = new Vector(0,0);
        this.zoom = 0;
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