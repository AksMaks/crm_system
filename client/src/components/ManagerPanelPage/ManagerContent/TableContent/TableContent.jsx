import React from 'react';
import s from './TableContent.module.css';
import {withRouter, Link} from 'react-router-dom';

class ComposinionTable extends React.Component {
    
    //строка ячеек таблицы
    TD = (rowData, titles) => {
        return titles.map((el, ind) => {
            return (<td key={ind}>{rowData[el.ColumnName]}</td>)
        });
    }
    //строка или два строки таблицы
    TR = (content, titles) => {
        return Object.values(content).map((el, ind) => {
            return (
                <tr key={ind}>{this.TD(el, titles)}</tr>
            )
        });
    }
    render(){
        return (
                <table>
                    <thead>
                        <tr>
                            {this.props.Titles.map( (el, ind) => {
                                return <th key={ind}>{el.Name}</th>
                                }
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.TR(this.props.Content, this.props.Titles)}
                    </tbody>
                </table>
        )
    }
};

class Table extends React.Component {
    //Изменение фидимости состава
    ChangeDetailVisibility = (indTR) => {
        this.props.Content[indTR].Details = (this.props.Content[indTR].Details)? false : true;
        this.forceUpdate();
    }
    //Изменение параметра сортировки Контента 
    ChangeSort = (index) => {
        this.props.Titles.forEach((el, ind) => {
                if(ind === index){
                    if(el.Sort === "Desc" || el.Sort === null){
                        el.Sort = "Asc";
                    }else{
                        el.Sort = "Desc";
                    }
                }else{
                    el.Sort = null;   
                }
                return el;
            });
        this.forceUpdate();
    };
    //Сортировка параметру Сортировки
    SortContent = (Content) => {
        let currentSort = this.props.Titles.find((el,ind) => {
            if(el.Sort != null){
                return true;
            }else{
                return false;
            }
        });
        if(currentSort === undefined){ return Content;};
        return Content.sort((a, b) => {
            if(currentSort.Sort === "Asc"){
                if(a[currentSort.ColumnName] > b[currentSort.ColumnName]){return 1;}else{return -1;}; return 0;
            }
            if(currentSort.Sort === "Desc"){
                if(a[currentSort.ColumnName] < b[currentSort.ColumnName]){return 1;}else{return -1;}; return 0;
            }
            return 0;
        });
    };
    //строка заголовков
    rowTH = (titles) => {
        return (
            <tr>
                {titles.map( (el, ind) => {
                        if(el.Sort === "Asc"){return <th 
                                                        key={ind} 
                                                        onClick={()=>{this.ChangeSort(ind);}}
                                                    >{el.Name + "⮝"}</th>};
                        if(el.Sort === "Desc"){return <th 
                                                        key={ind} 
                                                        onClick={()=>{this.ChangeSort(ind);}}
                                                    >{el.Name + "⮟"}</th>};
                        return <th 
                                   key={ind} 
                                   onClick={()=>{this.ChangeSort(ind);}}
                                >{el.Name}</th>
                    }
                )}
            </tr>
        )
    }
    //строка ячеек таблицы
    TD = (rowData, Titles, Config, indTR, Composition) => {
        let arr = Titles.map((el, ind) => {
            if(el.ColumnName === "Url"){
                return (
                    <td key={ind}><img className={s.ImageProduct} src={rowData[el.ColumnName]} alt="Изображение"/></td>
                )
            }
            return (<td key={ind}>{rowData[el.ColumnName]}</td>)
        });
        let RowEnd = 
            <td key={arr.length+1}
                className={s.RowEnd}>
                {Config.Details? <div onClick={()=>{this.ChangeDetailVisibility(indTR)}}>Дeтали</div> : null}
                {Config.Change?
                    <div 
                        onClick={
                                ()=>{
                                    this.props.Change({...rowData, Composition: Composition});
                                    this.props.history.push(this.props.history.location.pathname+"/Change");
                                }}><img src="/Assets/Icons/TableContent/Change.svg"/></div> : null}
                {Config.Delete?
                    <div
                        onClick={
                                ()=>{
                                    console.log(  );
                                    if(window.confirm("Точно удалить " + rowData.Name)){
                                        this.props.Del({DelId: rowData.Id});
                                    }
                                }
                             }><img src="/Assets/Icons/TableContent/Delete.svg"/></div> : null}
            </td>
        arr = [...arr, RowEnd];
        return arr;
    }
    //строка или строка и подтаблица в таблице
    TR = (Content, Titles, Composition, Config) => {
        return Content.map((el, ind) => {
            let arrComposition = (Composition? Composition.Content.filter((el1)=>{
                    //id_com_ingredient
                    if(el.Id == el1[Composition.linkColumn]){
                        return true;
                    }
                    return false;
            }): null);
            if(Composition === null || Composition === undefined || !el.Details){
                return (<tr key={ind}>{this.TD(el, Titles, Config, ind, arrComposition)}</tr>);    
            };
    
            return (
                <>
                    <tr key={ind}>{this.TD(el, Titles, Config, ind, arrComposition)}</tr>
                    <tr key={"compositionTR_"+ind}>
                        <td colSpan="100" key={"compositionTD_"+ind}>
                            <ComposinionTable
                                key={"compositionTable_"+ind}
                                Titles={Composition.Title}
                                Content={arrComposition}
                                Config={Config}/>
                        </td>
                    </tr>
                </>
            )
        });
    }
    render(){
        return (
                <table className={"ExportTable"}>
                    <thead>
                        {this.rowTH(this.props.Titles)}
                    </thead>
                    <tbody>
                        {this.TR(this.SortContent(this.props.Content), this.props.Titles, this.props.Composition, this.props.Config)}
                    </tbody>
                </table>
        )
    }
};

class TableContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            Search: {Data: "", ColumnName: this.props.Search? this.props.Search: "Name"},
            Titles: Object.values(this.props.Table.Title).map(el => {
                el["Sort"] = null;
                return el;
            }),
            VisibilityList: false
        }
    }
    
	componentDidMount(){
        this.props.Get();
        /*
        if(this.props.Table.Content.length === 0){
            this.props.Get();
        };
        */
	};
    //Изменение строки, по которой ведется поиск
    ChangeSearchData = (e) => {
        this.setState({
            Search: {Data: e.currentTarget.value, ColumnName: this.state.Search.ColumnName}
        })
    }
    //фильтрация контента, по строке поиска
    ContentFilter = (Content) => {
        let ContentFilter = Content.filter((el)=>{
            if(el[this.state.Search.ColumnName].indexOf(this.state.Search.Data) >= 0){
                return true;
            }else{
                return false;
            }
        });
        return ContentFilter;
    }
    
    //Изменение видимости списка, видимых столбцов 
    ChangeVisibilityList = () => {
        this.setState({
            VisibilityList: !this.state.VisibilityList
        })
    }
    //Изменение списка, показываемых столбцов
    ChangeVisibilityColumn = (ind) => {
        let TempArr = this.state.Titles;
        if(TempArr[ind].Visibility){
            TempArr[ind].Visibility = false;
        }else{
            TempArr[ind].Visibility = true;
        };
        this.setState({
            Titles: TempArr
        });
    }
	render(){
		return (
			<div className={s.TableContent} style={{minHeight: window.innerHeight}}>
				<div className={s.Head}>
					<div className={s.Title}>{this.props.Title}</div>
                    <div className={s.ToolsBal}>
                        <div className={s.Tool}>
                            <span 
                                onClick={() => this.ChangeVisibilityList()} 
                                style={this.state.VisibilityList?{backgroundColor: "#FFB629", color: "#FFFFFF"}:null}>Столбцы</span>
                            {this.state.VisibilityList?
                            (<div className={s.VisibilityList}>
                                <div style={{margin: "10px"}}>Отображать столбцы</div>
                                {this.state.Titles.map((el, ind) => {
                                    return (
                                        <label key={ind}>
                                            <input onClick={() => this.ChangeVisibilityColumn(ind)} type="checkbox" defaultChecked={el.Visibility? true: false}/>
                                            {el.Name}
                                        </label>
                                    )
                                })}
                            </div>): null}
                        </div>
                        <div className={s.Tool}>
                          <span 
                            onClick={() => this.props.ExportTable(document.getElementsByClassName("ExportTable")[0].cloneNode(true))
                            }>Экспорт</span>
                        </div>
                    </div>
                    {this.props.Table.Config.Add? 
                        <Link to={this.props.location.pathname + "/Add"}><div className={s.AddButton}>Добавить</div></Link>: null
                    }
				</div>
                <div className={s.Content}>
                    <div className={s.Search}>
                        <img src="/Assets/Icons/TableContent/Search.svg"/>
                        <input type="search" onChange={this.ChangeSearchData} placeholder={"Быстрый поиск"}/>
                    </div>
                    <div className={s.Table}>
                        <Table
                            Titles={this.state.Titles.filter(el =>  {return el.Visibility? 1: 0;})} 
                            Content={this.ContentFilter(this.props.Table.Content)}
                            Composition={this.props.Table.Composition}
                            Config={this.props.Table.Config}
                            Change={this.props.Change}
                            Del={this.props.Del}
                            history={this.props.history}/>
                    </div>
                </div>
			</div>
		)
	}
};

export default withRouter(TableContent);

//{this.TR(this.ContentSort(this.TypeSort()), true)}