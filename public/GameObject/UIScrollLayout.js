class UIScrollLayout extends UIComponent{
    constructor(){
        super();
        this.width = 100;
        this.height = 100;

        this.scrollY = true;
        this.scrollX = true;
    }

    set scrollY(value){
        this.html.style.overflowY = value?"auto":'hidden';
    }
    get scrollY(){
        return this.html.style.overflowY;
    }
    set scrollX(value){
        this.html.style.overflowX = value?"auto":'hidden';
    }
    get scrollX(){
        return this.html.style.overflowX;
    }

    Awake(){
        console.log({html:this.html});
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