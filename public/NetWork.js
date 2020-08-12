window.NetWork = new function(){
    this.socket = io();
    this.name = "cmd";
    this.socket.on('cmd',function(data){
        this.OnMessage(data)
    }.bind(this))

    this.Send = function(cmd,data){
        this.socket.emit(cmd,data);
    }

    this.OnMessage = function(data){}
}