<template>
  <div id="app">
    <transition :name="direction"> 
      <router-view class="appView"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

*{
  margin:0;
  padding:0;
}
input,button,select,textarea{
  outline: none
}
ul,ol{
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}
.appView {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  transition: transform 0.2s ease-out;
}

.header{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  background:#f9f9f9;
  /*border-bottom: 1px solid #f2f2f2;
  background-color: #fff;*/
}
.header-back{
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  padding: 0 20px;
  height: 48px;
}
.header-operation{
  position: absolute;
  right: 0;
  top: 0;
}
.header-operation span{
  padding: 0 10px;
}
.header-dropDownList{
  position: fixed;
  right: 6px;
  top: 54px;
  box-shadow: 0 0 10px #ddd;
  background: #fff;
  display: none;
}
.header-dropDownList.open{
  display: block;
}
.header-dropDownList li{
  padding: 0 10px;
  margin: 0 10px;
  border-bottom: 1px solid #f5f5f5;
}
.header-panel{
  display:flex;
}
.btnNav{
  height:48px;
  padding:0 20px;
}
.btnNav i{
  font-size:22px;
}
.webTitle{
  flex:1;
  font-size:16px;
}
.btnSearch{
  padding:0 20px;
}
.btnSearch i{
  font-size:20px;
}


.aside-mask{
  position:fixed;
  left:0;
  right:0;
  width:100%;
  height:100%;
  z-index:19900322;
  background:rgba(0,0,0,.5);
  display:none;
}
.aside-mask.open{
  display:block;
}

.slide-left-enter{
  transform: translate(100%, 0);
}
.slide-left-leave-active{
  transform: translate(-100%, 0);
}
.slide-right-enter {
  transform: translate(-100%, 0);
}
.slide-right-leave-active{
  transform: translate(100%, 0);
}

.slide-up-enter {
  transform: translate(0, 100%);
}
.slide-up-leave-active{
  transform: translate(0, -100%);
}
.slide-buttom-enter {
  transform: translate(0, -100%);
}
.slide-buttom-leave-active{
  transform: translate(0, 100%);
}
</style>
<script>
  export default{
    data(){
      return{
        direction:'slide-up'
      }
    },
    watch: {
      $route(to, from) {
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;
       // console.log(to.path)
        if(to.path != "/addNotes"){
          if (to.path == "/") {
            this.direction = "slide-right";
          } else if (from.path == "/") {
            this.direction = "slide-left";
          }else{
            this.direction = toDepth < fromDepth ? "slide-right" : "slide-left";
          }
        }else{

          if (to.path == "/") {
            this.direction = "slide-buttom";
          } else if (from.path == "/") { 
            this.direction = "slide-up";
          }else{
            this.direction = toDepth < fromDepth ? "slide-buttom" : "slide-up";
          }
        }
      }
    }
  }
</script>
