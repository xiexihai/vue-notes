const actions={
	saveNotesID({commit},id){
		commit('SAVE_NOTES_ID',id)
	},
	addNotes({commit},data){
		commit('ADD_NOTES',data)
	},
	updateNotes({commit},data){
		commit('UPDATE_NOTES',data)
	},
	delNotes({commit}){
		return new Promise((resolve, reject) => {
	      setTimeout(() => {
	        commit('DEL_NOTES')
	        resolve()
	      }, 10)
	    })
	},
	setDropDown({commit},value){
		commit('SET_DROPDOWN',value)
	},
	setTop({commit},value){
		commit('SET_TOP',value)
	},
	addOrUpdate({commit},value){
		commit('ADD_OR_UPDATE',value)
	}
}
export default actions