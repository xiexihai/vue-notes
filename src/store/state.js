const state={
	notes:localStorage.getItem('notes')?JSON.parse(localStorage.getItem('notes')):[],
	notesID:localStorage.getItem('notesID')?parseInt(localStorage.getItem('notesID')):0,
	notesUpdateData:localStorage.getItem('notesUpdateData')?JSON.parse(localStorage.getItem('notesUpdateData')):{},
	showDropDown:false,
	isTop:false,
	addOrUpdate:localStorage.getItem('addOrUpdate')?localStorage.getItem('addOrUpdate'):'add'
}
export default state