class UIImage extends UIComponent{

    constructor(src=''){
        super('img');
        this.width = 400;
        this.height = 400;

        this.overflow = false;
        this.src = src;
    }

    set src(value){
        this.html.src = value;
    }
    get src(){
        return this.html.src;
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