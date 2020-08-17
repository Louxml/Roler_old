var Game = {
    scene:[],
    index:-1,
    AddScene(scene){
        this.scene.push(scene);
    },
    StartScene(index){
        if(this.scene.length > index && index >= 0 && this.index != index)this.index = index;
    },
    Loop(t=0){
        requestAnimationFrame(Game.Loop.bind(this));
        Time.Update(t);
        if(this.index != -1)this.scene[this.index].Update(Time.deltaTime);
        // Render.update(t);
    }
}
Game.Loop();