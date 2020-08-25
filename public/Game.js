var Game = {
    scene:Scene,
    time:Time,
    render:Render,
    Loop(t=0){
        requestAnimationFrame(Game.Loop.bind(this));
        Time.Update(t);
        Scene.Update(t);
        Render.Update(t);
    },
}
Game.Loop();