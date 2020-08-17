var Game = {
    scene:[],
    index:-1,
    _index:-1,
    AddScene(scene){
        this.scene.push(scene);
    },
    StartScene(index){
        if(this.scene.length > index && index >= 0 && this.index != index)this._index = index;
    },
    Awake(){
        if(this._index != this.index){
            this.index = this._index;
            let data = this.scene[this.index].data;
            for(var i in data){
                let comps = data[i].components;
                for(var j in comps){
                    comps[j].Awake();
                }
            }
        }
        for(var i in data){
            let comps = data[i].components;
            for(var j in comps){
                if(comps[j].enable != comps[j]._enable && comps[j]._enable == true){
                    comps[i].enable = comps[i]._enable;
                    comps[i].OnEnable();
                }
            }
        }
        for(var i in data){
            let comps = data[i].components;
            for(var j in comps){
                comps[j].Start();
            }
        }
    },
    Loop(t=0){
        this.Awake();
        requestAnimationFrame(Game.Loop.bind(this));
        Time.Update(t);
        if(this.index != -1)this.scene[this.index].Update(Time.deltaTime);
        // Render.update(t);
    }
}
Game.Loop();