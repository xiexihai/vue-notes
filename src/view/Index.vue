<template>
	<div class="notesList">
		<input type="text" v-model="keywords" name="">
		<div class="notesType">
			<div class="item" :class="{active:item==selectType}" v-for="(item,index) in types" @click="handlerSelectType(item)">{{item}}</div>
		</div>
		<div class="notesItem" v-for="(item,index) in notes" :class="{isTop:item.isTop}" @click="editNotes(item)" v-if="notes.length">
			<div class="notesText">
				<div class="notesTitle" v-html="filterHtmlStr(item.content)"></div>
				<div class="notesTime">{{item.date}}</div>
			</div>	
		</div>
		<div class="notesEmpty" v-if="!notes.length">暂无便签！</div>
		<div class="btnAddNotes" @click="addNotes">+</div>
	</div>
</template>
<style scoped>
	.notesType .active{
		color:red;
	}	
	.notesList{
		background: #F2F2F2;
	}
	.notesItem{
		border-radius: 2px;
		margin: 10px;
		padding: 15px;
		overflow: hidden;
		box-sizing: border-box;
		box-shadow: 0 3px 5px #eaeaea;
		background: #fff;
	}
	.notesItem.isTop{
		background: #FDF6D9;
	}
	.notesTitle{
		line-height: 26px;
		margin-bottom: 6px;
	}
	.notesTime{
		font-size: 12px;
		color: #aaa;
	}
	.btnAddNotes{
		width: 50px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		border-radius: 50%;
		color: #fff;
		background: rgba(255, 175, 0, 0.5);
		position: fixed;
		bottom: 50px;
		left: 50%;
		font-size: 30px;
		margin-left: -25px; 
	}
</style>
<script>
	import { mapState,mapActions } from 'vuex'
	export default{
		data(){
			return{
				types:['全部','日常','公司'],
				selectType:'全部',
				keywords:'',
				//notes:this.$store.state.notes
			}
		},
		computed:{
			notes(){
				return this.$store.state.notes.filter((item)=>{
					return item.content.indexOf(this.keywords)!==-1
				})
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
				this.selectType=value;
				this.filterType(value)
			},
			filterHtmlStr(str){
			    let reg = new RegExp("(" + this.keywords + ")", "g")
			    let result = str.replace(reg, "<font color=red>$1</font>")
			    return result
			},
			addNotes(){
				this.$router.push({
					name:'AddNotes'
				})
				this.$store.dispatch('addOrUpdate','add')
			},
			editNotes(item){
				this.$store.dispatch('updateNotes',item)
				this.$store.dispatch('addOrUpdate','update')
				this.$router.push({
					name:'AddNotes',
					query:{
						id:item.id
					}
				})
			}
		},
		mounted(){
			//console.log(this.$store);
		}
	}
</script>