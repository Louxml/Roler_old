class UIHorizontalLayout extends UIComponent{
    constructor(){
        super();
        this.html.style.display = "inline-flex";
        this.html.style.flexDirection = "row";
        this.html.style.width = "auto";

        this.width = "auto";
        this.height = "auto";

        this.overflow = "hidden";
    }

    set width(value){
        console.log("UIHorizontal组件","--->>>","宽度自定义");
    }
    get width(){
        return this.html.clientWidth;
    }
    set height(value){
        value = typeof value == 'number'?value+'px':value;
        this.html.style.height = value;
    }
    get height(){
        return this.html.clientHeight;
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