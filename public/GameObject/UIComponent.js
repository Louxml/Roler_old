class UIComponent extends Component{

    constructor(type='div'){
        super();
        this.html = Render.CreateDIV(type);
        this.html.style.display = "block";
        
        // this.width = 0;
        // this.height = 0;
        this.background = "";
        this.radius = 0;

        
        this.alpha = 1;
        // this.overflow = false;
        this.boxShadow = "";
        // this.border

        this.cursor = "";
        this.left = "";
        this.top = "";
        this.anchor = new Vector(0,0);
        this.zoom = 0;
        this.position = "relative";
    }

    set width(value){
        value = typeof value == 'number'?value+'px':value;
        this.html.style.width = value;
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
   
    
    
    set background(value){
        this.html.style.background = value;
    }
    get background(){
        return this.html.style.background;
    }
    set radius(value){
        this.html.style.borderRadius = value+"px";
    }
    get raduis(){
        return this.html.style.borderRadius;
    }
    set topLeftRadius(value){
        this.html.style.borderTopLeftRadius = value;
    }
    get topLeftRadius(){
        return this.html.style.borderTopLeftRadius;
    }
    set topRightRadius(value){
        this.html.style.borderTopRightRadius = value;
    }
    get topRightRadius(){
        return this.html.style.borderTopRightRadius;
    }
    set bottomLeftRadius(value){
        this.html.style.borderBottomLeftRadius = value;
    }
    get bottomLeftRadius(){
        return this.html.style.borderBottomLeftRadius;
    }
    set bottomRightRadius(value){
        this.html.style.borderBottomRightRadius = value;
    }
    get bottomRightRadius(){
        return this.html.style.borderBottomRightRadius;
    }
    
    set alpha(value){
        this.html.style.opacity = value;
    }
    get alpha(){
        return this.html.style.opacity;
    }
    set overflow(value){
        this.html.style.overflow = value;
    }
    get overflow(){
        return this.html.style.overflow;
    }
    set boxShadow(value){
        this.html.style.boxShadow = value;
    }
    get boxShadow(){
        return this.html.style.boxShadow;
    }
    set border(value){
        this.html.style.border = value;
    }
    get border(){
        return this.html.style.border;
    }
    set borderTop(value){
        this.html.style.borderTop = value;
    }
    get borderTop(){
        return this.html.style.borderTop;
    }
    set borderBottom(value){
        this.html.style.borderBottom = value;
    }
    get borderBottom(){
        return this.html.style.borderBottom;
    }
    set borderLeft(value){
        this.html.style.borderLeft = value;
    }
    get borderLeft(){
        return this.html.style.borderLeft;
    }
    set borderRight(value){
        this.html.style.borderRight = value;
    }
    get borderRight(){
        return this.html.style.borderRight;
    }
    
    set cursor(value){
        this.html.style.cursor = value;
    }
    get cursor(){
        return this.html.style.borderBottom;
    }
    set top(value){
        value = typeof value == "number"?value+"px":value;
        this.html.style.top = value;
    }
    get top(){
        return this.html.style.top;
    }
    set left(value){
        value = typeof value == "number"?value+"px":value;
        this.html.style.left = value;
    }
    get left(){
        return this.html.style.left;
    }
    set right(value){
        value = typeof value == "number"?value+"px":value;
        this.html.style.right = value;
    }
    get right(){
        return this.html.style.right;
    }
    set bottom(value){
        value = typeof value == "number"?value+"px":value;
        this.html.style.bottom = value;
    }
    get bottom(){
        return this.html.style.bottom;
    }
    set anchor(value){
        this.html.style.transform = `translate(-${value.x*100}%,-${value.y*100}%)`;
    }
    get anchor(){
        return this.html.style.transform;
    }
    set zoom(value){
        this.html.style.zIndex = value;
    }
    get zoom(){
        return this.html.style.zIndex;
    }
    set position(value){
        this.html.style.position = value;
    }
    get position(){
        return this.html.style.position;
    }

    Awake(){
        this.html.onclick = function(e){
            this.Onclick(e);
        }.bind(this);
        if(!this.html.parentNode)Render.AddUI(this.html);
    }
    Onclick(e){
        
    }
    Start(){
        
    }

    OnEnable(){
        this.html.style.visibility = "visible";
    }

    OnDisable(){
        this.html.style.display = "hidden";
    }

    OnDestroy(){
        this.html.parentNode.removeChild(this.html);

    }
}