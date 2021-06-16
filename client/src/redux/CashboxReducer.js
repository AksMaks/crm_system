import {CashboxAPI} from '../api/api.js';
import {NotificationsAC} from './NotificationsReducer.js';

let initialState = {
    Accounts: [],
    CashShift: {},
    Categories: {},
    Products: [],
};

const CashboxReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    
	switch (action.type) {
        case "SET_CASHBOX_DATA":{
            
            stateCopy.Accounts = Object.values(action.data.finance_accounts);
            stateCopy.CashShift = action.data.CashShift;
            stateCopy.Categories = action.data.categories;
            stateCopy.Products = Object.values(action.data.products);
            
            return stateCopy;
        }
		default:{
			return state;
		}
	}
}

export const CashboxAC = {
    setData: (data) => {
        return {
            type: "SET_CASHBOX_DATA",
            data: data
        };
    }
}
export const CashboxThunkCreator = {
    Get: (IdBranch, Workman) => {
        return (dispatch) => {
            CashboxAPI("Get", null, IdBranch, Workman).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(CashboxAC.setData(data));
                }
            });
        }
    },
    Shift: (Data, IdBranch, Workman, Type) => {
        return (dispatch) => {
            CashboxAPI("Shift", Data, IdBranch, Workman, Type).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                    CashboxAPI("Get", null, IdBranch, Workman).then((data) => {
                        if(data.ERROR){
                            dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                        }else{
                            dispatch(CashboxAC.setData(data));
                        }
                    });
                }
            });
        }
    },
    AddCheck: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            CashboxAPI("AddCheck", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    }
}

export default CashboxReducer;
