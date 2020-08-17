class GameObject{
    constructor(name="GameObject"){
        this.name = name;
        this.active = true;
        this.parent = null;
        this.data = [];
        this.transform = new Transform();
        this.components = [this.transform];
    }
    SetActive(active){
        if(typeof active == "boolean"){
            this.active = active;
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
        this.components.push(comp);
        return true;
    }
    Find(route){
        route = route.split('/');
        console.log(route);
    }
    GetChild(index){
        if(typeof index === "number" && index >= 0 && index < this.data.length)return this.data[index];
    }
    Destroy(){
        // if(this.parent){
        //     let data = this.parent.data;
        //     data.splice(data.indexOf(this),1);
        // }
        // delete this;
    }
}