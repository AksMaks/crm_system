let initialState = {
	LinkGroups:[
        {
            Links: [
                {Link: "/ManagerPanel/Statistics/Checks", Name: "Чеки"}
            ],
            Title: "Статистика",
            Key: "Statistics",
            Icon: "Statistics.svg"
        },
        {
            Links: [
                {Link: "/ManagerPanel/Menu/ComboBoxes", Name: "Наборы"},
                {Link: "/ManagerPanel/Menu/Products", Name: "Товары"},
                {Link: "/ManagerPanel/Menu/Dishes", Name: "Тех. карты"},
                {Link: "/ManagerPanel/Menu/CompoundIngredients", Name: "Полуфабрикаты"},
                {Link: "/ManagerPanel/Menu/Ingredients", Name: "Ингредиенты"},
                {Link: "/ManagerPanel/Menu/CategoriesProducts", Name: "Категории товаров и тех. карт"},
                {Link: "/ManagerPanel/Menu/Workshops", Name: "Места продажи"},
            ],
            Title: "Меню",
            Key: "Menu",
            Icon: "Menu.svg"
        },
        {
            Links: [
                {Link: "/ManagerPanel/Finance/Accounts", Name: "Счета"}
            ],
            Title: "Финансы",
            Key: "Finance",
            Icon: "Account.svg"
        },
        {
            Links: [
                {Link: "/ManagerPanel/Storage/Delivery", Name: "Поставки"},
                {Link: "/ManagerPanel/Storage/Cancellation", Name: "Списания"},
                {Link: "/ManagerPanel/Storage/Transfer", Name: "Перемещения"},
                {Link: "/ManagerPanel/Storage/Providers", Name: "Поставщики"}
            ],
            Title: "Склад",
            Key: "Storage",
            Icon: "Storage.svg"
        },
        {
            Links: [
                {Link: "/ManagerPanel/Access/WorkersList", Name: "Сотрудники"},
                {Link: "/ManagerPanel/Access/RoleListing", Name: "Должности"}
            ],
            Title: "Доступ",
            Key: "SettingsAccess",
            Icon: "Structure.svg"
        },
        {
            Links: [
                {Link: "/ManagerPanel/Settings/Branches", Name: "Отделы"},
                {Link: "/ManagerPanel/Settings/Images", Name: "Изображения товара"}
            ],
            Title: "Настройки",
            Key: "Settings",
            Icon: "Settings.svg"
        }
    ]
};

const NavBarReducer = (state = initialState ,action) => {
	let stateCopy = {...state};
	
	switch (action.type) {
		default:
			return stateCopy;
	}
}

export default NavBarReducer;
