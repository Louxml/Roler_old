var Game = {
    loader:Loader,
    scene:Scene,
    timer:Timer,
    render:Render,
    Run(t=0){
        requestAnimationFrame(Game.Run.bind(this));
        Timer.Update(t);
        if(Render.active)Scene.Update(Timer.deltaTime);
        Render.Update(Timer.deltaTime);
    },
}
Game.Run();
