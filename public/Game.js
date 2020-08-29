var Game = {
    loader:Loader,
    scene:Scene,
    timer:Timer,
    render:Render,
    Run(t=0){
        requestAnimationFrame(Game.Run.bind(this));
        Timer.Update(t);
        Scene.Update(t);
        Render.Update(t);
    },
}
Game.Run();
