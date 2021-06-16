import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Record extends React.Component {
    ParseRecord = (data, type) => {
        console.log(data);
        switch(type){
            case "Поставка товара":
                return (
                    <div>
                        <div>Дата: {data.Date}</div>
                        <div>Поставщик: {data.NameProvider}</div>
                        <div>Использованный счет: {data.NameFinAccount}</div>
                        <div>Комментарий: {data.Comment}</div>
                        <div>Состав поставки</div>
                        <ol>
                            {data.Composition.map((el, ind) => {
                                return (
                                    <li key={ind}>{el.NameItem} {el.Num}x{el.Price}:{el.Sum}</li>
                                )
                            })}
                        </ol>
                        <div>Полная стоимость поставки: {data.FullSum}</div>
                    </div>
                );
            case "Списание товара":
                return (
                    <div>
                        <div>Дата: {data.Date}</div>
                        <div>Комментарий: {data.Comment}</div>
                        <div>Состав списания</div>
                        <ol>
                            {data.Composition.map((el, ind) => {
                                return (
                                    <li key={ind}>{el.NameItem} {el.Num} {el.Details}</li>
                                )
                            })}
                        </ol>
                        
                    </div>
                );
            default:
                return null;
        }
    }
    
    render(){
        return (
            <div>
                <div>Дата: {this.props.Date}</div>
                <div>Исполнитель: {this.props.Workman}</div>
                <div>Тип: {this.props.Type}</div>
                {this.ParseRecord(this.props.ActionObject, this.props.Type)}
            </div>
        )
    }
}

class LogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StartDate: "",
            EndDate: ""
        }
    }
    
    componentDidMount(){
        this.props.Get();
	};
    
    ChangeStartDate = (e) => {
        this.setState({
            StartDate: e.currentTarget.value
        })
    }
    ChangeEndDate = (e) => {
        this.setState({
            EndDate: e.currentTarget.value
        })
    }
    
    FilteredList = (RecordsList, Start, End) => {
        console.log(new Date(Start) < new Date(End));
        if(Start === "" && End === "") return RecordsList;
        if(Start === "") {
            return RecordsList.filter(el => {
                if(new Date(el.Date) <= new Date(End)){
                    return 1;
                }else{
                    return 0;
                }
            });
        };
        if(End === "") {
            return RecordsList.filter(el => {
                if(new Date(Start) <= new Date(el.Date)){
                    return 1;
                }else{
                    return 0;
                }
            });
        };
        return RecordsList.filter(el => {
            if(new Date(Start) <= new Date(el.Date) && new Date(el.Date) <= new Date(End)){
                return 1;
            }else{
                return 0;
            }
        });
        return RecordsList
    }
    
	render(){
		return (
			<div>
                <h2>Log: {this.props.Title}</h2>
                {this.props.Add? <Link to={this.props.location.pathname + "/Add"}>Добавить запись</Link> : null}
                <button onClick={()=>{this.props.Get();}}>Обновить</button>
                <div>
                    <input type={"datetime-local"} value={this.state.StartDate} onChange={this.ChangeStartDate}></input>
                    <input type={"datetime-local"} value={this.state.EndDate} onChange={this.ChangeEndDate}></input>
                </div>
                {this.FilteredList(this.props.RecordsList, this.state.StartDate, this.state.EndDate).map((el, ind)=>{
                    return (<Record key={ind} {...el} />)
                })}
			</div>
		)
	}
};

export default withRouter(LogList);

//{this.TR(this.ContentSort(this.TypeSort()), true)}