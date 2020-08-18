var Game = {
    scene:[],
    index:-1,
    _index:-1,
    AddScene(scene){
        this.scene.push(scene);
    },
    StartScene(index){
        if(this.scene.length > index && index >= 0)this._index = index;
    },
    Loop(t=0){
        requestAnimationFrame(Game.Loop.bind(this));
        Time.Update(t);
        //下一帧跳转场景
        if(this.index != this._index)this.index = this._index;
        if(this.index >= 0){
            let main = this.scene[this.index];
            main.Loop();
        }
        // Render.update(t);
    }
}
Game.Loop();