import React from 'react';
import s from './ManagerContent.module.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import InputForm from './InputForm/InputForm.jsx';
import TableContent from './TableContent/TableContent.jsx';
import LogList from './LogList/LogList.jsx';

import {
    StatisticsThunkCreator,
    IngredientsAC, 
    ComIngredientsAC,
    RolesAC, RolesThunkCreator,
    WorkersAC, WorkersThunkCreator,
    FinAccountsAC, FinAccountsThunkCreator,
    WorkshopsAC, WorkshopsThunkCreator,
    CategoriesProductsAC, CategoriesProductsThunkCreator,
    ProductsAC, ProductsThunkCreator,
    TecCardsAC,
    ProvidersAC, ProvidersThunkCreator,
    DeliveryThunkCreator, CancellationThunkCreator, TransferThunkCreator,
    ComboBoxesAC, BranchesThunkCreator, BranchesAC, ImagesThunkCreator, ImagesAC
} from '../../../redux/ManagerReducer.js';

var tableToExcel = ( function() {
		var uri = 'data:application/vnd.ms-excel;base64,'
		, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
		, base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
		, format = function(s, c) { 	    	 
			return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) 
		}
		, downloadURI = function(uri, name) {
		    var link = document.createElement("a");
		    link.download = name;
		    link.href = uri;
		    link.click();
		}

		return function(table, name, fileName) {
            var row = table.rows; // Getting the rows 
                                
            if(row[1]){
                for (var i = row[1].cells.length - 1; i < row[1].cells.length; i++) { 
                    for (var j = 1; j < row.length; j++) { 
                        if(row[j].cells.length == row[1].cells.length) row[j].deleteCell(i); 
                    };
                };
                
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
                var resuri = uri + base64(format(template, ctx))
                downloadURI(resuri, fileName);                    
            };
		}
	})();

