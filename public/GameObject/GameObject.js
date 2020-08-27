class GameObject{
    constructor(name="GameObject"){
        this.name = name;
        this.active = true;
        this.scene = null;
        this.parent = null;
        this.data = [];
        this.layer = Render.layers[0];
        this.zoom = 0;
        this.components = [];
        this.transform = new Transform();
        this.AddComponent(this.transform);
        this.isDestroy = false;
    }
    Awake(){
        if(!this.active)return;
        for(var i in this.data){
            this.data[i].Awake();
        }
        for(var i in this.components){
            if(!this.components[i].enabled)continue;
            if(this.components[i].isAwake)this.components[i].Awake();
            this.components[i].isAwake = false;
        }
    }
    OnEnable(){
        if(!this.active)return;
        for(var i in this.data){
            this.data[i].OnEnable();
        }
        for(var i in this.components){
            if(!this.components[i].enabled)continue;
            if(this.components[i].isOnEnable)this.components[i].OnEnable();
            this.components[i].isOnEnable = false;
        }
    }
    Start(){
        if(!this.active)return;
        for(var i in this.data){
            this.data[i].Start();
        }
        for(var i in this.components){
            if(!this.components[i].enabled)continue;
            if(this.components[i].isStart)this.components[i].Start();
            this.components[i].isStart = false;
        }
    }
    Update(dt){
        if(!this.active)return;
        for(var i in this.data){
            this.data[i].Update(dt);
        }
        for(var i in this.components){
            if(!this.components[i].enabled)continue;
            this.components[i].Update(dt);
        }
    }
    Render(dt){
        if(!this.active)return;
        for(var i in this.data){
            this.data[i].Render(dt);
        }
        for(var i in this.components){
            if(!this.components[i].enabled)continue;
            this.components[i].Render(dt);
        }
    }
    OnDisable(){
        for(var i in this.data){
            this.data[i].OnDisable();
        }
        for(var i in this.components){
            if(this.components[i].isOnDisable)this.components[i].OnDisable();
            this.components[i].isOnDisable = false;
        }
    }
    OnDestroy(){
        for(var i in this.data){
            this.data[i].OnDestroy();
            if(this.data[i].isDestroy){
                //移除场景
                this.data.splice(i,1);
            }
        }
        for(var i in this.components){
            if(this.components[i].isDestroy){
                this.components[i].OnDestroy();
                this.components.splice(i,1);
            }
        }
    }


    GetActive(){
        return this.active;
    }
    SetActive(active){
        if(typeof active == "boolean" && active != this.active){
            for(var i in this.components){
                this.components[i].isOnEnable = active;
                this.components[i].isOnDisable = !active;
            }
            this.active = active;
        }
    }
    SetName(name){
        this.name = String(name);
    }
    Add(gameObject){
        if(gameObject.constructor.name === "GameObject"){
            if(gameObject.parent){
                let data = gameObject.parent.data;
                data.splice(data.indexOf(gameObject),1);
            }
            gameObject.parent = this;
            gameObject.scene = this.scene;
            this.data.push(gameObject);
        }else{
            //警告信息
        }
    }
    SetParent(obj){
        obj.Add(this);
    }
    GetComponent(name){
        for(var i in this.components){
            if(this.components[i].constructor.name === name){
                return this.components[i];
            }
        }
    }
    AddComponent(comp){
        for(var i in this.components){
            if(this.components[i].constructor.name === comp.constructor.name){
                console.warn("组件 ",comp.constructor.name," 已存在!");
                return false;
            }
        }
        comp.gameObject = this;
        this.components.push(comp);
        return this;
    }
    SetLayer(layer){
        if(Render.layer.includes(layer)){
            this.layer = layer;
        }else{
            //警告信息
        }
    }
    SetZoom(index){
        if(typeof index == "number"){
            this.zoom = index;
        }else{
            //警告信息
        }
    }
    Find(route){
        if(typeof route === "string"){
            route = route.split('/');
            console.log(route);
        }else{
            //警告信息
        }
    }
    GetChild(index){
        if(typeof index === "number" && index >= 0 && index < this.data.length)return this.data[index];
        else{
            //警告信息
        }
    }
    Destroy(){
        // 本身销毁标记
        this.isDestroy = true;
        //本身组件销毁
        for(var i in this.components){
            this.components[i].Destroy();
        }
        //子级销毁
        for(var i in this.data){
            this.data[i].Destroy();
        }
    }
}