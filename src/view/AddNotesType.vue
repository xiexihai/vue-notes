<template>
	<div class="panel-notesType">
		<div class="header">
			<!--添加便签页-->
			<div class="header-panel">
				<div class="btnNav" @click="handlerBack">
					<i class="iconfont icon-fanhui"></i>
				</div>
				<div class="webTitle">编辑分组</div>
				<div class="btnSearch" @click="handlerShowPopup">
					新建分组
				</div>
			</div>
		</div>
		
		<div class="panel-notesTypeList">
			<div class="item" :class="{active:item.checked}" v-for="(item,index) in types" @click="handlerSelectType(index)">
				{{item.value}}
			</div>
		</div>
		<div class="panel-notes-foot">
			<div class="item">
				<i class="iconfont icon-icon-bainji"></i>重命名
			</div>
			<div class="item">
				<i class="iconfont icon-shanchu"></i>删除
			</div>
		</div>
		<div class="popup-mask" :class="{open:show}"></div>
		<div class="popup-container" :class="{open:show}">
			<div class="popup-header">分组</div>
			<div class="popup-body">
				<input type="text" v-model="typeValue" autofocus="autofocus" placeholder="新建分组" name="">
			</div>
			<div class="popup-footer">
				<a href="javascript:;" @click="handlerHidePopup">取消</a>
				<a href="javascript:;" class="confirm" :class="{save:typeValue!=''}" @click="handlerSave">确定</a>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.btnSearch{
		color:#f9d304;
	}
	.panel-notesTypeList{
		position:absolute;
		width:100%;
		top:48px;
		left:0;
		bottom:48px;
	}
	.panel-notesTypeList .item{
		position:relative;
		height:60px;
		padding:0 20px;
		line-height:60px;
		border-bottom:1px solid #f8f8f8;
	}
	.panel-notesTypeList .item:after{
		content:"";
		width:20px;
		height:20px;
		border:1px solid #aaa;
		position:absolute;
		right:20px;
		top:20px;
		border-radius:50%;
	}
	.panel-notesTypeList .item.active:after{
		border-color:#f9d304;
		color:#fff;
		background:#f9d304;
	}

	.panel-notesTypeList .item.active:before{
		content:"";
		width:10px;
		height:6px;
		border-left:2px solid #fff;
		border-bottom:2px solid #fff;
		position:absolute;
		right:24px;
		bottom:26px;
		z-index:1;
		transform:rotate(-45deg);
	}
	.panel-notes-foot{
		position:absolute;
		width:100%;
		height:48px;
		left:0;
		bottom:0;
		display:flex;
		border-top:1px solid #eee;
		color:#999;
	}
	.panel-notes-foot.active{
		color:#111;
	}
	.panel-notes-foot .item{
		flex:1;
		text-align:center;
		font-size:12px;
	}
	.panel-notes-foot .item i{
		display:block;
		font-size:20px;
		margin:3px 0;
	}
	.popup-mask{
		width:100%;
		height:100%;
		position:fixed;
		left:0;
		top:0;
		background:rgba(0,0,0,.5);
		z-index:19900322;
		display:none;
	}
	.popup-mask.open{
		display:block;
	}
	.popup-container{
		width:80%;
		position:absolute;
		left:50%;
		top:50%;
		z-index:19900322;
		background:#fff;
		padding:10px;
		box-shadow:0 1px 3px #6b6b6b;
		border-radius:6px;
		box-sizing:border-box;
		transform:translate(-50%,-50%);
		display:none;
	}
	.popup-container.open{
		display:block;
	}
	.popup-header{
		font-size:16px;
		padding:10px;
	}
	.popup-body{
		padding:0 10px 15px 10px;
	}
	.popup-body input{
		width:100%;
		box-sizing:border-box;
		padding:10px;
		line-height:30px;
		font-size:14px;
		border:none;
		border-bottom:1px solid #0949d6;
	}
	.popup-footer{
		text-align:center;
	}
	.popup-footer a{
		font-size:16px;
		font-weight:bold;
		color:#0949d6;
		text-decoration:none;
		margin:0 20px;
		padding:10px 20px;
		display:inline-block;
		vertical-align:top;
	}
	.popup-footer a.confirm{
		color:#999;
	}
	.popup-footer a.confirm.save{
		color:#0949d6;
	}

</style>
<script>
	export default{
		data(){
			return{
				typeValue:'',
				show:false,
				types:this.$store.state.notesType
			}
		},
		methods:{
			handlerBack(){
				this.$router.go(-1)
			},
			handlerShowPopup(){
				this.show=true
			},
			handlerHidePopup(){
				this.show=false
			},
			handlerSave(){
				if(this.typeValue==''){
					return
				}
				this.$store.dispatch('addNotesType',this.typeValue)
				this.show=false;
				this.typeValue='';
			},
			handlerSelectType(index){
				this.$set(this.types[index],'checked',!this.types[index].checked)
			}
		}
	}
</script>