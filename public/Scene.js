class Scene{
    constructor(name){
        this.name = name;
        this.data = [];
        this.Add(new GameObject("Camera").AddComponent(new Camera()));
    }
    Run(dt){
        this.Awake();
        this.OnEnable();
        this.Start();
        this.Update(dt);
        this.Render(dt);
        this.Display();
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
    Render(dt){
        for(var i in this.data){
            this.data[i].Render(dt);
        }
    }
    Display(){
        let table = [];
        for(var i in this.data){
            this.FindCamera(this.data[i],table);
        }
        let data = [];
        for(var i in table){
            data = data.concat(table[i]);
        }
        Render.SetCameras(data);
    }
    FindCamera(gameObject,table){
        let comps = gameObject.components;
        for(var i in comps){
            if(comps[i].constructor.name == "Camera" && comps[i].enabled){
                if(table[comps[i].depth]){
                    table[comps[i].depth].push(comps[i]);
                }else{
                    table[comps[i].depth] = [comps[i]];
                }
                break;
            }
        }
        for(var i in gameObject.data){
            this.FindCamera(gameObject.data[i],table);
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
        // gameObject.parent = null;
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
    if(this.main)this.main.Run(t);
}
Scene.Add = function(scene){
    if(scene.constructor.name === "Scene"){
        this.data.push(scene);
    }
}
Scene.Start = function(index){
    switch(typeof index){
        case "number":
            if(index >= 0 && index < this.data.length)this.index = index;
            else console.warn("Index 不存在");
            break;
        case "object":
            if(index.constructor.name == "Scene"){
                var index = this.data.indexOf(index);
                if(index != -1)this.index = index;
                else console.warn("Scene 不存在");
            }else{
                console.warn("不是 Scene 对象");
            }
            break;
        case "string":
            var f = false;
            for(var i in this.data){
                if(this.data[i].name == index){
                    f = true;
                    this.index = i;
                    break;
                }
            }
            if(!f)console.warn("scene 名字不存在");
            break;
        default:
            console.warn("Scene参数错误");
        break;
    }
    
}