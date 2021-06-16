import React from 'react';
import s from'./CashboxMenu.module.css';
import {withRouter, Route, NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Cashbox from './Cashbox/Cashbox.jsx';


import {CashboxThunkCreator} from '../../redux/CashboxReducer.js';

class CashboxMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
	
    goToPage = (Url) => {
        document.location.href = Url;
    }
    
	render(){
        if(!(this.props.Common.CurrentBranch && this.props.Common.User)) this.goToPage("https://hafizovtimur.ru/");
        return (
            <div className={s.CashboxMenu}>
                <div className={s.Head}>
                    <div>
                        <a href="/">Выйти</a>
                    </div>
                    <div>
                        {this.props.Cashbox.CashShift?
                            <div>
                                <a onClick={() => {
                                        this.props.dispatch(
                                            CashboxThunkCreator.Shift(
                                                null,
                                                this.props.Common.CurrentBranch.Id, 
                                                this.props.Common.User.Name,
                                                "Close")
                                        );
                                    }}>Закрыть смену от {this.props.Cashbox.CashShift.Start}</a>    
                            </div>:
                            <div>
                                <a onClick={() => {
                                        this.props.dispatch(
                                            CashboxThunkCreator.Shift(
                                                null,
                                                this.props.Common.CurrentBranch.Id,
                                                this.props.Common.User.Name,
                                                "Open")
                                        );
                                    }}>Окрыть новую смену</a>
                            </div>
                        }
                    </div>
                    <div>
                        {this.props.Common.User.Name}
                    </div>
                </div>
                <Cashbox/>
            </div>
	   )
    }
}

let mapStateToProps = (state) => {
	return {
        Common: {User: state.Common.User, CurrentBranch: state.Common.CurrentBranch},
        Cashbox: state.Cashbox
	}
};

let mapDispatchToProps = (dispatch) => {
	return {
        dispatch: dispatch
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CashboxMenu);