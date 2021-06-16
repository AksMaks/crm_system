import React, {compose} from 'react';
import * as axios from 'axios';
import s from './InputForm.module.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { FieldArray, Field, reduxForm } from 'redux-form';

const renderField = ({input, data, label, type, asd, meta: { touched, error, warning } }) => {
    let Item = null;
    Item = <input ref={data} {...input} type={type} placeholder={label} required/>;
    if(type === "textarea"){
        Item = <textarea {...input} placeholder={label} required></textarea>;
    };
    if(type === "checkbox"){
        Item = <input ref={data} {...input} type={type} placeholder={label}/>;
    };
    return(
        <>
            {Item}
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </>
    )
};

class FieldFileInput extends React.Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
  }

  render(){
    const { input: { value } } = this.props
    const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
    return(
     <div>
       <input
        type='file'
        accept='.jpg, .png, .jpeg'
        onChange={this.onChange}
        
       />
     </div>
    )
}
}

class FormItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {Item: null};
        switch (this.props.Type){
            case "Text": 
                this.state.Item = <Field
                                type={"input"}
                                label={this.props.Explanations} 
                                name={this.props.Name}
                                component={renderField}/>;
                break;
            case "Password": 
                this.state.Item = <Field
                                type={"password"}
                                name={this.props.Name}
                                component={renderField}/>;
                break;
            case "TextArea": 
                this.state.Item = <Field
                                type={"textarea"}
                                name={this.props.Name}
                                component={renderField}/>;
                break;
            case "Number":
                this.state.Item = <Field
                                type={"number"}
                                name={this.props.Name}
                                 component={renderField}/>;
                break;
            case "Checkbox":
                this.state.Item = <Field
                                type={"checkbox"}
                                name={this.props.Name}
                                 component={renderField}/>;
                break;
            case "Phone":
                this.state.Item = <Field
                                type={"tel"}
                                pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                                label={"999-999-9999"}
                                name={this.props.Name}
                                component={renderField}/>;
                break;
            case "Date":
                this.state.Item = <Field
                                type={"datetime-local"}
                                name={this.props.Name}
                                component={renderField}/>;
                break;
            case "Color":
                this.state.Item = <Field
                                type={"color"}
                                name={this.props.Name}
                                component={renderField}/>;
            case "File":
                this.state.Item = <Field
                                type={"file"}
                                name={this.props.Name}
                                component={FieldFileInput}/>;
                break;
            case "Select":
                let arrOption;
                if(this.props.FormType == "Main"){
                   arrOption = [<option key={0} value={"Не выбрано"}>Не выбрано</option> , 
                               ...(this.props.Options.map( (el, ind) => (<option key={ind+1} value={el.Key}>{el.Data}</option>)))];
                }
                if(this.props.FormType == "Composition"){
                    arrOption = [<option key={0} value={JSON.stringify("Не выбрано")}>Не выбрано</option> , 
                               ...(this.props.Options.map( (el, ind) => (<option key={ind+1} value={JSON.stringify(el.Key)}>{el.Data}</option>)))];
                };
                this.state.Item = <Field
                                    name={this.props.Name}
                                    component={"select"}>
                                        {arrOption}
                                </Field>;
                break;
            default: 

                break;
        }
    }
	render(){
		return (
			<label>
                <span>{this.props.Explanations}</span>
				{this.state.Item}
            </label>
		)
	}
};

const Popup = ({Open, OnClose, children}) => {
    if(!Open) return null;
    return (
		<div className={s.Popup}>
            <div className={s.PopupContent}>
                <div className={s.PopupHead}>
                    Элемент состава
                </div>
                {children}
                <div className={s.PopupClose} onClick={() => OnClose()}>
                    Сохранить
                </div>
            </div>
        </div>
    )
}