const ManagerContent = (props) => {
    return (
		<div className={s.ManagerContent}>
    {/*Statistics*/}
            <Route	exact path="/ManagerPanel/Statistics/Checks" render={ () => 
				{
				return (
					<TableContent
						Title={"Чеки"}
						Table={props.Manager.Statistics.Table}
                        Search={"Date"}
                        
						Get={
							() => {
								props.dispatch(StatisticsThunkCreator.Get(props.Common.CurrentBranch.Id, 1));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Checks", "Checks.xls");
                            }
                        }
					/>
				)}
			}/>
    {/*Menu*/}
            <Route	exact path="/ManagerPanel/Menu/Ingredients/Add" render={ () => 
            {
				return (
					<InputForm
						Title={"Добавить Ингредиент"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"IngredientForm"}
                        initialValues={{Unit: "кг"}}
                        
                        InputForm={props.Manager.Ingredients.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(ProductsThunkCreator.Add(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 1));
                            }
                        }
					/>
				)
                }
			}/>
            <Route	exact path="/ManagerPanel/Menu/Ingredients/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить Ингредиент"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"IngredientForm"}
                        initialValues={props.Manager.Ingredients.InputForm.initialValues}
                        
                        InputForm={props.Manager.Ingredients.InputForm}
                        onSubmit={
                            (FormData) => {
                                props.dispatch(ProductsThunkCreator.Change(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 1));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/Ingredients" render={ () => 
				{
				return (
					<TableContent
						Title={"Ингредиенты"}
						Table={props.Manager.Ingredients.Table}
                        
						Get={
							() => {
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 1));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(IngredientsAC.setInitialValues(data));
                            }
                        }
                        Del={
							(data) => {
                                props.dispatch(ProductsThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name));
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 1));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Ingredients", "Ingredients.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
            <Route	exact path="/ManagerPanel/Menu/CompoundIngredients/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить Полуфабрикат"}
                        TextSubmit={"Добавить"}
				        goBack={()=>{props.history.goBack();}}
                        
                        form={"CompoundIngredientForm"}
                        initialValues={{Unit: "кг"}}
                        
                        InputForm={props.Manager.ComIngredients.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(ProductsThunkCreator.Add(TempFormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 2))
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/CompoundIngredients/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить Полуфабрикат"}
				        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"CompoundIngredientForm"}
                        initialValues={props.Manager.ComIngredients.InputForm.initialValues}
                        
                        InputForm={props.Manager.ComIngredients.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(ProductsThunkCreator.Change(TempFormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 2));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/CompoundIngredients" render={ () => 
				{
				return (
					<TableContent
						Title={"Полуфабрикаты"}
						Table={props.Manager.ComIngredients.Table}
                        
						Get={
							() => {
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 2));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(ComIngredientsAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(ProductsThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name));
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 2));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "CompoundIngredients", "CompoundIngredients.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
            <Route	exact path="/ManagerPanel/Menu/Dishes/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить техническую карту"}
                        TextSubmit={"Добавить"}
				        goBack={()=>{props.history.goBack();}}
                        
                        form={"CompoundIngredientForm"}
                        initialValues={{Unit: "кг", IdCat: "Не выбрано", IdWorkshop: "Не выбрано", Image: "Не выбрано"}}
                        
                        InputForm={props.Manager.TecCards.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(ProductsThunkCreator.Add(TempFormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 3))
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/Dishes/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить техническую карту"}
				        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"CompoundIngredientForm"}
                        initialValues={props.Manager.TecCards.InputForm.initialValues}
                        
                        InputForm={props.Manager.TecCards.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(ProductsThunkCreator.Change(TempFormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 3));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/Dishes" render={ () => 
				{
				return (
					<TableContent
						Title={"Технические карты"}
						Table={props.Manager.TecCards.Table}
                        
						Get={
							() => {
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 3));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(TecCardsAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(ProductsThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name));
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 3));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Dishes", "Dishes.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
             <Route	exact path="/ManagerPanel/Menu/Products/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить продукт"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"ProductForm"}
                        initialValues={{Unit: "кг", IdCat: "Не выбрано", IdWorkshop: "Не выбрано", Image: "Не выбрано"}}
                        
                        InputForm={props.Manager.Products.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(ProductsThunkCreator.Add(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 4));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/Products/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить продукт"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"ProductForm"}
                        initialValues={props.Manager.Products.InputForm.initialValues}
                        
                        InputForm={props.Manager.Products.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(ProductsThunkCreator.Change(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 4));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/Products" render={ () => 
				{
				return (
					<TableContent
						Title={"Продукты"}
						Table={props.Manager.Products.Table}
                        
						Get={
							() => {
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 4));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(ProductsAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(ProductsThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name, 4));
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 4));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Products", "Dishes.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
             <Route	exact path="/ManagerPanel/Menu/ComboBoxes/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить набор"}
                        TextSubmit={"Добавить"}
				        goBack={()=>{props.history.goBack();}}
                        
                        form={"ComboBoxForm"}
                        initialValues={{Unit: "кг", IdCat: "Не выбрано", IdWorkshop: "Не выбрано", Image: "Не выбрано"}}
                        
                        InputForm={props.Manager.ComboBoxes.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(ProductsThunkCreator.Add(TempFormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 5))
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/ComboBoxes/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить техническую карту"}
                        TextSubmit={"Изменить"}
						goBack={()=>{props.history.goBack();}}
                        
                        form={"ComboBoxForm"}
                        initialValues={props.Manager.ComboBoxes.InputForm.initialValues}
                        
                        InputForm={props.Manager.ComboBoxes.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(ProductsThunkCreator.Change(TempFormData, props.Common.CurrentBranch.Id, props.Common.User.Name, 5));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/ComboBoxes" render={ () => 
				{
				return (
					<TableContent
						Title={"Готовые наборы"}
						Table={props.Manager.ComboBoxes.Table}
                        
						Get={
							() => {
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 5));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(ComboBoxesAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(ProductsThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name, 5));
								props.dispatch(ProductsThunkCreator.Get(props.Common.CurrentBranch.Id, 5));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "ComboBoxes", "ComboBoxes.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
            <Route	exact path="/ManagerPanel/Menu/CategoriesProducts/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить категорию"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"CategoryForm"}
                        initialValues={{Base: "Не выбрано", Image: "Не выбрано"}}
                        
                        InputForm={props.Manager.CategoriesProducts.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(CategoriesProductsThunkCreator.Add(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/CategoriesProducts/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить категорию"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"CategoryForm"}
                        initialValues={props.Manager.CategoriesProducts.InputForm.initialValues}
                        
                        InputForm={props.Manager.CategoriesProducts.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(CategoriesProductsThunkCreator.Change(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/CategoriesProducts" render={ () => 
				{
				return (
					<TableContent
						Title={"Категории товаров и тех карт"}
						Table={props.Manager.CategoriesProducts.Table}
                        
						Get={
							() => {
								props.dispatch(CategoriesProductsThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(CategoriesProductsAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(CategoriesProductsThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Categories", "Categories.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
            <Route	exact path="/ManagerPanel/Menu/Workshops/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить места продажи"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"WorkshopForm"}
                        initialValues={null}
                        
                        InputForm={props.Manager.Workshops.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(WorkshopsThunkCreator.Add(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/Workshops/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить места продажи"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"WorkshopForm"}
                        initialValues={props.Manager.Workshops.InputForm.initialValues}
                        
                        InputForm={props.Manager.Workshops.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(WorkshopsThunkCreator.Change(FormData, props.Common.CurrentBranch.Id, props.Common.User.Name));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Menu/Workshops" render={ () => 
				{
				return (
					<TableContent
						Title={"Места продажи"}
						Table={props.Manager.Workshops.Table}
                        
						Get={
							() => {
								props.dispatch(WorkshopsThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(WorkshopsAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(WorkshopsThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Workshops", "Workshops.xls");
                            }
                        }
					/>
				)}
			}/>
    {/*Storage*/}
            <Route	exact path="/ManagerPanel/Storage/Delivery/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить поставку"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"DeliveryForm"}
                        initialValues={null}
                        
                        InputForm={props.Manager.Delivery.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.FinAccount = JSON.parse(FormData.FinAccount);
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(DeliveryThunkCreator.Add(
                                    TempFormData, 
                                    props.Common.CurrentBranch.Id, 
                                    props.Common.User.Name
                                ));
                                /*
                                let tempFormData = {...FormData};
                                tempFormData.Composition = FormData.Composition.map(el => {
                                    let ind = el.IdItem.indexOf("|");
                                    return {
                                        IdItem: el.IdItem.substring(ind+1), 
                                        NameItem: el.IdItem.substring(0, ind),
                                        Num: el.MultiplicationBlock.Num, 
                                        Price: el.MultiplicationBlock.Price, Sum: el.MultiplicationBlock.Num*el.MultiplicationBlock.Price
                                    }
                                    });
                                
                                tempFormData.FullSum = 0;
                                tempFormData.Composition.forEach(el => {
                                    tempFormData.FullSum+= el.Sum;
                                })
                                
                                tempFormData.NameProvider = "";
                                props.Manager.Delivery.InputForm.FormMainItems[1].Options.forEach(el=>{
                                    if(tempFormData.Provider === el.Key){
                                        tempFormData.NameProvider = el.Data;
                                        return;
                                    } 
                                });
                                tempFormData.NameFinAccount = "";
                                props.Manager.Delivery.InputForm.FormMainItems[2].Options.forEach(el=>{
                                    if(tempFormData.FinAccount === el.Key){
                                        tempFormData.NameFinAccount = el.Data;
                                        return;
                                    }
                                });
                                console.log(JSON.parse(JSON.stringify(tempFormData)));
                                props.dispatch(DeliveryThunkCreator.Add(
                                    {...tempFormData, ParseData: JSON.stringify(tempFormData)}, props.Common.CurrentBranch.Id, props.Common.User.Name
                                ));
                                */
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Storage/Delivery" render={ () => 
				{
				return (
					<TableContent
						Title={"Поставки"}
						Table={props.Manager.Delivery.Table}
                        Search={"Date"}
						Get={
							() => {
								props.dispatch(DeliveryThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Delivery", "Delivery.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
            <Route	exact path="/ManagerPanel/Storage/Cancellation/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить списание"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"CancellationForm"}
                        initialValues={null}
                        
                        InputForm={props.Manager.Cancellation.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(CancellationThunkCreator.Add(
                                    TempFormData, 
                                    props.Common.CurrentBranch.Id, 
                                    props.Common.User.Name
                                ));
                                /*
                                let tempFormData = {...FormData};
                                tempFormData.Composition = FormData.Composition.map(el => {
                                    let InfoItem = JSON.parse(el.IdItem);
                                    return {
                                        IdItem: InfoItem.Id,
                                        NameItem: InfoItem.Name,
                                        TypeItem: InfoItem.Type,
                                        Num: el.Num,
                                        Details: el.Details
                                    }
                                    });
                                console.log(tempFormData);
                                */
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Storage/Cancellation" render={ () => 
				{
				return (
					<TableContent
						Title={"Списания"}
						Table={props.Manager.Cancellation.Table}
                        Search={"Date"}
						Get={
							() => {
								props.dispatch(CancellationThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Cancellation", "Cancellation.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
            <Route	exact path="/ManagerPanel/Storage/Transfer/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить перемещение"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"TransferForm"}
                        initialValues={null}
                        
                        InputForm={props.Manager.Transfer.InputForm}
                        onSubmit={
                            (FormData) => {
                                
                                console.log(FormData);
                                console.log("TransferForm");
                                let TempFormData = {...FormData};
                                TempFormData.Composition = FormData.Composition.map(el => {
                                    return {...el, IdItem: JSON.parse(el.IdItem)};
                                });
                                props.dispatch(TransferThunkCreator.Add(
                                    TempFormData, 
                                    props.Common.CurrentBranch.Id, 
                                    props.Common.User.Name
                                ));
                            }
                        }
					/>
				)}
			}/>
             <Route	exact path="/ManagerPanel/Storage/Transfer" render={ () => 
				{
				return (
					<TableContent
						Title={"Перемещение"}
						Table={props.Manager.Transfer.Table}
                        Search={"Date"}
						Get={
							() => {
								props.dispatch(TransferThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Transfer", "Transfer.xls");
                            }
                        }
					/>
				)}
			}/>
            {/**/}
            <Route	exact path="/ManagerPanel/Storage/Providers/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить поставщика"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"ProviderForm"}
                        initialValues={null}
                        
                        InputForm={props.Manager.Providers.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(ProvidersThunkCreator.Add(FormData, props.Common.CurrentBranch.Id));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Storage/Providers/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить поставщика"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"ProviderForm"}
                        initialValues={props.Manager.Providers.InputForm.initialValues}
                        
                        InputForm={props.Manager.Providers.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(ProvidersThunkCreator.Change(FormData, props.Common.CurrentBranch.Id));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Storage/Providers" render={ () => 
				{
				return (
					<TableContent
						Title={"Поставщики"}
						Table={props.Manager.Providers.Table}
                        
						Get={
							() => {
								props.dispatch(ProvidersThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(ProvidersAC.setInitialValues(data, props.Common.CurrentBranch.Id));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(ProvidersThunkCreator.Del(data, props.Common.CurrentBranch.Id));
                                props.dispatch(ProvidersThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Providers", "Providers.xls");
                            }
                        }
					/>
				)}
			}/>
    {/*Finanse*/}
            <Route	exact path="/ManagerPanel/Finance/Accounts/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить счет"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"FinAccountForm"}
                        initialValues={{Type: "Не выбрано"}}
                        
                        InputForm={props.Manager.FinAccounts.InputForm}
                        onSubmit={      
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(FinAccountsThunkCreator.Add(FormData, props.Common.CurrentBranch.Id));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Finance/Accounts/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить счет"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"FinAccountForm"}
                        initialValues={props.Manager.FinAccounts.InputForm.initialValues}
                        
                        InputForm={props.Manager.FinAccounts.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(FinAccountsThunkCreator.Change(FormData, props.Common.CurrentBranch.Id));
                                props.history.goBack();
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Finance/Accounts" render={ () => 
				{
				return (
					<TableContent
						Title={"Счета"}
						Table={props.Manager.FinAccounts.Table}
                        
						Get={
							() => {
								props.dispatch(FinAccountsThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(FinAccountsAC.setInitialValues(data, props.Common.CurrentBranch.Id));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(FinAccountsThunkCreator.Del(data, props.Common.CurrentBranch.Id));
                                props.dispatch(FinAccountsThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Accounts", "Accounts.xls");
                            }
                        }
					/>
				)}
			}/>
    {/*Access*/}
            <Route	exact path="/ManagerPanel/Access/WorkersList/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить работника"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"WorkerForm"}
                        initialValues={{IdPos: "Не выбрано"}}
                        
                        InputForm={props.Manager.Workers.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(WorkersThunkCreator.Add(FormData, props.Common.CurrentBranch.Id));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Access/WorkersList/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить работника"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"WorkerForm"}
                        initialValues={props.Manager.Workers.InputForm.initialValues}
                        
                        InputForm={props.Manager.Workers.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(WorkersThunkCreator.Change(FormData, props.Common.CurrentBranch.Id));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Access/WorkersList" render={ () => 
				{
				return (
					<TableContent
						Title={"Работники"}
						Table={props.Manager.Workers.Table}
                        
						Get={
							() => {
								props.dispatch(WorkersThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(WorkersAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(WorkersThunkCreator.Del(data, props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "WorkersList", "WorkersList.xls");
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Access/RoleListing/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить должность"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"RoleForm"}
                        initialValues={null}
                        
                        InputForm={props.Manager.Roles.InputForm}
                        onSubmit={
                            (FormData) => {
                                let tempData = {...FormData};
                                delete tempData.Name;
                                props.dispatch(RolesThunkCreator.Add(
                                    {Name: FormData.Name, Access: JSON.stringify(tempData)}, 
                                    props.Common.CurrentBranch.Id, 
                                    props.Common.User.Name
                                ));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Access/RoleListing/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить должность"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"RoleForm"}
                        initialValues={props.Manager.Roles.InputForm.initialValues}
                        
                        InputForm={props.Manager.Roles.InputForm}
                        onSubmit={
                            (FormData) => {
                                let tempData = {Name: FormData.Name, Id: FormData.Id};
                                
                                let tempAccess = {...FormData};
                                delete tempAccess.Name;
                                delete tempAccess.Id;
                                delete tempAccess.Access;
                                delete tempAccess.Composition;
                                tempData.Access = JSON.stringify(tempAccess);
                                
                                props.dispatch(RolesThunkCreator.Change(tempData, props.Common.CurrentBranch.Id, props.Common.User.Name));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Access/RoleListing" render={ () => 
				{
				return (
					<TableContent
						Title={"Должности"}
						Table={props.Manager.Roles.Table}
                        
						Get={
							() => {
								props.dispatch(RolesThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                let TempData = {...data};
                                
                                console.log(TempData);
                                Object.keys(TempData.Access).forEach(el => {
                                    TempData[el] = TempData.Access[el];
                                });
								props.dispatch(RolesAC.setInitialValues(TempData));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(RolesThunkCreator.Del(data, props.Common.CurrentBranch.Id, props.Common.User.Name));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "RoleListing", "RoleListing.xls");
                            }
                        }
					/>
				)}
			}/>
    {/*Settings*/}
            <Route	exact path="/ManagerPanel/Settings/Branches/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить отдел"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"BranchForm"}
                        initialValues={{IdPos: "Не выбрано"}}
                        
                        InputForm={props.Manager.Branches.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(BranchesThunkCreator.Add(FormData, props.Common.CurrentBranch.Id));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Settings/Branches/Change" render={ () => 
				{
				return (
					<InputForm
						Title={"Изменить отдел"}
                        TextSubmit={"Изменить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"BranchForm"}
                        initialValues={props.Manager.Branches.InputForm.initialValues}
                        
                        InputForm={props.Manager.Branches.InputForm}
                        onSubmit={
                            (FormData) => {
                                console.log(FormData);
                                props.dispatch(BranchesThunkCreator.Change(FormData, props.Common.CurrentBranch.Id));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Settings/Branches" render={ () => 
				{
				return (
					<TableContent
						Title={"Отделы"}
						Table={props.Manager.Branches.Table}
                        
						Get={
							() => {
								props.dispatch(BranchesThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(BranchesAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(BranchesThunkCreator.Del(data, props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                tableToExcel(Table, "Branches", "Branches.xls");
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Settings/Images/Add" render={ () => 
				{
				return (
					<InputForm
						Title={"Добавить изображение"}
                        TextSubmit={"Добавить"}
                        goBack={()=>{props.history.goBack();}}
                        
                        form={"ImagesForm"}
                        initialValues={null}
                        
                        InputForm={props.Manager.Images.InputForm}
                        onSubmit={
                            (Data) => {
                                console.log(Data);
                                props.dispatch(ImagesThunkCreator.Add(Data, props.Common.CurrentBranch.Id));
                            }
                        }
					/>
				)}
			}/>
            <Route	exact path="/ManagerPanel/Settings/Images" render={ () => 
				{
				return (
					<TableContent
						Title={"Изображения"}
						Table={props.Manager.Images.Table}
                        
						Get={
							() => {
								props.dispatch(ImagesThunkCreator.Get(props.Common.CurrentBranch.Id));
							}
						}
                        Change={
                            (data) => {
                                console.log(data);
								props.dispatch(ImagesAC.setInitialValues(data));
							}
                        }
                        Del={
							(data) => {
                                console.log(data);
                                props.dispatch(ImagesThunkCreator.Del(data, props.Common.CurrentBranch.Id));
							}
						}
                        ExportTable={
                            (Table) => {
                                alert("Зачем вам таблица изображений?");
                            }
                        }
					/>
				)}
			}/>
		</div>
	);
}

let mapStateToProps = (state) => {
	return state;
}; 

let mapDispatchToProps = (dispatch) => {
	return {
		dispatch: dispatch
	}
};

let ManagerContentConteiner = withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagerContent));
export default ManagerContentConteiner;