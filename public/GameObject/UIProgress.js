class UIProgress extends UIComponent{

    #bar = null;
    #value = 0;
    constructor(){
        super();
        this.#bar = Render.CreateDIV();
        this.#bar.style.height = "100%";
        this.html.appendChild(this.#bar);
        this.width = 200;
        this.height = 20;
        this.radius = 20;
        this.background = new Color(220,220,220);
        this.overflow = "hidden";
        
        this.value = 0.05;
        this.barRadius = 20;
        this.color = new Color(255,255,255);
    }

    set value(value){
        this.#value = value;
        this.#bar.style.width = `${value>1?1:value<0?0:value*100}%`;
    }
    get value(){
        return this.#value;
    }
    set barRadius(value){
        this.#bar.style.borderRadius = value+"px";
    }
    get barRaduis(){
        return this.#bar.style.borderRadius;
    }

    set color(value){
        this.#bar.style.background = value;
    }
    get color(){
        return this.#bar.style.background;
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