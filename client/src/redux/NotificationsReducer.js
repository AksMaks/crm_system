import {LoginAPI} from '../api/api.js';

let initialState = {
    List: []
};

const NotificationsReducer = (state = initialState, action) => {
	
	let stateCopy = {...state};
	
	switch (action.type) {
        case "SET_Notifications":{
            stateCopy.List = [...stateCopy.List, action.data]
			return stateCopy;
		}
        case "Delete_Notification":{
            let tempList = [...stateCopy.List];
            tempList.splice(action.data, 1);
            stateCopy.List = tempList;
			return stateCopy;
		}
		default:{
			return state;
		}
	}
}
export const NotificationsAC = {
    SetNotification: (data) => {
        return {
            type: "SET_Notifications",
            data: data
        };
    },
    DeleteNotification: (data) => {
        return {
            type: "Delete_Notification",
            data: data
        };
    }
}

export default NotificationsReducer;
