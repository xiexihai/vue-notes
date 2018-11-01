<template>
	<div class="notesList">
		<div class="aside-mask" :class="{open:openAsideBar=='true'}" @click="handlerCloseAsideBar"></div>
		<aside-bar :openAsideBar="openAsideBar" @updeteAsideBar="changeAsideBar"></aside-bar>
		<header-bar @updeteAsideBar="changeAsideBar"></header-bar>
		<!--<input type="text" v-model="keywords" name="">
		<div class="notesType">
			<div class="item" :class="{active:item==selectType}" v-for="(item,index) in types" @click="handlerSelectType(item)">{{item}}</div>
		</div>-->
		<div class="notesWrap">
			<div class="notesItem" v-for="(item,index) in notes" :class="{isTop:item.isTop}" @click="editNotes(item)" v-if="notes.length">
				<div class="notesText">
					<div class="notesTitle" v-html="filterHtmlStr(item.content)"></div>
					<div class="notesTime">{{item.date}}</div>
				</div>	
			</div>
			<div class="notesEmpty" v-if="!notes.length">暂无便签！</div>
			<div class="btnAddNotes" @click="addNotes">+</div>
		</div>
	</div>
</template>
<style scoped>
	.notesWrap{
		margin-top:50px;
	}
	.notesType .active{
		color:red;
	}	
	.notesList{
		background: #f9f9f9;
	}
	.notesItem{
		border-radius: 2px;
		margin: 10px;
		padding: 15px;
		overflow: hidden;
		box-sizing: border-box;
		box-shadow: 0 3px 5px #f7f7f7;
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
	import AsideBar from '../components/AsideBar.vue'
	import HeaderBar from '../components/HeaderBar.vue'
	import { mapState,mapActions } from 'vuex'
	export default{
		components:{
			HeaderBar,
			AsideBar
		},
		data(){
			return{
				//types:this.$store.state.notesType,
				//selectType:'全部',
				keywords:'',
				openAsideBar:'false'
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
			handlerCloseAsideBar(){
				this.openAsideBar='false';
			},
			changeAsideBar(value){
				console.log(value)
				this.openAsideBar=value;
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
				this.$store.state.notes=JSON.parse(localStorage.getItem('notes'));
			},
			editNotes(item){
				this.$store.dispatch('updateNotes',item)
				this.$store.dispatch('addOrUpdate','update')
				this.$store.state.notes=JSON.parse(localStorage.getItem('notes'));
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