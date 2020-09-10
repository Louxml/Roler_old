class UIVerticalLayout extends UIComponent{
    constructor(){
        super();
        this.html.style.display = "inline-flex";
        this.html.style.flexDirection = "column";
        this.html.style.height = "auto";

        this.width = "auto";
        this.overflow = "hidden";
    }

    set width(value){
        value = typeof value == 'number'?value+'px':value;
        this.html.style.width = value;
    }
    get width(){
        return this.html.clientWidth;
    }
    set height(value){
        console.log("UIHorizontal组件","--->>>","高度自定义");
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