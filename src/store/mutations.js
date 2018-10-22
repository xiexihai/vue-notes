import state from './state'
import * as types from './mutation-types'
const mutations={
	//记录添加便签id
	[types.SAVE_NOTES_ID](state,id){
		state.notesID=id
		localStorage.setItem('notesID',id)
	},
	//添加便签
	[types.ADD_NOTES](state,data){

		let isTopIndex=-1;
		state.notes.forEach((item,index)=>{
			if(item.isTop){
				isTopIndex=index
			}
		})
		if(isTopIndex>=0){//有置顶数据的情况下，找到置顶最后一条的位置
			if(data.isTop){//新增的时候已经设置过了置顶，则显示在第一条
				state.notes.unshift(data)
			}else{
				state.notes.splice(isTopIndex+1,0,data)
			}
		}else{
			state.notes.unshift(data)
		}
		
		localStorage.setItem('notes',JSON.stringify(state.notes))
	},
	//修改便签
	[types.UPDATE_NOTES](state,item){
		state.notesUpdateData=item
		localStorage.setItem('notesUpdateData',JSON.stringify(item))
	},
	//删除便签
	[types.DEL_NOTES](state){
		let index=state.notes.findIndex(item=>item.id==state.notesUpdateData.id)
		if(index<0){
			return
		}
		state.notes.splice(index,1)
		localStorage.setItem('notes',JSON.stringify(state.notes))
	},
	//设置dropdown显示状态
	[types.SET_DROPDOWN](state,value){
		state.showDropDown=value
	},
	//设置置顶便签
	[types.SET_TOP](state,value){
		state.isTop=value
	},
	//设置便签是新增还是更新操作
	[types.ADD_OR_UPDATE](state,value){
		state.addOrUpdate=value
		localStorage.setItem('addOrUpdate',value)
	}

}
export default mutations