class UIInput extends UIComponent{
    constructor(){
        super('input');
        this.type = "text";
        this.width = 180;
        this.height = 40;
        this.placeholder = "";
        this.lineHeight = 16;
        this.size = 20;
        this.color = "#000";
        this.background = "";
        this.radius = 0;
        this.align = "left";
        this.alpha = 1;
        this.weight = 500;
        this.overflow = false;
        this.borderBottom = "2px solid #888";
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

    set type(value){
        this.html.type = value;
    }
    get type(){
        return this.html.type;
    }
    set placeholder(value){
        this.html.placeholder = value;
    }
    get placeholder(){
        return this.html.placeholder;
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