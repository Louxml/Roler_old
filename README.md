# Roler

### 框架测试Demo
[Demo](http://112.74.35.246:3000)
### 粒子系统调试面板
[调试](http://112.74.35.246:3000/demo)


采用组件式的架构，模仿Unity实现一些基本的功能
## 框架
##### 在第一版的框架上改良，重新架构，模仿Unity的架构
[第一版框架](https://github.com/Louxml/Engine1)
#### 部分子系统待实现：光影系统
### 粒子系统
基于世界坐标的粒子渲染未实现（待开发）

### 实现功能
#### Game管理器
驱动整个游戏的运行，运行主循环
#### Loader加载器
实现了Image资源加载、Sprite资源加载（图集裁剪），实现进度监听
按key存储所有资源，重复key值将覆盖
#### Assets类
目前仅实现ImageAsset、SpriteAsset
#### Scene场景类
> 管理所有Scene资源

存储游戏对象，驱动游戏对象上的脚本运行，游戏对象采用树形结构存储，通过深度递归遍历驱动每个GameObject上的Component

#### Timer时间类
> 管理定时器资源，框架时间

生成定时器，实现简单的定时器加入Game主循环中

#### Render渲染类
> 管理当前场景的所有相机组件，渲染到主屏幕上（主画布）

#### GameObject
目前仅实现Component组件、Sprite组件、Text组件、Transform组件、Camera组件、Particles组件基本功能(待完善)
##### Component组件
所有组件基类,所有组件须继承该组件，包含组件的基本功能，参考Unity组件
##### Sprite组件
渲染ImageAsset、SpriteAsset
##### Text组件
渲染文字
##### Transform组件
GameObject基本组件，游戏对象的定位组件
##### Camera
将场景中的渲染对象渲染到相机组件中，再由Render渲染到屏幕上
##### Particles组件
###### 基于世界坐标粒子待实现
> 目前性能能运行百级粒子，能达到60FPS,但有波动，不稳定（待优化）
渲染粒子特效，基本实现cocos的粒子效果，采用cocos粒子系统参数，上面有调试面板

## 运行主体
#### 由游戏驱动Scene --> Scene驱动GameObject，Scene控制Component生命周期事件 --> GameObject驱动Component
#### Scene深度遍历Scene中的data树结构

## 渲染
> Canvas 2d渲染
#### 由渲染组件在GameObject上生成render画布
#### Camera渲染GameObject
通过Transform.Origin()递归相机的父物体Transform计算出当前相机距原点的偏离，在通过原点自顶向下遍历游戏物体的Transform，计算出游戏物体距相机的偏离，渲染游戏物体
