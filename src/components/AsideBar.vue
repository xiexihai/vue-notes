<template>
	<div class="panel-aside" :class="{open:openAsideBar=='true'}">
		<div class="aside-content">
			<div class="userInfo">
				<img src="../assets/logo.png">
				<div class="username">用户520</div>
			</div>
			<div class="groupWrap">
				<div class="group-title">
					分组<router-link :to="{name:'AddNotesType'}">编辑</router-link>
				</div>
				<div class="group-list">
					<div class="item active">
						全部<span></span>
					</div>
					<div class="item">
						未分组<span></span>
					</div>
					<div class="item" v-for="(item,index) in types" @click="handlerSelectType(item.value)">
						{{item.value}}<span></span>
					</div>
					
				</div>
			</div>
			<div class="setting"><i class="iconfont icon-setting"></i>设置</div>	
		</div>
	</div>
</template>
<style scoped>
	.panel-aside{
		position:fixed;
		left:0;
		top:0;
		width:80%;
		height:100%;
		font-size:14px;
		z-index:19900322;
		transition:all .2s;
		transform:translate(-100%,0);
	}
	.panel-aside.open{
		transform:translate(0,0);
	}
	.aside-content{
		position:fixed;
		left:0;
		top:0;
		z-index:19900322;
		width:100%;
		height:100%;
		background:#fefefe;
	}
	.userInfo{
		text-align:center;
	}
	.userInfo img{
		display:block;
		width:50px;
		height:50px;
		margin:20px auto 10px;
		border:1px solid #ddd;
		border-radius:100%;
	}
	.groupWrap{
		position:absolute;
		top:120px;
		left:0;
		right:0;
		bottom:40px;
	}
	.group-title{
		padding:0 25px;
		overflow:hidden;
		color:#777;
		line-height:30px;
		border-bottom:1px solid #f7f7f7;
	}
	.group-title a{
		color:#f9d304;
		float:right;
		text-decoration:none;
	}
	.group-list .item{
		padding:10px 25px;
		overflow:hidden;
	}
	.group-list .item span{
		float:right;
		color:#666;
	}
	.group-list .item.active{
		background:#f7f7f7;
	}
	.setting{
		position:absolute;
		bottom:0;
		width:100%;
		height:40px;
		line-height:40px;
		padding:0 25px;
		box-sizing:border-box;
	}
	.setting i{
		margin-right:10px;
	}
</style>
<script>
	export default{
		props:{
			openAsideBar:{
				type:String
			}
		},
		data(){
			return{
				types:this.$store.state.notesType
			}
		},
		methods:{
			filterType(value){
				const defaultNotes=JSON.parse(localStorage.getItem('notes'));
				if(value=='全部'){
					this.$store.state.notes=defaultNotes
				}else{
					let result=[]
					defaultNotes.forEach((item)=>{
						if(item.type==value){
							result.push(item)
						}
					})
					this.$store.state.notes=result;
				}
			},
			handlerSelectType(value){
				//this.selectType=value;
				this.filterType(value)
				this.$emit('updateSelectType',value);
				this.$emit('updeteAsideBar','false')
			}
		},
		mounted(){
			console.log(this.openAsideBar)
		}
	}
</script>