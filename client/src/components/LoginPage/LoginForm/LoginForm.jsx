import React, {compose} from 'react';
import * as axios from 'axios';
import s from './LoginForm.module.css';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import { FieldArray, Field, reduxForm } from 'redux-form';

import { CommonThunkCreator, CommonAC} from '../../../redux/CommonReducer.js';

const renderField = ({input, data, label, type, asd, meta: { touched, error, warning } }) => {
    let Item = null;
    Item = (type === "textarea")? <textarea {...input} placeholder={label} required></textarea>: 
        <input ref={data} {...input} type={type} placeholder={label} required/>;
   
    return(
        <>
            {Item}
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </>
    )
};

class InputPanel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {}
    }
    
	render(){
		return (
			<>
                {(this.props.Branches.length > 0 && this.props.User !== null)?
                    <div className={s.Panel}>
                        <div className={s.Title}>Вход выполнен</div>
                        
                        <div className={s.MoveForm}>
                            <div> 
                                <select 
                                    className={s.Select}
                                    ref={this.myRef}
                                    defaultoptions={this.props.Branches[0].Id}
                                    onChange={()=> this.props.ChangeBranch(this.myRef.current.value)}>
                                    {this.props.Branches.map((el, ind) => {
                                        return (
                                            <option key={ind} value={el.Id}>{el.Name + ". " + el.Address}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <Link to={"ManagerPanel"}>
                                <div className={s.Link}>Панель менеджера</div>
                            </Link>
                            {(this.props.User.Access.Cashbox)?
                                <Link to={"/Cashbox"}>
                                    <div  className={s.Link}>Управление кассой</div>
                                </Link>:null
                            }
                            <div>
                                <a href={"/"} className={s.Exit}>Выйти</a>
                            </div>
                        </div>
                     </div>
                 :
                 <div className={s.Panel}>
                    <div className={s.Title}>Вход</div>
                    <form onSubmit={this.props.handleSubmit}>
                        <div className={s.ItemForm}>
                            <span>Введите логин</span>
                                <Field
                                    type={"input"}
                                    name={"Login"}
                                    label={"Логин"}
                                    component={renderField}/>
                        </div>
                        <div className={s.ItemForm}>
                            <span>Введите пароль</span>
                                <Field
                                    type={"password"}
                                    name={"Password"}
                                    label={"Пароль"}
                                    component={renderField}/>
                        </div>
                        <div className={s.ItemForm}>
                            <a onClick={()=> alert("Если вы забыли личные данные, то обратитесь к менеджуру, который имеет доступ к данным сотрудников, чтобы он передал вам ваши данные.")}>Я забыл логин/пароль</a>
                            <button>Войти</button>
                        </div>
                        
                    </form>
                 </div>
                }
			</>
		)
	}
};

let InputPanelForm = reduxForm()(InputPanel);

let mapStateToProps = (state) => {
	return {
        form: "LoginForm",
        User: state.Common.User,
        Branches: state.Common.Branches
    };
}; 

let mapDispatchToProps = (dispatch) => {
	return {
        onSubmit: (FormData) => {
          console.log(FormData);
          dispatch(CommonThunkCreator.Login(FormData));
        },
        ChangeBranch: (data) => {
            dispatch(CommonAC.SetCurrentBranch({IdCurrentBranch: data}));
        }
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InputPanelForm));
