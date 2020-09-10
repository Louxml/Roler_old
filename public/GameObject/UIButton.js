class UIButton extends UIComponent{

    constructor(text='按钮'){
        super('button');
        this.width = 120;
        this.height = 40;
        this.background = "#ccc";
        this.radius = 4;
        this.borderBottom = "2px solid #999";
        this.boxShadow = "inset 0 -2px #999";
        this.cursor = "pointer";

        this.text = text;
        this.lineHeight = 40;
        this.size = 20;
        this.color = "#fff";
        this.align = "center";
        this.weight = 700;
        this.overflow = false;
    }

    set text(value){
        this.html.innerText = value;
    }
    get text(){
        return this.html.innerText;
    }
    set lineHeight(value){
        this.html.style.lineHeight = value+"px";
    }
    get lineHeight(){
        return this.html.style.lineHeight;
    }
    set size(value){
        this.html.style.fontSize = value+"px";
    }
    get size(){
        return this.html.style.fontSize;
    }
    set color(value){
        this.html.style.color = value;
    }
    get color(){
        return this.html.style.color;
    }
    set align(value){
        this.html.style.textAlign = value;
    }
    get align(){
        return this.html.style.textAlign;
    }
    set weight(value){
        this.html.style.fontWeight = value;
    }
    get weight(){
        return this.html.style.fontWeight;
    }
    set overflow(value){
        this.html.style.overflow = value?"visible":'hidden';
    }
    get overflow(){
        return this.html.style.overflow;
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