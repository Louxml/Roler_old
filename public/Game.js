var Game = {
    loader:Loader,
    scene:Scene,
    time:Time,
    render:Render,
    Run(t=0){
        requestAnimationFrame(Game.Run.bind(this));
        Time.Update(t);
        Scene.Update(t);
        Render.Update(t);
    },
}
window.onload = function (){
    Game.Run();
}
