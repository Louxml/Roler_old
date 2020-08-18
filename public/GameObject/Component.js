class Component{
    constructor(){
        this.enabled = true;
        this.isAwake = true;
        this.gameObject = null;
        this.isOnEnable = true;
        this.isStart = true;
        this.isOnDisable = false;
        this.isDestroy = false;
    }
    SetEnabled(enabled){
        if(typeof enabled === "boolean" && enabled != this.enabled){
            this.isOnEnable = enabled;
            if(!enabled && this.gameObject.GetActive())this.isOnDisable = !enabled;
            this.enabled = enabled;
        }
    }
    Awake(){
        
    }
    OnEnable(){
        
    }
    Start(){
        
    }
    Update(dt){
        
    }
    OnDisable(){
        
    }
    OnDestroy(){

    }
    Destroy(){
        this.isDestroy = true;
    }

}