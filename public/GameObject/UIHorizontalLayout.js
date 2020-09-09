class UIHorizontalLayout extends UIComponent{
    constructor(){
        super();
        this.html.style.display = "inline-flex";
        this.width = "auto";
        this.height = "auto";
        this.lineHeight = 16;
        this.size = 20;
        this.color = "#000";
        this.background = "";
        this.radius = 0;
        this.align = "left";
        this.alpha = 1;
        this.weight = 500;
        this.overflow = false;
        this.boxShadow = "";
        this.cursor = "";
        this.left = "";
        this.top = "";
        this.right = "";
        this.bottom = "";
        this.anchor = new Vector(0,0);
        this.zoom = 0;
        this.position = "relative";
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