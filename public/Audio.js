window.AudioContext = window.AudioContext || window.webkitAudioContext;
(function () {
  if (!window.AudioContext) {
    alert("当前浏览器不支持Web Audio API");
    return;
  }

  // 按钮元素
  var eleButton = document.getElementById("button");

  // 创建新的音频上下文接口
  var audioCtx = new AudioContext();

  // 发出的声音频率数据，表现为音调的高低
  var arrFrequency = {
    65:196.0,
    83:220.0,
    68:246.94,
    70:261.63,
    71:293.66,
    72:329.63,
    74:349.23,
    75:392.0,
    76:440.0,
    186:493.88,
    222:523.25,
    90:587.33,
    88:659.25,
    67:698.46,
    86:783.99,
    66:880.0,
    78:987.77,
    77:1046.5
  };
  var time;
  // window.onkeydown = function(e){
  //   if(arrFrequency[e.keyCode]){
  //     NetWork.Send('cmd',{f:arrFrequency[e.keyCode],type:"triangle"});
  //     time = Date.now();
  //   }
  // }
  Input.KeyDown = (e) => {
    console.log(KeyCode[e]);
  }
  Input.KeyUp = (e) => {
    console.log(KeyCode[e]);
  }
  NetWork.OnMessage = function(data){
    console.log(Date.now() - time);
    play(data.f, data.type);
  }

  function play(frequency, oscillatorType) {
    // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
    var oscillator = audioCtx.createOscillator();

    // 创建一个GainNode,它可以控制音频的总音量
    var gainNode = audioCtx.createGain();

    // 把音量，音调和终节点进行关联
    oscillator.connect(gainNode);

    // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
    gainNode.connect(audioCtx.destination);

    // 指定音调的类型，其他还有sine|square|triangle|sawtooth|custom
    oscillator.type = oscillatorType;

    // 自定义音色波弦
    // var real = new Float32Array(2);
    // var imag = new Float32Array(2);
    // real[0] = 0;
    // imag[0] = 0;
    // real[1] = 10;
    // imag[1] = 0;
    // var wave = audioCtx.createPeriodicWave(real, imag, {disableNormalization: true});
    // oscillator.setPeriodicWave(wave);


    // 设置当前播放声音的频率，也就是最终播放声音的调调
    oscillator.frequency.value = frequency;

    // GainNode 接口表示音量变更。它是一个 AudioNode 音频处理模块，在输出前使用给定 增益 应用到输入。一个 GainNode 总是只有一个输入和一个输出，都通过同样数量的声道
    // gainNode.gain返回一个AudioParam
    // AudioParam 接口代表音频相关的参数， 通常是一个 AudioNode (例如 GainNode.gain) 的参数。一个 AudioParam 可以被设置为一个具体的值或者数值的改变 ，可以被安排在在一个具体的时刻并且遵循一个特定的模式发生。
    // AudioParam.setValueAtTime() 在一个确切的时间，即时更改 AudioParam 的值，按照AudioContext.currentTime 的时间。新的值会被传递到 value 参数。
    // currentTime是AudioContext的一个read-only属性，返回double秒（从0开始）表示一个只增不减的硬件时间戳，可以用来控制音频回放，实现可视化时间轴等等。
    // 静止状态下返回的是0
    // AudioParam.setValueAtTime(value, startTime)
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);

    // linearRampToValueAtTime方法作用是调整 AudioParam 的值，使其逐渐按线性变化。这个改变会从上一个事件指定的事件开始，跟随一个线性“斜坡”到参数给的新值，并在 endTime 参数给定的时间到达新值。
    // AudioParam.exponentialRampToValueAtTime(value, endTime)
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);

    // 音调从当前时间开始播放
    oscillator.start(audioCtx.currentTime);

    // 调整 AudioParam 的值，使其逐渐按指数变化。这个改变会从上一个事件指定的事件开始，跟随一个指数“斜坡”到参数给的新值，并在 endTime 参数给定的时间到达新值。
    // 语法：AudioParam.exponentialRampToValueAtTime(value, endTime)
    // 1秒内声音慢慢降低，是个不错的停止声音的方法
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);

    // 1秒后完全停止声音
    oscillator.stop(audioCtx.currentTime + 1);
    // 输出当前时间戳
    // console.log(audioCtx.currentTime);
  }
})();
