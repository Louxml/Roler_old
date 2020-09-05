class Event{

    static AddEventListener(event,target,useCapture=false){
        window.addEventListener(event,target,useCapture);
    }

    static RemoveEventListener(event,target){
        window.removeEventListener(event,target);
    }

    static DispatchEvent(event,data){
        var event = new CustomEvent(event,{detail:data});
        window.dispatchEvent(event);
    }

}