class UIText extends UIComponent{

    constructor(text=''){
        super();
        this.width = 100;
        this.height = 40;

        this.text = text;
        this.lineHeight = 40;
        this.size = 20;
        this.color = "#000";
        this.align = "left";
        this.weight = 500;
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