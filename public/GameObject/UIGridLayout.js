class UIGridLayout extends UIComponent{
    constructor(){
        super();
        this.html.style.display = "grid";
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
        this.gridWidth = 100;
        this.gridHeight = 100;
        this.spaceWidth = 0;
        this.spaceHeihgt = 0;
        this.horizontal = "start";
        this.vertical = "start";
    }

    set gridWidth(value){
        this.html.style.gridTemplateColumns = `repeat(auto-fill,${value}px)`;
    }
    get gridWidth(){
        return this.html.style.gridTemplateColumns;
    }
    set gridHeight(value){
        this.html.style.gridTemplateRows = `repeat(auto-fill,${value}px)`;
    }
    get gridHeight(){
        return this.html.style.gridTemplateRows;
    }
    set spaceWidth(value){
        this.html.style.gridColumnGap = `${value}px`;
    }
    get spaceWidth(){
        return this.html.style.gridColumnGap;
    }
    set spaceHeight(value){
        this.html.style.gridRowGap = `${value}px`;
    }
    get spaceHeight(){
        return this.html.style.gridRowGap;
    }
    set horizontal(value){
        this.html.style.justifyItems = value;
    }
    get horizontal(){
        return this.html.style.justifyItems;
    }
    set vertical(value){
        this.html.style.alignItems = value;
    }
    get vertical(){
        return this.html.style.alignItems;
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