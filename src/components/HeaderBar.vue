<template>
	<div class="header">
		<div class="header-back" @click="handlerBack">返回</div>
		<div class="header-operation">
			<span>换肤</span>
			<span @click.stop="handlerShowDropDown">操作</span>
		</div>
		<ul class="header-dropDownList" :class="{open:this.$store.state.showDropDown}">
			<li>分享</li>
			<li>提醒</li>
			<li @click="handlerPlacedTop">{{this.$store.state.notesUpdateData.isTop?'取消置顶':'设置置顶'}}</li>
			<li @click="handlerDelNotes" v-if="this.$store.state.addOrUpdate=='update'">删除便签</li>
		</ul>
	</div>
</template>
<script>
	export default{
		methods:{
			handlerShowDropDown(){
				if(this.$store.state.showDropDown){
					this.$store.dispatch('setDropDown',false)
				}else{
					this.$store.dispatch('setDropDown',true)
				}
			},
			handlerDelNotes(){
				this.$store.dispatch('delNotes').then(()=>{
					this.$store.dispatch('setDropDown',false)
					this.$router.push({
						name:'Index'
					})
				})
			},
			handlerBack(){
				this.$router.go(-1)
			},
			handlerPlacedTop(){

				let index=this.$store.state.notes.findIndex(item=>item.id==this.$store.state.notesUpdateData.id)
				
				if(this.$store.state.notes[index].isTop){
					this.$set(this.$store.state.notes[index],'isTop',false)
					let isTopItem=this.$store.state.notes.splice(index,1)
					this.$store.state.notes=this.$store.state.notes.concat(isTopItem)
				}else{
					this.$set(this.$store.state.notes[index],'isTop',true)
					let isTopItem=this.$store.state.notes.splice(index,1)
					this.$store.state.notes=isTopItem.concat(this.$store.state.notes)
				}

				localStorage.setItem('notes',JSON.stringify(this.$store.state.notes))

				//this.$router.push('/')
			}
		},
		mounted(){
			console.log(this.$store.state.addOrUpdate)
		}

	}
</script>