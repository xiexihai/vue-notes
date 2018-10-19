<template>
	<div class="panelAddNotes" @click="hideDropDown">
		<header-bar></header-bar>
		<textarea v-model="content" class="textarea" rows="10" autofocus="autofocus" placeholder="记事"></textarea>
		<button @click="addNotes()">提交</button>
	</div>
</template>
<style scoped>
	.panelAddNotes{
		background: #f9f9f9;
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
				content:""
			}
		},
		//beforeRouteLeave(to,form,next){
			//this.addNotes()
			//next()
		//},
		methods:{
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
					let data={
						id:this.$store.state.notes[index].id,
						content:this.content,
						isTop:this.$store.state.notes[index].isTop,
						date:this.$store.state.notes[index].date
					};
					localStorage.setItem('notes',JSON.stringify(this.$store.state.notes))

				}else{//新增
					let data={
						id:this.$store.state.notesID+1,
						content:this.content,
						isTop:false,
						date:new Date().getTime()
					};
					this.$store.dispatch('saveNotesID',data.id)
					this.$store.dispatch('addNotes',data)



				}
				this.$router.push('/')
				
			}
		},
		watch:{
		  $route(to,from){
		   if(from.query.id){
		    	this.content=this.defaultRuleForm.content;
		    }
		  }
		},
		mounted(){
			console.log(this.$route.query)

	    	this.defaultRuleForm=JSON.parse(JSON.stringify(this.$store.state.notesUpdateData));
			if(this.$route.query.id){
				console.log(this.$store.state)
				this.content=this.$store.state.notesUpdateData.content;
			}
		}
	}
</script>