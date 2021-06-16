import {LoginAPI} from '../api/api.js';
import {NotificationsAC} from './NotificationsReducer.js';

let initialState = {
	InputForm: {
		FormMainItems: [
			{
                ItemName: "Login",
                Explanations: "Login",
				Type: "Text"
            },
			{
                ItemName: "Password",
				Explanations: "Password",
				Type: "Password"
            }
		]
	}
};

const LoginReducer = (state = initialState, action) => {
	let stateCopy = {...state};
	
	switch (action.type) {
        case "SET_BRANCH":{
            stateCopy.InputForm.FormMainItems[0].Options = Object.values(action.data).map(el => {
                return {Key: el.Id, Data: el.Name + ", " + el.Address};
            });
			return stateCopy;
		}
		default:{
			return state;
		}
	}
}

export const LoginAC = {
    SetBranch: (data) => {
        return {
            type: "SET_BRANCH",
            data: data
        };
    }
}
export const LoginThunkCreator = {
    Get: () => {
        return (dispatch) => {
            LoginAPI("Get").then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: data.Message}));
                }
                dispatch(LoginAC.SetBranch(data));
            });
        }
    }
}

export default LoginReducer;
