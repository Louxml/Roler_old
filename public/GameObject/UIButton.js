class UIButton extends UIComponent{

    constructor(text='按钮'){
        super();
        this.text = text;
        this.width = 120;
        this.height = 40;
        this.lineHeight = 40;
        this.size = 20;
        this.color = "#fff";
        this.background = "#ccc";
        this.radius = 4;
        this.align = "center";
        this.alpha = 1;
        this.weight = 700;
        this.overflow = false;
        this.borderBottom = "2px solid #999";
        this.boxShadow = "inset 0 -2px #999";
        this.cursor = "pointer";
        this.left = "";
        this.top = '';
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