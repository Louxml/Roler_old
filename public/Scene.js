class Scene{
    constructor(name){
        this.name = name;
        this.data = [];
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
    Update(dt){
        for(var i in this.data){
            for(var j in this.data[i].components){
                if(this.data[i].components[j].Update)this.data[i].components[j].Update(dt);
            }
        }
    }
}