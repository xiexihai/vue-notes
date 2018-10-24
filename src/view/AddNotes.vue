<template>
	<div class="panelAddNotes" @click="hideDropDown">
		<header-bar></header-bar>
		<div class="notesTypeList">
			<span :class="{active:item==selectType}" v-for="(item,index) in types" @click="handlerSelectType(item)">{{item}}</span>
		</div>
		<textarea v-model="content" class="textarea" rows="10" autofocus="autofocus" placeholder="记事"></textarea>
		<!--<button @click="addNotes()">提交</button>-->
	</div>
</template>
<style scoped>
	.panelAddNotes{
		background: #f9f9f9;
	}
	.notesTypeList{
		margin-top:80px;
	}
	.notesTypeList .active{
		color:red;
	}
	.textarea{
		margin-top: 50px;
		width: 100%;
		padding:15px 20px;
		font:14px/26px 'Micrsoft YaHei';
		border:none;
		box-sizing: border-box;
	}
	button{
		display: block;
		width: 160px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 40px;
		border: none;
		margin: 30px auto;
		font-size: 16px;
		color: #fff;
		background-color: rgba(255, 175, 0, 0.5);
	}
</style>
<script>
	import { mapState } from 'vuex'
	import HeaderBar from '../components/HeaderBar.vue'
	export default{
		components:{
			HeaderBar
		},
		data(){
			return{
				types:['全部','日常','公司'],
				selectType:'全部',
				content:""
			}
		},
		methods:{
			handlerSelectType(item){
				this.selectType=item;
			},
			hideDropDown(){
				this.$store.dispatch('setDropDown',false)
			},
			addNotes(){
				
				if(this.content==''){
					alert('请输入内容！');
					return
				}

				if(this.$route.query.id){//编辑
					let index=this.$store.state.notes.findIndex(item=>item.id==this.$route.query.id)
					this.$set(this.$store.state.notes[index],'content',this.content)
					this.$set(this.$store.state.notes[index],'type',this.selectType)
					let data={
						id:this.$store.state.notes[index].id,
						content:this.content,
						isTop:this.$store.state.notes[index].isTop,
						type:this.selectType,
						date:this.$store.state.notes[index].date
					};
					localStorage.setItem('notes',JSON.stringify(this.$store.state.notes))

				}else{//新增
				//	console.log(this.$store.state.isTop)
					let data={
						id:this.$store.state.notesID+1,
						content:this.content,
						isTop:!this.$store.state.isTop?true:false,
						type:this.selectType,
						date:new Date().getTime()
					};
					this.$store.dispatch('saveNotesID',data.id)
					this.$store.dispatch('addNotes',data)

				}
				//this.$router.push('/')
				
			}
		},
		mounted(){
		
			if(this.$route.query.id){
				console.log(this.$store.state)
				this.content=this.$store.state.notesUpdateData.content;
				this.selectType=this.$store.state.notesUpdateData.type;
			}
		}
	}
</script>