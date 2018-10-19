<template>
	<div class="notesList">
		<div class="notesItem" v-for="(item,index) in notes" :class="{isTop:item.isTop}" @click="editNotes(item)">
			<div class="notesText">
				<div class="notesTitle">{{item.content}}</div>
				<div class="notesTime">{{item.date}}</div>
			</div>	
		</div>
		<div class="btnAddNotes" @click="addNotes">+</div>
	</div>
</template>
<style scoped>
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
		computed:mapState({
			notes:state=>{
				return state.notes
			}
		}),
		methods:{
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

			console.log(this.$store);
		}
	}
</script>