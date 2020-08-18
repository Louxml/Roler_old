class Scene{
    constructor(name){
        this.name = name;
        this.data = [];
    }
    Loop(){
        this.Awake();
        this.OnEnable();
        this.Start();
        this.Update();
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
            this.data[i].Update();
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
        this.data.push(gameObject);
    }
    Find(route){
        route = route.split('/');
        console.log(route);
    }
    
}