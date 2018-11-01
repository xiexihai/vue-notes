<template>
	<div class="AddTypeWrap">
		<label @click="handlerOpenDropDown">{{defaultText}}</label>
		<div class="notesTypeList" :class="{hide:dropDown}">
			<span :class="{active:item.value==defaultText}" v-for="(item,index) in types" @click="handlerSelectType(item.value)">{{item.value}}</span>
		</div>
	</div>
</template>
<style scoped>
	.AddTypeWrap{
		position:relative;
	}
	.AddTypeWrap label{
		line-height:30px;
		color:#f9d304;
	}
	.AddTypeWrap:after{
		content:'';
		width:0;
		height:0;
		margin:15px 6px 0 0;
		border-width:4px;
		border-color:#f9d304 transparent transparent transparent;
		border-style:solid;
		display:inline-block;
		vertical-align:top;
	}
	.notesTypeList{
		position:absolute;
		left:0;
		top:30px;
		min-width:160px;
	    -webkit-box-shadow:0 0 10px #ddd;
	    box-shadow:0 0 10px #ddd;
	    background:#fff;
	}
	.notesTypeList span{
		display:block;
		border-bottom:1px solid #eee;
		padding:8px 0;
		margin:0 16px;
	}
	.notesTypeList span:last-child{
		border-bottom:none;
	}
	.notesTypeList .active{
		color:#f9d304;
		position:relative;
	}
	.notesTypeList .active:after{
		content:"";
		width:12px;
		height:6px;
		border-left:2px solid #f9d304;
		border-bottom:2px solid #f9d304;
		position:absolute;
		right:10px;
		top:50%;
		margin-top:-6px;
		transform:rotate(-45deg);
	}
	.notesTypeList.hide{
		display:none;
	}
</style>
<script>
	export default{
		props:{
			types:{
				type:Array
			},
			selectType:{
				type:String
			}
		},
		data(){
			return{
				defaultText:this.selectType,
				dropDown:true
			}
		},
		methods:{
			handlerSelectType(item){
				this.defaultText=item;
				this.dropDown=true;
				this.$emit('updateSelectType',item);
				//或者使用
				//this.$parent.selectType=item;
			},
			handlerOpenDropDown(){
				this.dropDown=!this.dropDown;
			}
		},
		mounted(){
			console.log(this.selectType)
		}
	}
</script>