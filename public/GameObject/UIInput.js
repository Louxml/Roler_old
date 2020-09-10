class UIInput extends UIComponent{
    constructor(){
        super('input');
        this.width = 180;
        this.height = 40;
        this.borderBottom = "2px solid #888";

        this.type = "text";
        this.placeholder = "";
        this.lineHeight = 16;
        this.size = 20;
        this.color = "#000";
        this.align = "left";
        this.weight = 500;
        this.overflow = false;
        this.value = "";
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
    set value(value){
        this.html.value = value;
    }
    get value(){
        return this.html.value;
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