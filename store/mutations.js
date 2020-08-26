export default {
	SET_HOBBY_ISCHECKALL(state, param) {
		state.hobby_isCheckAll = param;
	},
	SET_CHECKED_HOBBYS_ID(state, param) {
		state.checked_hobbys_id = param;
	},
	SET_CHECKED_HOBBYS_NAME(state, param) {
		state.checked_hobbys_name = param;
	},
	SET_CHOOSEDAYS(state, param){
		state.chooseDays = param
	},
	SET_TASKID(state, param){
		state.taskId = param
	},
	SET_TASKSTEPONE(state, param){
		state.taskStepOne = param
	}
}