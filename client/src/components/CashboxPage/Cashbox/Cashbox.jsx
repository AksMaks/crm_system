import React from 'react';
import s from'./Cashbox.module.css';
import {withRouter, Route, NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {} from 'react-router-dom';


import {CashboxThunkCreator} from '../../../redux/CashboxReducer.js';

import {createPdf} from './PDFDocument.js';

class RightPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            CurrentSearch: "",
            CurrentCategory: null,
            CurrentCategoriesList: []
        }
    }
    
    ChangeCurrentCategory = (NewCurrentCategory) => {
        if(NewCurrentCategory === null){
            this.setState({
                CurrentCategory: null,
                CurrentCategoriesList: []
            });
            return;
        }
        
        let CurrentCategory = this.props.Categories[NewCurrentCategory];
        let List = [CurrentCategory];
        
        while(CurrentCategory.Base){
            List = [this.props.Categories[CurrentCategory.Base], ...List];
            CurrentCategory = this.props.Categories[CurrentCategory.Base];
        }
        this.setState({
            CurrentCategory: NewCurrentCategory,
            CurrentCategoriesList: List
        });
    }
	
    ChangeSearch = (data) => {
        this.setState({
            CurrentSearch: data.currentTarget.value
        })
    }
    
	render(){
        return (
            <div className={s.RightPanel} style={{height: window.innerHeight - 50}}>
                <div className={s.CategorysList}>
                    <div onClick={() => this.ChangeCurrentCategory(null)} style={{cursor: "pointer"}}>{"Главная"}</div>
                    { 
                        this.state.CurrentCategoriesList.map((el, ind) => {
                            return (
                                <div key={ind} onClick={() => this.ChangeCurrentCategory(el.Id)}>
                                    <span style={{margin: "0px 5px"}}>{">"}</span>
                                    <span style={{cursor: "pointer"}}>{el.Name}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={s.CategorysPanel}>
                    {
                        Object.values(this.props.Categories).filter(el => {
                            if(el.Base === this.state.CurrentCategory){
                                return true;
                            }else{
                                return false;
                            }
                        }).map((el, ind) => {
                            return (
                                <div key={ind} onClick={() => this.ChangeCurrentCategory(el.Id)} className={s.PanelItem}>
                                    <div><img src={el.ImageURL} style={{"width": "240px", "height": "150px"}}/></div>
                                    <div className={s.Text}>{el.Name}</div>
                                </div>
                            );
                        })
                        }
                </div>
                <div  className={s.ProductsPanel}>
                    {
                        Object.values(this.props.Products).filter(el => {
                            if(el.IdCat === this.state.CurrentCategory){
                                return true;
                            }else{
                                return false;
                            }
                        }).map((el, ind) => {
                            return (
                                <div 
                                    key={ind} 
                                    onClick={() => this.props.AddItemBasketList({Id: el.Id, Name: el.Name, Type: el.Type, Number: 1, Price: el.Price})}
                                    className={s.PanelItem}>
                                    <div><img src={el.ImageURL} style={{"width": "240px", "height": "150px"}}/></div>
                                    <div className={s.TextProduct}>
                                        <div><strong>{el.Name}</strong></div>
                                        <div>{el.Price}₽</div>
                                    </div>
                                </div>
                                );
                            })
                    }
                </div>
            </div>
	   )
    }
}

class LeftPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            VisibilityFunc: false
        }
    };
    
	ChangeVisibilityFunc = () => {
        this.setState({
            VisibilityFunc: !this.state.VisibilityFunc 
        })
    };

	render(){
        return (
            <div className={s.LeftPanel} style={{height: window.innerHeight - 150}}>
                <table className={s.BasketTable}>
                    <thead>
                        <tr>
                            <th>Наименование</th>
                            <th>Кол-во</th>
                            <th>Цена</th>
                            <th>Итого</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.BasketList.map((el, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{el.Name}</td>
                                        <td>
                                            <button 
                                                className={s.Button} 
                                                onClick={() => this.props.ChangeItemNumber(ind, el.Number - 1)}>-</button>
                                            {el.Number}
                                            <button 
                                                className={s.Button}
                                                onClick={() => this.props.ChangeItemNumber(ind, el.Number + 1)}>+</button>
                                        </td>
                                        <td className={s.Price}>{el.Price}</td>
                                        <td>{el.Number * el.Price}</td>
                                        <td><button onClick={() => this.props.DeleteItem(ind, el.Price * el.Number)}>X</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className={s.Footer}>
                    <div>{"К оплате"}</div>
                    <div><strong>{this.props.BasketCost * (100 - this.props.Discount) /100}{" ₽"}</strong></div>
                    <div><button className={s.AddFunc} onClick={() => this.ChangeVisibilityFunc()}>...</button></div>
                        {this.state.VisibilityFunc? 
                            <div className={s.VisibilityFunc}>
                                <div>
                                    <span>{"Скидка (%) "}</span>
                                    <input 
                                        type={"number"} 
                                        value={this.props.Discount} 
                                        onChange={(event) => this.props.ChangeDiscount(event.target.value)}/>
                                </div>
                                <div>
                                    <select onChange={(event) => this.props.ChangeAccount(JSON.parse(event.target.value))}>
                                        {this.props.FinanceAccounts.map((el, ind) => {
                                            return ( 
                                                <option key={ind} value={JSON.stringify(el)}>{el.Name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <button className={s.PreCheck} onClick={() => this.props.PrintPreCheck()}>Пре-чек</button>
                                </div>
                            </div>:
                        null}
                    <div><button className={s.Submit} onClick={() => this.props.AddCheck()}>Оформить</button></div>
                </div>
            </div>
	   )
    }
}

class Cashbox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Account: null,
            AccountName: null,
            BasketCost: 0,
            Discount: 0,
            BasketList: []
        }
    }
    componentDidMount(){
        this.props.dispatch(CashboxThunkCreator.Get(this.props.Common.CurrentBranch.Id, this.props.Common.User.Name));
	};
    
    AddItemBasketList = (NewItem) => {
        let indItem =  this.state.BasketList.findIndex(el => {
            if(NewItem.Id === el.Id){
                return true;
            }else{
                return false;
            }
        });
        
        let NewList = [];
        if(indItem >=0){
            NewList = this.state.BasketList;
            NewList[indItem].Number += NewItem.Number;
        }else{
            NewList = [...this.state.BasketList, NewItem];
        }
        this.setState({
            BasketCost: this.state.BasketCost + NewItem.Number * NewItem.Price,
            BasketList: NewList
        });
    };
    
    ChangeItemNumber = (Index, NewNumber) => {
        NewNumber = (NewNumber < 1)? 1: NewNumber;
        
        let NewList = this.state.BasketList, NewCost = this.state.BasketCost;
        NewCost -= NewList[Index].Number *  NewList[Index].Price;
        NewList[Index].Number = NewNumber;
        NewCost += NewList[Index].Number *  NewList[Index].Price;
        this.setState({
            BasketCost: NewCost,
            BasketList: NewList
        });
    };
	DeleteItem = (Index, Cost) => {
        let NewList = this.state.BasketList;
        let NewCost = this.state.BasketCost - Cost;
        NewList.splice(Index, 1);
        this.setState({
            BasketCost: NewCost,
            BasketList: NewList
        });
    };
	ChangeDiscount = (NewNumber) => {
        NewNumber = (NewNumber < 0)? 0: NewNumber;
        
        this.setState({
            Discount: NewNumber
        });
    };

    ChangeAccount = (NewAccount) => {
        console.log(NewAccount);
        this.setState({
            Account: NewAccount.Id,
            AccountName: NewAccount.Name
        });
    };

    PrintPreCheck = () => {
        console.log("asd");
        createPdf(this.state.BasketList, this.state.BasketCost, this.state.Discount);
    };
    
    AddCheck = () => {
        this.props.dispatch(CashboxThunkCreator.AddCheck(
            {
                Composition: this.state.BasketList,
                Discount: this.state.Discount,
                Cost: this.state.BasketCost,
                Account: this.state.Account,
                AccountName: this.state.AccountName
            },
            this.props.Common.CurrentBranch.Id,
            this.props.Common.User.Name
        ));
    }
    
	render(){
        if(this.props.Cashbox.Accounts[0] && !this.state.Account){
            this.setState({
                Account: this.props.Cashbox.Accounts[0].Id,
                AccountName: this.props.Cashbox.Accounts[0].Name
            });
        };
        
        return (
            <div className={s.Cashbox}>
                <div className={s.Panels}>
                    <LeftPanel 
                        BasketCost={this.state.BasketCost}
                        ChangeItemNumber={this.ChangeItemNumber}
                        DeleteItem={this.DeleteItem}
                        BasketList={this.state.BasketList}
                        Discount={this.state.Discount}
                        ChangeDiscount={this.ChangeDiscount}
                        FinanceAccounts={this.props.Cashbox.Accounts}
                        ChangeAccount={this.ChangeAccount}
                        PrintPreCheck={this.PrintPreCheck}
                        AddCheck={this.AddCheck}/>
                    <RightPanel
                        AddItemBasketList={this.AddItemBasketList}
                        Categories={this.props.Cashbox.Categories}
                        Products={this.props.Cashbox.Products}/>
                </div>
            </div>
	   )
    }
}

let mapStateToProps = (state) => {
	return {
        Common:  {User: state.Common.User, CurrentBranch: state.Common.CurrentBranch},
        Cashbox: state.Cashbox
	}
};

let mapDispatchToProps = (dispatch) => {
	return {
        dispatch: dispatch
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Cashbox);