class RenderComposition extends React.Component{ 
    constructor(props){
        super(props);
        this.state = { 
            Items: this.props.FormComposition.Items,
            VisibilityList: false,
            VisibilityPopup: false,
            PopupIndex: null,
            PopupItem: null
        }
        
    }
    //Изменение видимости списка, видимых столбцов 
    ChangeVisibilityList = () => {
        this.setState({
            VisibilityList: !this.state.VisibilityList
        })
    }
    //Изменение списка, показываемых столбцов
    ChangeVisibilityColumn = (ind) => {
        let TempArr = this.state.Items;
        if(TempArr[ind].Visibility){
            TempArr[ind].Visibility = false;
        }else{
            TempArr[ind].Visibility = true;
        };
        this.setState({
            Items: TempArr
        });
    }
    
	render(){
        let  Items = this.state.Items.filter(el =>  {return el.Visibility? 1: 0;});
        if(!this.props.fields.getAll()){
            return (
                <>
                    <div className={s.CompositionTitle}>Состав</div>
                    <div>
                        <img
                            onClick={() => {
                                this.props.fields.push(this.props.FormComposition.InitialObject);
                                this.setState({
                                    PopupIndex: this.props.fields.length,
                                    PopupItem: `Composition[${this.props.fields.length}]`,
                                    VisibilityPopup: true
                                })
                            }}
                            className={s.Add}
                            style={{cursor: "pointer", marginTop: "10px"}}
                            title="Add item" 
                            src={"/Assets/Icons/InputPanel/Add.svg"}/>
                        {(this.props.touched || this.props.submitFailed) && this.props.error && <span>{this.props.error}</span>}
                    </div>
                </>)
        }
        return (
        <div>
            
            <div className={s.CompositionTitle}>Состав</div>
            <div className={s.Tool}>
                <span 
                    onClick={() => this.ChangeVisibilityList()} 
                    style={{color: "#FFB629", cursor: "pointer"}}>
                    Столбцы
                </span>
                {this.state.VisibilityList?
                    (<div className={s.VisibilityList}>
                        <div style={{margin: "10px"}}>Отображать столбцы</div>
                        {this.state.Items.map((el, ind) => {
                            return (
                                <label key={ind}>
                                    <input onClick={() => this.ChangeVisibilityColumn(ind)} type="checkbox" defaultChecked={el.Visibility? true: false}/>
                                    {el.Title}
                                </label>
                            )
                        })
                        }
                    </div>): null}
            </div>
            <Popup Open={this.state.VisibilityPopup} OnClose={() => this.setState({VisibilityPopup: false, PopupIndex: null})}>
                <div>
                    {this.props.FormComposition.Items.map(
                                (el, ind)=> {
                                    if(el.Type === undefined && this.state.PopupIndex !== null){
                                        let Value = 0;
                                        el.Formula.forEach(elF => {
                                            if(elF.Sign === "+E") Value += parseFloat(this.props.fields.get(this.state.PopupIndex)[elF.Element]);
                                            if(elF.Sign === "+N") Value += parseFloat(elF.Number);
                                            if(elF.Sign === "*E") Value *= parseFloat(this.props.fields.get(this.state.PopupIndex)[elF.Element]);
                                            if(elF.Sign === "*N") Value *= parseFloat(elF.Number);
                                        })
                                        this.props.fields.get(this.state.PopupIndex)[el.ItemName] = Value;
                                        return (
                                            <div key={ind} className={s.FormItemMessage}>
                                                <div className={s.FormItemMessageTitle}>{el.Title}</div>
                                                <div className={s.FormItemMessageValue}>{Value}</div>
                                            </div>);
                                    }

                                    return (
                                        <div key={ind} className={s.FormItem}>
                                            <FormItem
                                                key={ind+"FI"}
                                                ClassName={s.FormItem}
                                                Name={`${this.state.PopupItem}.${el.ItemName}`}
                                                Explanations={el.Title}
                                                Type={el.Type}
                                                FormType={"Composition"}
                                                Options={el.Options}/>
                                        </div>
                                    )
                                })
                            }
                </div> 
            </Popup>
            <table>
            <thead>
                <tr>
                    {Items.map((el, ind)=> <th key={ind}>{el.Title}</th>)}
                </tr>
            </thead>
            <tbody>
                {this.props.fields.map((item, index) =>
                    <tr key={index}>
                        {Items.map(
                            (el, ind)=> {
                                if(el.Type === "Select"){
                                    return <td key={ind}>{JSON.parse(this.props.fields.get(index)[el.ItemName]).Name}</td>
                                }
                                if(el.Type === "Checkbox"){
                                    return <td key={ind}>{this.props.fields.get(index)[el.ItemName]? "Да": "Нет"}</td>
                                }
                                return (
                                        <td key={ind}>{this.props.fields.get(index)[el.ItemName]}</td>
                                    )
                                
                            })
                        }
                        <td>
                            <img
                                style={{cursor: "pointer"}}
                                title="Change Item" 
                                src={"/Assets/Icons/InputPanel/Change.svg"}
                                onClick={() => {
                                    this.setState({
                                        PopupIndex: index,
                                        PopupItem: item,
                                        VisibilityPopup: true
                                    })
                                }}/>
                        </td>
                        <td>
                            <img
                                style={{cursor: "pointer"}}
                                title="Remove Item" 
                                src={"/Assets/Icons/InputPanel/Delete.svg"}
                                onClick={() => this.props.fields.remove(index)}/>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
            <div>
                <img
                    onClick={() => {
                        this.props.fields.push(this.props.FormComposition.InitialObject);
                        this.setState({
                            PopupIndex: this.props.fields.length,
                            PopupItem: `Composition[${this.props.fields.length}]`,
                            VisibilityPopup: true
                        })
                    }}
                    className={s.Add}
                    style={{cursor: "pointer", marginTop: "10px"}}
                    title="Add item" 
                    src={"/Assets/Icons/InputPanel/Add.svg"}/>
                {(this.props.touched || this.props.submitFailed) && this.props.error && <span>{this.props.error}</span>}
            </div>
        </div>
        )
	}
}

class InputPanel extends React.Component {
	render(){
		return (
			<div className={s.InputPanel} style={{minHeight: window.innerHeight}}>
                <div className={s.Head}>
                    <div onClick={() => this.props.goBack()} className={s.Back}>
                        <img src="/Assets/Icons/InputPanel/Back.svg"/>
                        <span>Назад</span>
                    </div>
                </div>
                <div className={s.Title}>{this.props.Title}</div>
                {/*Форма для заполения*/}
                <div>
                    <form onSubmit={this.props.handleSubmit} className={s.Form} >
                        {/*Массив основных полей ввода*/}
                        {Object.values(this.props.InputForm.FormMainItems).map(
                            (el, ind) => 
                                <div key={ind} className={s.FormItem}>
                                    <FormItem
                                            Name={el.ItemName}
                                            Explanations={el.Explanations}
                                            Type={el.Type}
                                            FormType={"Main"}
                                            Options={el.Options}/>
                                
			                     </div>)}
                        {/*Массив элементов состава*/}
                        {this.props.InputForm.FormComposition?
                        <div className={s.Composition}>
                            <FieldArray FormComposition={this.props.InputForm.FormComposition} name="Composition" component={RenderComposition}/> 
                        </div>
                        : null}
                        {/*Кнопки для работы с формой*/}
                        <div className={s.FormButtons}>
                            <div>
                                <img
                                    onClick={this.props.reset}
                                    className={s.Reset}
                                    title="Reset form" 
                                    src={"/Assets/Icons/InputPanel/Reset.svg"}/>
                            </div>
                            <div>
                                <button className={s.Submit}>{this.props.TextSubmit}</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
			</div>
		)
	}
};

let InputPanelConteiner = reduxForm()(InputPanel);

export default InputPanelConteiner;