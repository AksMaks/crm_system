import * as axios from 'axios';

const instance = axios.create({
	baseURL: "/api"
});

export const request = (Url, Data) => {
	return (
        instance.post(Url, Data)
        .then((response) => {
          return response.data;
        })
    );
}

///////////////////////////
export const LoginAPI = (Fun, Data) => {
	return (
        instance.post("Login.php",{Func: Fun, SqlData: Data})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })
    );
}

export const CashboxAPI = (Fun, Data, IdBranch, WorkMan, Type) => {
	return (
        instance.post("Cashbox.php",{Func: Fun, SqlData: Data, Branch: IdBranch, WorkMan: WorkMan, Type: Type})
        .then((response) => {
            return response.data;
        }).catch(error => {
            return error;
        })
    );
}

/////////////////////
export const StatisticsAPI = (Fun, Data, IdBranch, WorkMan) => {
    return (
        instance.post("Statistics.php",{Func: Fun, Branch: IdBranch, SqlData: Data, WorkMan: WorkMan})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}

/////////////////////
export const IngredientsAPI = (Fun, Data, IdBranch, WorkMan) => {
    return (
        instance.post("Ingredients.php",{Func: Fun, Branch: IdBranch, SqlData: Data, WorkMan: WorkMan})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}
export const comIngredientsAPI = (Fun, Data, IdBranch, WorkMan) => {
    return (
        instance.post("Compound_ingredients.php",{Func: Fun, Branch: IdBranch, SqlData: Data, WorkMan: WorkMan})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })
    );
}
export const TecCardsAPI = (Fun, Data, IdBranch, WorkMan) => {
    return (
        instance.post("technical_card.php",{Func: Fun, Branch: IdBranch, SqlData: Data, WorkMan: WorkMan})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}

export const ProductsAPI = (Fun, Data, IdBranch, WorkMan, type) => {
    return (
        instance.post("Products.php",{Func: Fun, Branch: IdBranch, SqlData: Data, Type: type})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}

export const ComboBoxesAPI = (Fun, Data, IdBranch, WorkMan) => {
    return (
        instance.post("ComboProducts.php",{Func: Fun, Branch: IdBranch, SqlData: Data, WorkMan: WorkMan})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}

export const WorkshopsAPI = (Fun, Data, IdBranch, WorkMan) => {
    return (
        instance.post("Workshops.php",{Func: Fun, Branch: IdBranch, SqlData: Data, WorkMan: WorkMan})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}
export const CategoriesProductsAPI = (Fun, Data, IdBranch, WorkMan) => {
    return (
        instance.post("Categories.php",{Func: Fun, Branch: IdBranch, SqlData: Data, WorkMan: WorkMan})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}
///////////////////

///////////////////
export const ProvidersAPI = (Fun, Data, IdBranch) => {
    return (
        instance.post("Providers.php",{Func: Fun, Branch: IdBranch, SqlData: Data})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}
export const DeliveryAPI = (Fun, Data, IdBranch, Workman) => {
    return (
        instance.post("Delivery.php",{Func: Fun, Branch: IdBranch, SqlData: Data, Workman: Workman})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}
export const CancellationAPI = (Fun, Data, IdBranch, Workman) => {
    return (
        instance.post("Cancellation.php",{Func: Fun, Branch: IdBranch, SqlData: Data, Workman: Workman})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })        
    );
}

export const TransferAPI = (Fun, Data, IdBranch, Workman) => {
    return (
        instance.post("Transfer.php",{Func: Fun, Branch: IdBranch, SqlData: Data, Workman: Workman})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })        
    );
}
///////////////////

///////////////////
export const FinAccountsAPI = (Fun, Data, IdBranch) => {
    return (
        instance.post("Finance_Account.php",{Func: Fun, Branch: IdBranch, SqlData: Data})
        .then((response) => {
            return response.data;
        }).catch(error => {
            return error;
        })         
    );
}
///////////////////

///////////////////
export const RolesAPI = (Fun, Data, IdBranch) => {
    return (
        instance.post("Workman_Position.php",{Func: Fun, Branch: IdBranch, SqlData: Data})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}
export const WorkersAPI = (Fun, Data, IdBranch) => {
    return (
        instance.post("Workman.php",{Func: Fun, Branch: IdBranch, SqlData: Data})
        .then((response) => {
            return response.data;
        }).catch(error => {
            return error;
        })         
    );
}
///////////////////

export const BranchesAPI = (Fun, Data, IdBranch) => {
    return (
        instance.post("Branches.php",{Func: Fun, Branch: IdBranch, SqlData: Data})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })         
    );
}

export const ImagesAPI = (Fun, Data, IdBranch) => {
    if(Fun === "Add"){
        const formData = new FormData();
        formData.append('Name', Data["Name"]);
        formData.append('file', Data["Image"]);
        
        return (
            fetch("http://crm-api-react//Api/0.2/ImagesAdd.php", {
                method: 'POST',
                body: formData,
            }).then((response) => {
                return response.data;
            }).catch(error => {
                alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
                window.location = "/";
            })
        );
    }
    return (
        instance.post("Images.php",{Func: Fun, Branch: IdBranch, SqlData: Data})
        .then((response) => {
            return response.data;
        }).catch(error => {
            alert("Ошибка. Нет связи с сервером. Проверте соединение с сервером или обратитесь к администратору.");
            window.location = "/";
        })
    );
   
}

