<template>
	<div class="header">
		<!--首页-->
		<div class="header-panel" v-if="this.$route.name=='Index'">
			<div class="btnNav" @click="handlerOpenAsideBar">
				<i class="iconfont icon-caidan"></i>
			</div>
			<div class="webTitle">便签</div>
			<div class="btnSearch">
				<i class="iconfont icon-sousuo"></i>
			</div>
		</div>	
		<!--添加便签页-->
		<div class="header-panel" v-if="this.$route.name=='AddNotes'">
			<div class="header-back" @click="handlerBack"><i class="iconfont icon-fanhui"></i></div>
			<div class="header-operation">
				<span><i class="iconfont icon-pifugexinghuazhuti-xianxing"></i></span>
				<span @click.stop="handlerShowDropDown"><i class="iconfont icon-daohanggengduoanzhuo"></i></span>
			</div>
			<ul class="header-dropDownList" :class="{open:this.$store.state.showDropDown}">
				<li>分享</li>
				<li>提醒</li>
				<li @click="handlerPlacedTop" v-if="this.$store.state.addOrUpdate=='update'">{{this.$store.state.isTop?'取消置顶':'置顶便签'}}</li>
				<li @click="handlerPlacedTop" v-if="this.$store.state.addOrUpdate=='add'">{{this.$store.state.isTop?'置顶便签':'取消置顶'}}</li>
				<li @click="handlerDelNotes" v-if="this.$store.state.addOrUpdate=='update'">删除便签</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			handlerOpenAsideBar(){
				console.log(this)
				this.$emit('updeteAsideBar','true')
			},
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
				this.$parent.addNotes();
				this.$router.go(-1)
			},
			handlerPlacedTop(){

				if(this.$store.state.isTop){
					this.$store.dispatch('setTop',false)
				}else{

					this.$store.dispatch('setTop',true)
				}
				
				if(this.$store.state.addOrUpdate=='update'){
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
				}

				console.log(this.$store.state.isTop)
				localStorage.setItem('notes',JSON.stringify(this.$store.state.notes))

				//this.$router.push('/')
			}
		},
		mounted(){
			if(this.$route.name=='AddNotes'){
				if(this.$store.state.addOrUpdate=='update'){
					let index=this.$store.state.notes.findIndex(item=>item.id==this.$store.state.notesUpdateData.id)
					if(this.$store.state.notes[index].isTop){
						this.$store.dispatch('setTop',true)
					}else{
						this.$store.dispatch('setTop',false)
					}
				}else{
					this.$store.dispatch('setTop',true)
				}
			}
			//	console.log(this.$store.state.isTop)
		}

	}
</script>