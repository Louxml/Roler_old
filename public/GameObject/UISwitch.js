class UISwitch extends UIComponent{

    #value = false;
    #bar = null;
    constructor(){
        super();
        this.#bar = Render.CreateDIV();
        this.#bar.style.position = "absolute";
        this.#bar.style.transition = "left .2s";
        this.#bar.style.transform = "translateY(-50%)";
        this.#bar.style.top = "50%";
        this.#bar.style.boxShadow = "#0006 0 1px 2px 0px";
        this.html.style.transition = "all .2s";
        this.html.appendChild(this.#bar);

        this.width = 48;
        this.height = 20;
        this.radius = 20;
        this.border = "4px solid #000";

        this.size = 20;
        this.barRadius = 20;
        this.color = new Color(200,200,200);
        this.barColor = new Color(255,255,255);
        this.selectBarColor = new Color(255,255,255);
        this.selectColor = new Color(100,240,100);
        this.value = false;
    }
    
    set barRadius(value){
        this.#bar.style.borderRadius = value+'px';
    }
    get barRadius(){
        return this.#bar.style.borderRadius;
    }
    set size(value){
        value = typeof value == 'number'?value+'px':value;
        this.#bar.style.width = value;
        this.#bar.style.height = value;
    }
    get size(){
        return this.#bar.clientHeight;
    }
    set value(value){
        this.#value = value?true:false;
        this.html.style.background = this.#value?this.selectColor:this.color;
        this.html.style.borderColor = this.html.style.background;
        this.#bar.style.background = this.#value?this.selectBarColor:this.barColor;
        this.#bar.style.left = this.#value?`calc(100% - ${this.size}px)`:'0px';
    }
    get value(){
        return this.#value;
    }

    #Switch(){
        this.value = !this.value;
    }

    Onclick(e){
        
    }

    Awake(){
        this.html.onclick = function(e){
            this.#Switch();
            this.Onclick(e);
        }.bind(this);
        if(!this.html.parentNode)Render.AddUI(this.html);
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