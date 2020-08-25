class Scene{
    constructor(name){
        this.name = name;
        this.data = [];
        this.Add(new GameObject("Camera").AddComponent(new Camera()));
    }
    Loop(dt){
        this.Awake();
        this.OnEnable();
        this.Start();
        this.Update(dt);
        Render.Update(dt);
        this.OnDisable();
        this.OnDestroy();
    }
    Awake(){
        for(var i in this.data){
            this.data[i].Awake();
        }
    }
    OnEnable(){
        for(var i in this.data){
            this.data[i].OnEnable();
        }
    }
    Start(){
        for(var i in this.data){
            this.data[i].Start();
        }
    }
    Update(dt){
        for(var i in this.data){
            this.data[i].Update(dt);
        }
    }
    OnDisable(){
        for(var i in this.data){
            this.data[i].OnDisable();
        }
    }
    OnDestroy(){
        for(var i in this.data){
            this.data[i].OnDestroy();
        }
    }

    Add(gameObject){
        if(gameObject.parent){
            let data = gameObject.parent.data;
            data.splice(data.indexOf(gameObject),1);
        }
        gameObject.parent = this;
        gameObject.scene = this;
        this.data.push(gameObject);
    }
    Find(route){
        route = route.split('/');
        console.log(route);
    }
    
}
Scene.main = null;
Scene.data = [];
Scene.index = -1;
Scene.Update = function(t){
    if(this.index >= 0 && this.main != this.data[this.index])this.main = this.data[this.index];
    if(this.main)this.main.Loop(t);
}
Scene.Add = function(scene){
    if(scene.constructor.name === "Scene"){
        this.data.push(scene);
    }
}
Scene.Start = function(index){
    this.index = index;
}