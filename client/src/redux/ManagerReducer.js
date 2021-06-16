import {IngredientsAPI, comIngredientsAPI, tecCardsAPI, ComboBoxesAPI, RolesAPI, WorkersAPI, FinAccountsAPI, WorkshopsAPI, CategoriesProductsAPI, ProductsAPI, TecCardsAPI, ProvidersAPI, DeliveryAPI, CancellationAPI, TransferAPI, BranchesAPI, ImagesAPI, StatisticsAPI} from '../api/api.js';
import {NotificationsAC} from './NotificationsReducer.js';
import {request} from '../api/api.js';

let initialState = {
    Statistics: {
        Table:{
            Title: [
                {Name: "Дата", ColumnName: "Date", Visibility: true},
                {Name: "Работник", ColumnName: "Workman", Visibility: true},
                {Name: "Счет", ColumnName: "Account", Visibility: true},
                {Name: "Общая скидка",  ColumnName: "Discount", Visibility: true},
                {Name: "Общая стоимость", ColumnName: "Cost", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: false,
                Details: true,
                Change: false,
                Delete: false
            },
            Composition: {
                //стоблец по которому будет связываься состав и составной обьект
                linkColumn: "IdBuy",
                Title: [
                    {Name: "Название",  ColumnName: "NameItem", Visibility: true},
                    {Name: "Количество",  ColumnName: "Number", Visibility: true},
                    {Name: "Цена",  ColumnName: "Price", Visibility: true},
                    {Name: "Скидка",  ColumnName: "Discount", Visibility: true}
                ],
                Content: [
                ]
            }
        }
    },
    
    Ingredients: {
        InputForm: {
            initialValues: {},
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Barcode",
                    Explanations: "Штрихкод",
                    Type: "Text"
                },
                {
                    ItemName: "IdUnit",
                    Explanations: "Ед. измерения",
                    Type: "Select",
                    Options: []
                }
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Штрихкод", ColumnName: "Barcode", Visibility: false},
                {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                {Name: "Количество", ColumnName: "Number", Visibility: true},
                {Name: "Стоимость без налога", ColumnName: "Cost_not_tax", Visibility: false},
                {Name: "Стоимость с налогом", ColumnName: "Cost_with_tax", Visibility: false}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    ComIngredients: {
        InputForm: {
            initialValues: {
            },
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Barcode",
                    Explanations: "Штрихкод",
                    Type: "Text"
                },
                {
                    ItemName: "CookingProcess",
                    Explanations: "Процесс приготовления",
                    Type: "TextArea"
                },
                {
                    ItemName: "IdUnit",
                    Explanations: "Ед. измерения",
                    Type: "Select",
                    Options: []
                }
            ],
            FormComposition: {
                InitialObject: {IdItem: JSON.stringify({Name: "Не выбранно"}), Number: 0},
                Items: [
                    {
                        Title: "Наименование",
                        ItemName: "IdItem",
                        Type: "Select",
                        Visibility: true,
                        Options: [
                        ]
                    },
                    {
                        Title: "Количество",
                        ItemName: "Number",
                        Type: "Number",
                        Visibility: true
                    }
                ]
            }
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Штрихкод", ColumnName: "Barcode", Visibility: true},
                {Name: "Процесс приготовления",  ColumnName: "CookingProcess", Visibility: true},
                {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                {Name: "Количество", ColumnName: "Number", Visibility: true},
                {Name: "Стоимость без налога", ColumnName: "Cost_not_tax", Visibility: true},
                {Name: "Стоимость с налогом", ColumnName: "Cost_with_tax", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: true,
                Change: true,
                Delete: true
            },
            Composition: {
                //стоблец по которому будет связываься состав и составной обьект
                linkColumn: "IdProduct",
                Title: [
                    {Name: "Название ингредиента",  ColumnName: "NameItem"},
                    {Name: "Количество",  ColumnName: "Number"}
                ],
                Content: [
                ]
            }
        }
    },
    TecCards: {
        InputForm: {
            initialValues: {
            },
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Barcode",
                    Explanations: "Штрихкод",
                    Type: "Text"
                },
                {
                    ItemName: "IdCat",
                    Explanations: "Категория",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "IdWorkshop",
                    Explanations: "Место продажт",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "IdUnit",
                    Explanations: "Ед. измерения",
                    Type: "Select",
                    Options: []
                },
                {
                    ItemName: "CookingProcess",
                    Explanations: "Процесс приготовления",
                    Type: "TextArea"
                },
                {
                    ItemName: "Image",
                    Explanations: "Картинка",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "Price",
                    Explanations: "Цена",
                    Type: "Number"
                }
            ],
            FormComposition: {
                InitialObject: {IdItem: JSON.stringify({Name: "Не выбранно"}), Number: 0},
                Items: [
                    {
                        Title: "Наименование",
                        ItemName: "IdItem",
                        Type: "Select",
                        Visibility: true,
                        Options: [
                        ]
                    },
                    {
                        Title: "Количество",
                        ItemName: "Number",
                        Type: "Number",
                        Visibility: true
                    }
                ]
            }
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Штрихкод", ColumnName: "Barcode", Visibility: true},
                {Name: "Изображение", ColumnName: "Url", Visibility: true},
                {Name: "Категория", ColumnName: "NameCat", Visibility: true},
                {Name: "Отдел продажи", ColumnName: "NameWorkshop", Visibility: true},
                {Name: "Процесс приготовления", ColumnName: "CookingProcess", Visibility: true},
                {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                {Name: "Количество", ColumnName: "Number", Visibility: true},
                {Name: "Стоимость без налога", ColumnName: "Cost_not_tax", Visibility: true},
                {Name: "Стоимость с налогом", ColumnName: "Cost_with_tax", Visibility: true},
                {Name: "Цена продажи", ColumnName: "Price", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: true,
                Change: true,
                Delete: true
            },
            Composition: {
                //стоблец по которому будет связываься состав и составной обьект
                linkColumn: "IdProduct",
                Title: [
                    {Name: "Название ингредиента",  ColumnName: "NameItem"},
                    {Name: "Количество",  ColumnName: "Number"}
                ],
                Content: [
                ]
            }
        }
    },
    Products: {
        InputForm: {
            initialValues: {},
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Barcode",
                    Explanations: "Штрихкод",
                    Type: "Text"
                },
                {
                    ItemName: "IdCat",
                    Explanations: "Категория",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "IdWorkshop",
                    Explanations: "Место продажт",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "IdUnit",
                    Explanations: "Ед. измерения",
                    Type: "Select",
                    Options: []
                },
                {
                    ItemName: "Image",
                    Explanations: "Картинка",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "Price",
                    Explanations: "Цена",
                    Type: "Number"
                }
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Штрихкод", ColumnName: "Barcode", Visibility: true},
                {Name: "Изображение", ColumnName: "Url", Visibility: true},
                {Name: "Категория", ColumnName: "NameCat", Visibility: true},
                {Name: "Отдел продажи", ColumnName: "NameWorkshop", Visibility: true},
                {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                {Name: "Количество", ColumnName: "Number", Visibility: true},
                {Name: "Стоимость без налога", ColumnName: "Cost_not_tax", Visibility: true},
                {Name: "Стоимость с налогом", ColumnName: "Cost_with_tax", Visibility: true},
                {Name: "Цена продажи", ColumnName: "Price", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }  
    },
    ComboBoxes: {
        InputForm: {
            initialValues: {},
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Barcode",
                    Explanations: "Штрихкод",
                    Type: "Text"
                },
                {
                    ItemName: "IdCat",
                    Explanations: "Категория",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "IdWorkshop",
                    Explanations: "Место продажт",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "IdUnit",
                    Explanations: "Ед. измерения",
                    Type: "Select",
                    Options: []
                },
                {
                    ItemName: "Image",
                    Explanations: "Картинка",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "Price",
                    Explanations: "Цена",
                    Type: "Number"
                }
            ],
            FormComposition: {
                InitialObject: {IdItem: JSON.stringify({Name: "Не выбранно"}), Number: 0},
                Items: [
                    {
                        Title: "Наименование",
                        ItemName: "IdItem",
                        Type: "Select",
                        Visibility: true,
                        Options: [
                        ]
                    },
                    {
                        Title: "Количество",
                        ItemName: "Number",
                        Type: "Number",
                        Visibility: true
                    }
                ]
            }
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Штрихкод", ColumnName: "Barcode", Visibility: true},
                {Name: "Изображение", ColumnName: "Url", Visibility: true},
                {Name: "Категория", ColumnName: "NameCat", Visibility: true},
                {Name: "Отдел продажи", ColumnName: "NameWorkshop", Visibility: true},
                {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                {Name: "Количество", ColumnName: "Number", Visibility: true},
                {Name: "Стоимость без налога", ColumnName: "Cost_not_tax", Visibility: true},
                {Name: "Стоимость с налогом", ColumnName: "Cost_with_tax", Visibility: true},
                {Name: "Цена продажи", ColumnName: "Price", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: true,
                Change: true,
                Delete: true
            },
            Composition: {
                //стоблец по которому будет связываься состав и составной обьект
                linkColumn: "IdProduct",
                Title: [
                    {Name: "Наименование",  ColumnName: "NameItem"},
                    {Name: "Количество",  ColumnName: "Number"}
                ],
                Content: []
            }
        }
    },
    
    Workshops: {
        InputForm: {
            initialValues: {
                Id: null,
                Name: ""
            },
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                }
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    CategoriesProducts: {
        InputForm: {
            initialValues: {
                Id: null,
                Name: "",
                Base: "",
                Color: ""
            },
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Base",
                    Explanations: "Базовая категория",
                    Type: "Select",
                    Options: [
                    ]
                },
                {
                    ItemName: "Image",
                    Explanations: "Измображение",
                    Type: "Select",
                    Options: [
                    ]
                }
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Базовая категория", ColumnName: "BaseName", Visibility: true},
                {Name: "Изображение", ColumnName: "Url", Visibility: true},
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    
    Providers: {
        InputForm: {
            initialValues: {
                Id: null,
                Name: ""
            },
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "ACEO",
                    Explanations: "ОКПО",
                    Type: "Text"
                },
                {
                    ItemName: "ITN",
                    Explanations: "Налоговый номер",
                    Type: "Text"
                },
                {
                    ItemName: "Leader",
                    Explanations: "Руководитель",
                    Type: "Text"
                },
                {
                    ItemName: "ChiefAccountant",
                    Explanations: "Главный бугалтер",
                    Type: "Text"
                },
                {
                    ItemName: "Phone",
                    Explanations: "Номер телефона",
                    Type: "Phone"
                },
                {
                    ItemName: "Address",
                    Explanations: "Адресс организации",
                    Type: "TextArea"
                },
                {
                    ItemName: "Comment",
                    Explanations: "Коментарий",
                    Type: "TextArea"
                },
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "ОКПО", ColumnName: "ACEO", Visibility: true},
                {Name: "Налоговый номер", ColumnName: "ITN", Visibility: true},
                {Name: "Руководитель", ColumnName: "Leader", Visibility: true},
                {Name: "Главный бугалтер", ColumnName: "ChiefAccountant", Visibility: true},
                {Name: "Телефон", ColumnName: "Phone", Visibility: true},
                {Name: "Адрес", ColumnName: "Address", Visibility: true},
                {Name: "Комментарий", ColumnName: "Comment", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    Delivery: {
        InputForm: {
            FormMainItems: [
                {
                    ItemName: "Date",
                    Explanations: "Дата",
                    Type: "Date"
                },
                {
                    ItemName: "Provider",
                    Explanations: "Поставщик",
                    Type: "Select",
                    Options: []
                },
                {
                    ItemName: "FinAccount",
                    Explanations: "Счет для списания",
                    Type: "Select",
                    Options: []
                }
            ],
            FormComposition: {
                InitialObject: {IdItem: JSON.stringify({Name: "Не выбранно"}), Number: 0},
                Items: [
                    {
                        Title: "Наименование",
                        ItemName: "IdItem",
                        Type: "Select",
                        Visibility: true,
                        Options: []
                    },
                    {
                        Title: "Количество",
                        ItemName: "NumberItem",
                        Type: "Number",
                        Visibility: true
                    },
                    {
                        Title: "Цена за ед. товара",
                        ItemName: "PriceItem",
                        Type: "Number",
                        Visibility: true
                    },
                    {
                        Title: "Ставка НДС%",
                        ItemName: "TaxItem",
                        Type: "Number",
                        Visibility: true
                    },
                    {
                        Title: "Без оплаты",
                        ItemName: "NotPayment",
                        Type: "Checkbox",
                        Visibility: true
                    },
                    {
                        Title: "Оплата наличными",
                        ItemName: "CashPayment",
                        Type: "Checkbox",
                        Visibility: true
                    },
                    {
                        Title: "Комментарий",
                        ItemName: "CommentItem",
                        Type: "TextArea",
                        Visibility: true
                    }
                ]
            }
        },
        Table:{
            Title: [
                {Name: "Дата", ColumnName: "Date", Visibility: true},
                {Name: "Поставщик", ColumnName: "NameProvider", Visibility: true},
                {Name: "Фин счет", ColumnName: "NameFinAccount", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: true,
                Change: false,
                Delete: false
            },
            Composition: {
                //стоблец по которому будет связываься состав и составной обьект
                linkColumn: "IdDelivery",
                Title: [
                    {Name: "Название", ColumnName: "Name", Visibility: true},
                    {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                    {Name: "Номер измерения", ColumnName: "CUMUnit", Visibility: true},
                    {Name: "Цена за ед.товара с НДС", ColumnName: "PriceWithTax", Visibility: true},
                    {Name: "Стоимость с НДС", ColumnName: "CostWithTax", Visibility: true},
                    {Name: "Стовка НДС%", ColumnName: "Tax", Visibility: true},
                    {Name: "Количество", ColumnName: "Number", Visibility: true},
                    {Name: "Без оплаты", ColumnName: "NotPayment", Visibility: true},
                    {Name: "Оплата наличными", ColumnName: "CashPayment", Visibility: true},
                    {Name: "Комментарий", ColumnName: "Comment", Visibility: true}
                ],
                Content: []
            }
        }
    },
    Cancellation: {
        InputForm: {
            FormMainItems: [
                {
                    ItemName: "Date",
                    Explanations: "Дата",
                    Type: "Date"
                }
            ],
            FormComposition: {
                InitialObject: {IdItem: JSON.stringify({Name: "Не выбранно"}), Number: 0},
                Items: [
                    {
                        Title: "Наименование",
                        ItemName: "IdItem",
                        Type: "Select",
                        Visibility: true,
                        Options: []
                    },
                    {
                        Title: "Количество",
                        ItemName: "NumberItem",
                        Type: "Number",
                        Visibility: true
                    },
                    {
                        Title: "Комментарий",
                        ItemName: "CommentItem",
                        Type: "TextArea",
                        Visibility: true
                    }
                ]
            }
        },
        Table:{
            Title: [
                {Name: "Дата", ColumnName: "Date", Visibility: true},
                {Name: "Списывающий", ColumnName: "NameWorkman", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: true,
                Change: false,
                Delete: false
            },
            Composition: {
                //стоблец по которому будет связываься состав и составной обьект
                linkColumn: "IdCancellation",
                Title: [
                    {Name: "Название", ColumnName: "Name", Visibility: true},
                    {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                    {Name: "Номер измерения", ColumnName: "CUMUnit", Visibility: true},
                    {Name: "Количество", ColumnName: "Number", Visibility: true},
                    {Name: "Комментарий", ColumnName: "Comment", Visibility: true}
                ],
                Content: []
            }
        }
    },
    Transfer: {
        InputForm: {
            FormMainItems: [
                {
                    ItemName: "Date",
                    Explanations: "Дата",
                    Type: "Date"
                },
                {
                    ItemName: "Branch",
                    Explanations: "Куда передача",
                    Type: "Select",
                    Options: []
                }
            ],
            FormComposition: {
                InitialObject: {IdItem: JSON.stringify({Name: "Не выбранно"}), Number: 0},
                Items: [
                    {
                        Title: "Наименование",
                        ItemName: "IdItem",
                        Type: "Select",
                        Visibility: true,
                        Options: []
                    },
                    {
                        Title: "Количество",
                        ItemName: "NumberItem",
                        Type: "Number",
                        Visibility: true
                    },
                    {
                        Title: "Комментарий",
                        ItemName: "CommentItem",
                        Type: "TextArea",
                        Visibility: true
                    }
                ]
            }
        },
        Table:{
            Title: [
                {Name: "Дата", ColumnName: "Date", Visibility: true},
                {Name: "Работник", ColumnName: "NameWorkman", Visibility: true},
                {Name: "Отдал/Принял", ColumnName: "Type", Visibility: true},
                {Name: "Другой отдел", ColumnName: "Branch", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: true,
                Change: false,
                Delete: false
            },
            Composition: {
                //стоблец по которому будет связываься состав и составной обьект
                linkColumn: "IdTransfer",
                Title: [
                    {Name: "Название", ColumnName: "Name", Visibility: true},
                    {Name: "Ед. измерения", ColumnName: "NameUnit", Visibility: true},
                    {Name: "Номер измерения", ColumnName: "CUMUnit", Visibility: true},
                    {Name: "Количество", ColumnName: "Number", Visibility: true},
                    {Name: "Комментарий", ColumnName: "Comment", Visibility: true}
                ],
                Content: []
            }
        }
    },
    
    FinAccounts: {
        InputForm: {
            initialValues: {
                Id: null,
                Name: "",
                Type: null,
                Balanse: 0
            },
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Type",
                    Explanations: "Тип",
                    Type: "Select",
                    Options: [
                        {
                            Data: "Безналичный счет"
                        },
                        {
                            Data: "Банковская карта"
                        },
                        {
                            Data: "Наличные"
                        }
                    ]
                },
                {
                    ItemName: "Balance",
                    Explanations: "Баланса",
                    Type: "Number"
                },
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Тип", ColumnName: "Type", Visibility: true},
                {Name: "Баланса", ColumnName: "Balance", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    
    Roles: {
        InputForm: {
            initialValues: {
                Id: null,
                Name: ""
            },
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Cashbox",
                    Explanations: "Работа с кассой",
                    Type: "Checkbox"
                },
                {
                    ItemName: "Menu",
                    Explanations: "Доступ к меню",
                    Type: "Checkbox"
                },
                {
                    ItemName: "Storage",
                    Explanations: "Доступ к складу",
                    Type: "Checkbox"
                },
                {
                    ItemName: "Finance",
                    Explanations: "Доступ к финансам",
                    Type: "Checkbox"
                },
                {
                    ItemName: "SettingsAccess",
                    Explanations: "Настройки доступа",
                    Type: "Checkbox"
                },
                {
                    ItemName: "Settings",
                    Explanations: "Доступ к настройкам",
                    Type: "Checkbox"
                },
                
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Доступ", ColumnName: "AccessPrint", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    Workers: {
        InputForm: {
            initialValues: {},
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Login",
                    Explanations: "Логин",
                    Type: "Text"
                },
                {
                    ItemName: "Password",
                    Explanations: "Пароль",
                    Type: "Text"
                },
                {
                    ItemName: "Phone",
                    Explanations: "Телефон",
                    Type: "Phone"
                },
                {
                    ItemName: "IdPos",
                    Explanations: "Должность",
                    Type: "Select",
                    Options: [
                    ]
                }
            ]
        },
        Table:{
            Title: [
                {Name: "Имя", ColumnName: "Name", Visibility: true},
                {Name: "Телефон", ColumnName: "Phone", Visibility: true},
                {Name: "Должность", ColumnName: "NamePos", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    
    Branches: {
        InputForm: {
            initialValues: {},
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Address",
                    Explanations: "Штрихкод",
                    Type: "Text"
                }
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Адрес", ColumnName: "Address", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: true,
                Delete: true
            }
        }
    },
    Images: {
        InputForm: {
            initialValues: {},
            FormMainItems: [
                {
                    ItemName: "Name",
                    Explanations: "Название",
                    Type: "Text"
                },
                {
                    ItemName: "Image",
                    Explanations: "Изображение",
                    Type: "File"
                }
            ]
        },
        Table:{
            Title: [
                {Name: "Название", ColumnName: "Name", Visibility: true},
                {Name: "Изображение", ColumnName: "Url", Visibility: true}
            ],
            Content: [
            ],
            Config: {
                Add: true,
                Details: false,
                Change: false,
                Delete: true
            }
        }
    }
};

const ManagerReducer = (state = initialState, action) => {
	let stateCopy = {...state};
	
	switch (action.type) {
		case "SET_DATA_Statistics":{
			stateCopy.Statistics.Table.Content = Object.values(action.data.Checks);
            stateCopy.Statistics.Table.Composition.Content = Object.values(action.data.composition);
            return stateCopy;
		}
        
        case "SET_DATA_ING":{
			stateCopy.Ingredients.Table.Content = Object.values(action.data.ingredients);
            stateCopy.Ingredients.InputForm.FormMainItems[2].Options = Object.values(action.data.units).map((el)=>{
                return {Key: el.Id, Data: el.Name}
            });
			Object.values(stateCopy.Ingredients.Table.Content).forEach(el => {
				el["Id"] = parseInt(el["Id"]);
			});
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_ING":{
			stateCopy.Ingredients.InputForm.initialValues = {...action.data};
            return stateCopy;
		}
            
        case "SET_DATA_COM_ING":{
            stateCopy.ComIngredients.InputForm.FormComposition.Items[0].Options = [
                ...Object.values(action.data.ingredients).map((el)=>{
                    return {
                        Key: {Id: el.Id, Type: "I", Name: el.Name + " (инг)"},
                        Data: el.Name+"," + " (инг)"}
                })
            ];
            stateCopy.ComIngredients.InputForm.FormMainItems[3].Options = Object.values(action.data.units).map((el)=>{
                return {Key: el.Id, Data: el.Name}
            });
			stateCopy.ComIngredients.Table.Content = Object.values(action.data.com_ingredients);
			Object.values(stateCopy.ComIngredients.Table.Content).forEach(el => {
				el["Id"] = parseInt(el["Id"]);
                el["Details"] = false;
			});
            stateCopy.ComIngredients.Table.Composition.Content = action.data.composition.map(el => {
                el = {...el, Type: "I", Id: el.IdItem};
                //delete el.id_ingredient;
                return el;
            });
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_COM_ING":{
            console.log(action.data);
			stateCopy.ComIngredients.InputForm.initialValues = {...action.data};
            stateCopy.ComIngredients.InputForm.initialValues.Unit = (action.data.Unit)? action.data.Unit: "Не выбрано";
            stateCopy.ComIngredients.InputForm.initialValues.Composition = action.data.Composition.map(el=>{
                return ({IdItem: JSON.stringify({Id: el.Id, Type: el.Type, Name: el.NameItem}), Number: el.Number});
            });
			return stateCopy;
		}
            
        case "SET_DATA_TEC_CARDS":{
            stateCopy.TecCards.InputForm.FormMainItems[2].Options = Object.values(action.data.categories).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.TecCards.InputForm.FormMainItems[3].Options = Object.values(action.data.workshops).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.TecCards.InputForm.FormMainItems[4].Options = Object.values(action.data.units).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.TecCards.InputForm.FormMainItems[6].Options = Object.values(action.data.images).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            
            stateCopy.TecCards.InputForm.FormComposition.Items[0].Options = [
                ...Object.values(action.data.ingredients).map((el)=>{
                    return {
                        Key: {Id: el.Id, Type: "I", Name: el.Name+"," + " (инг)"},
                        Data: el.Name+"," + " (инг)"}
                }),
                ...Object.values(action.data.com_ingredients).map((el)=>{
                    return {
                        Key: {Id: el.Id, Type: "CI", Name: el.Name+"," + " (п/ф)"},
                        Data: el.Name+"," + " (п/ф)"}
                })
            ];
            
			stateCopy.TecCards.Table.Content = Object.values(action.data.technical_cards);
			Object.values(stateCopy.TecCards.Table.Content).forEach(el => {
				el["Id"] = parseInt(el["Id"]);
                el["Details"] = false;
			});
            
            stateCopy.TecCards.Table.Composition.Content = Object.values(action.data.composition).map(el=>{
                return { ...el, Type: (el.IdTypeItem == 2)? "CI" : "I", Id: el.IdItem}
            });
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_TEC_CARDS":{
			stateCopy.TecCards.InputForm.initialValues = {...action.data};
            stateCopy.TecCards.InputForm.initialValues.Unit = (action.data.Unit)? action.data.Unit: "Не выбрано";
            stateCopy.TecCards.InputForm.initialValues.IdCat = (action.data.IdCat)? action.data.IdCat: "Не выбрано";
            stateCopy.TecCards.InputForm.initialValues.IdWorkshop = (action.data.IdWorkshop)? action.data.IdWorkshop: "Не выбрано";
            stateCopy.TecCards.InputForm.initialValues.Image = (action.data.Image)? action.data.Image: "Не выбрано";
            stateCopy.TecCards.InputForm.initialValues.Composition = action.data.Composition.map(el=>{
                return (
                    {
                        IdItem: JSON.stringify({Id: el.Id, Type: el.Type, Name: el.NameItem}), Number: el.Number
                    }
                );
            });
			return stateCopy;
		}
            
        case "SET_DATA_PRODUCTS":{
            stateCopy.Products.InputForm.FormMainItems[2].Options = Object.values(action.data.categories).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.Products.InputForm.FormMainItems[3].Options = Object.values(action.data.workshops).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.Products.InputForm.FormMainItems[4].Options = Object.values(action.data.units).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.Products.InputForm.FormMainItems[5].Options = Object.values(action.data.images).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
			stateCopy.Products.Table.Content = Object.values(action.data.products);
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_PRODUCTS":{
			stateCopy.Products.InputForm.initialValues = {...action.data};
            stateCopy.Products.InputForm.initialValues.Unit = (action.data.Unit)? action.data.Unit: "Не выбрано";
            stateCopy.Products.InputForm.initialValues.IdCat = (action.data.IdCat)? action.data.IdCat: "Не выбрано";
            stateCopy.Products.InputForm.initialValues.IdWorkshop = (action.data.IdWorkshop)? action.data.IdWorkshop: "Не выбрано";
            stateCopy.Products.InputForm.initialValues.Image = (action.data.Image)? action.data.Image: "Не выбрано";
			return stateCopy;
		}
            
        case "SET_DATA_COMBO_BOXES":{
            stateCopy.ComboBoxes.InputForm.FormMainItems[2].Options = Object.values(action.data.categories).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.ComboBoxes.InputForm.FormMainItems[3].Options = Object.values(action.data.workshops).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.ComboBoxes.InputForm.FormMainItems[4].Options = Object.values(action.data.units).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            stateCopy.ComboBoxes.InputForm.FormMainItems[5].Options = Object.values(action.data.images).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            
            stateCopy.ComboBoxes.InputForm.FormComposition.Items[0].Options = [
                ...Object.values(action.data.products).map((el)=>{
                    return {
                        Key: {Id: el.Id, Type: "P", Name: el.Name+"," + " (товар)"},
                        Data: el.Name+"," + " (товар)"}
                }),
                ...Object.values(action.data.technical_cards).map((el)=>{
                    return {
                        Key: {Id: el.Id, Type: "T", Name: el.Name+"," + " (тех карта)"},
                        Data: el.Name+"," + " (тех карта)"}
                })
            ];
            
			stateCopy.ComboBoxes.Table.Content = Object.values(action.data.combo);
			Object.values(stateCopy.ComboBoxes.Table.Content).forEach(el => {
				el["Id"] = parseInt(el["Id"]);
                el["Details"] = false;
			});
            
            stateCopy.ComboBoxes.Table.Composition.Content = Object.values(action.data.composition).map(el=>{
                return { ...el, Type: (el.IdTypeItem == 4)? "P" : "T", Id: el.IdItem}
            });
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_COMBO_BOXES":{
			stateCopy.ComboBoxes.InputForm.initialValues = {...action.data};
            stateCopy.ComboBoxes.InputForm.initialValues.Unit = (action.data.Unit)? action.data.Unit: "Не выбрано";
            stateCopy.ComboBoxes.InputForm.initialValues.IdCat = (action.data.IdCat)? action.data.IdCat: "Не выбрано";
            stateCopy.ComboBoxes.InputForm.initialValues.IdWorkshop = (action.data.IdWorkshop)? action.data.IdWorkshop: "Не выбрано";
            stateCopy.ComboBoxes.InputForm.initialValues.Image = (action.data.Image)? action.data.Image: "Не выбрано";
            stateCopy.ComboBoxes.InputForm.initialValues.Composition = action.data.Composition.map(el=>{
                return ({IdItem: JSON.stringify({Id: el.Id, Type: el.Type, Name: el.NameItem}), Number: el.Number});
            });
			return stateCopy;
		}
            
		case "SET_DATA_WORKSHOPS":{
			stateCopy.Workshops.Table.Content = Object.values(action.data.workshops);
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_WORKSHOPS":{
			stateCopy.Workshops.InputForm.initialValues = {...action.data};
            return stateCopy;
		}
            
        case "SET_DATA_CAT_PRODUCTS":{
			stateCopy.CategoriesProducts.Table.Content = Object.values(action.data.categories);
            stateCopy.CategoriesProducts.InputForm.FormMainItems[1].Options = Object.values(action.data.categories).map(el =>{
                return {Key: el.Id, Data: el.Name};
            })
            stateCopy.CategoriesProducts.InputForm.FormMainItems[2].Options = Object.values(action.data.images).map(el =>{
                return {Key: el.Id, Data: el.Name};
            })
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_CAT_PRODUCTS":{
			stateCopy.CategoriesProducts.InputForm.initialValues = {...action.data};
            stateCopy.CategoriesProducts.InputForm.initialValues.Base = (action.data.Base)? action.data.Base: "Не выбрано";
            stateCopy.CategoriesProducts.InputForm.initialValues.Image = (action.data.Image)? action.data.Image: "Не выбрано";
            return stateCopy;
		}
        //////////
        
        //////////
		case "SET_DATA_PROVIDERS":{
			stateCopy.Providers.Table.Content = Object.values(action.data.providers);
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_PROVIDERS":{
			stateCopy.Providers.InputForm.initialValues = {...action.data};
            return stateCopy;
		}
        
		case "SET_DATA_DELIVERY":{
            stateCopy.Delivery.InputForm.FormMainItems[1].Options = Object.values(action.data.providers).map((el)=>{
                    return {Key: el.Name, Data: el.Name}
                });
            stateCopy.Delivery.InputForm.FormMainItems[2].Options = Object.values(action.data.finance_accounts).map((el)=>{
                    return {Key: JSON.stringify({Id: el.Id, Name: el.Name}), Data: el.Name}
                });
            
            stateCopy.Delivery.InputForm.FormComposition.Items[0].Options = [
                ...Object.values(action.data.products).map((el)=>{
                    return {
                        Key: {Id: el.Id, Name: el.Name, IdUnit: el.IdUnit},
                        Data: el.Name + ", (" +el.NameUnit + ")"}
                })
            ];
            
            stateCopy.Delivery.Table.Content = Object.values(action.data.delivery);
            
            stateCopy.Delivery.Table.Composition.Content = Object.values(action.data.composition).map(el=>{
                return {
                    ...el, 
                    PriceWithTax: el.Price * (100+parseFloat(el.Tax))/100,
                    CostWithTax: (el.Price * (100+parseFloat(el.Tax))/100) * el.Number,
                    NotPayment: el.NotPayment? "Да": "Нет",
                    CashPayment: el.CashPayment? "Да": "Нет"
                }
            });
            return stateCopy;
		}
		case "SET_DATA_CANCELLATION":{
            stateCopy.Cancellation.InputForm.FormComposition.Items[0].Options = [
                ...Object.values(action.data.products).map((el)=>{
                    return {
                        Key: {Id: el.Id, Name: el.Name, IdUnit: el.IdUnit, IdType: el.IdType},
                        Data: el.Name + ", (" +el.NameUnit + ")"}
                })
            ];
            
            stateCopy.Cancellation.Table.Content = Object.values(action.data.cancellation);
            
            stateCopy.Cancellation.Table.Composition.Content = Object.values(action.data.composition).map(el=>{
                return {
                    ...el
                }
            });
            return stateCopy;
		}
		case "SET_DATA_TRANSFER":{
            stateCopy.Transfer.InputForm.FormMainItems[1].Options = Object.values(action.data.Branches).map((el)=>{
                    return {Key: el.Id, Data: el.Name}
                });
            
            stateCopy.Transfer.InputForm.FormComposition.Items[0].Options = [
                ...Object.values(action.data.products).map((el)=>{
                    return {
                        Key: {Id: el.Id, Name: el.Name, IdUnit: el.IdUnit},
                        Data: el.Name + ", (" +el.NameUnit + ")"}
                })
            ];
            
            stateCopy.Transfer.Table.Content = Object.values(action.data.transfer);
            
            stateCopy.Transfer.Table.Composition.Content = Object.values(action.data.composition).map(el=>{
                return {
                    ...el
                }
            });
            return stateCopy;
		}
        
        //////////
            
        //////////
        case "SET_DATA_ROLES":{
			stateCopy.Roles.Table.Content = Object.values(action.data.WorkmanPosition);
            
			Object.values(stateCopy.Roles.Table.Content).forEach(el => {
				el["Id"] = parseInt(el["Id"]);
                let tempAccess = "";
                if(el.Access === null){
                    tempAccess += "All";
                }else{
                    if(el.Access.Cashbox) tempAccess += " Касса,";
                    if(el.Access.Menu) tempAccess += " Меню,";
                    if(el.Access.Storage) tempAccess += " Склад,";
                    if(el.Access.Finance) tempAccess += " Финансы,";
                    if(el.Access.SettingsAccess) tempAccess += " Настройки доступа,";
                    if(el.Access.Settings) tempAccess += " Настройки,";
                }
                el.AccessPrint = tempAccess;
			});
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_ROLES":{
			stateCopy.Roles.InputForm.initialValues = {...action.data};
            return stateCopy;
		}
            
        case "SET_DATA_WORKERS":{
			stateCopy.Workers.Table.Content = Object.values(action.data.Workers);
            stateCopy.Workers.InputForm.FormMainItems[4].Options = Object.values(action.data.Positions).map(el => {
                return {Key: el.Id, Data: el.Name};
            });
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_WORKERS":{
			stateCopy.Workers.InputForm.initialValues = {...action.data};
            return stateCopy;
		}
        ///////////
        
        //////////
		case "SET_DATA_FIN_ACC":{
			stateCopy.FinAccounts.Table.Content = Object.values(action.data.finance_accounts);
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_FIN_ACC":{
			stateCopy.FinAccounts.InputForm.initialValues = {...action.data};
            return stateCopy;
		}
        //////////
            
        //////////
		case "SET_DATA_Branches":{
			stateCopy.Branches.Table.Content = Object.values(action.data.Branches);
            return stateCopy;
		}
        case "SET_INITIAL_VALUES_Branches":{
			stateCopy.Branches.InputForm.initialValues = {...action.data};
            return stateCopy;
		}
        
        
		case "SET_DATA_Images":{
			stateCopy.Images.Table.Content = Object.values(action.data.Images);
            return stateCopy;
		}
		default:{
			return stateCopy;
		}
	}
}

export const StatisticsAC = {
    setData: (data) => {
        return {type: "SET_DATA_Statistics", data: data};
    }
}
export const StatisticsThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            StatisticsAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(StatisticsAC.setData(data));
                }
            });
        }
    }
}
////////////

////////////
export const IngredientsAC = {
    setData: (data) => {
        return {type: "SET_DATA_ING", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_ING", data: data};
    }
}
export const ComIngredientsAC = {
    setData: (data) => {
        return {type: "SET_DATA_COM_ING", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_COM_ING", data: data};
    }
}
export const TecCardsAC = {
    setData: (data) => {
        return {type: "SET_DATA_TEC_CARDS", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_TEC_CARDS", data: data};
    }
}
export const ProductsAC = {
    setData: (Data) => {
        return {type: "SET_DATA_PRODUCTS", data: Data};
    },
    setInitialValues: (Data) => {
        return {type: "SET_INITIAL_VALUES_PRODUCTS", data: Data};
    }
}
export const ComboBoxesAC = {
    setData: (data) => {
        return {type: "SET_DATA_COMBO_BOXES", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_COMBO_BOXES", data: data};
    }
}
export const ProductsThunkCreator = {
    Get: (IdBranch, Type) => {
        return (dispatch) => {
            ProductsAPI("Get", null, IdBranch, null, Type).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    if(Type == 1) dispatch(IngredientsAC.setData(data));
                    if(Type == 2) dispatch(ComIngredientsAC.setData(data));
                    if(Type == 3) dispatch(TecCardsAC.setData(data));
                    if(Type == 4) dispatch(ProductsAC.setData(data));
                    if(Type == 5) dispatch(ComboBoxesAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch, Workman, Type) => {
        return (dispatch) => {
            ProductsAPI("Add", Data, IdBranch, Workman, Type).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Change: (Data, IdBranch, Workman, Type) => {
        return (dispatch) => {
            ProductsAPI("Change", Data, IdBranch, Workman, Type).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Del: (Data, IdBranch, Workman, Type) => {
        return (dispatch) => {
            ProductsAPI("Del", Data, IdBranch, Workman, Type).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
}

///////////////
export const CategoriesProductsAC = {
    setData: (data) => {
        return {type: "SET_DATA_CAT_PRODUCTS", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_CAT_PRODUCTS", data: data};
    }
}
export const CategoriesProductsThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            CategoriesProductsAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(CategoriesProductsAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch) => {
        return (dispatch) => {
            CategoriesProductsAPI("Add", Data, IdBranch).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Change: (Data, IdBranch) => {
        return (dispatch) => {
            CategoriesProductsAPI("Change", Data, IdBranch).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Del: (Data, IdBranch) => {
        return (dispatch) => {
            CategoriesProductsAPI("Del", Data, IdBranch).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                    CategoriesProductsAPI("Get", null, IdBranch).then((data) => {
                        if(data.ERROR){
                            dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                        }else{
                            dispatch(CategoriesProductsAC.setData(data));
                        }
                    });
                }
            });
        }
    },
}

export const WorkshopsAC = {
    setData: (data) => {
        return {type: "SET_DATA_WORKSHOPS", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_WORKSHOPS", data: data};
    }
}
export const WorkshopsThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            WorkshopsAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(WorkshopsAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            WorkshopsAPI("Add", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Change: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            WorkshopsAPI("Change", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Del: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            WorkshopsAPI("Del", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                    WorkshopsAPI("Get", null, IdBranch).then((data) => {
                        if(data.ERROR){
                            dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                        }else{
                            dispatch(WorkshopsAC.setData(data));
                        }
                    });
                }
            });
        }
    },
}
////////////

////////////
export const ProvidersAC = {
    setData: (data) => {
        return {type: "SET_DATA_PROVIDERS", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_PROVIDERS", data: data};
    }
}
export const ProvidersThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            ProvidersAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(ProvidersAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch) => {
        return (dispatch) => {
            ProvidersAPI("Add", Data, IdBranch).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                    ProvidersAPI("Get", null, IdBranch).then((data) => {
                    if(data.ERROR){
                            dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                        }else{
                            dispatch(ProvidersAC.setData(data));
                        }
                    });
                }
            });
        }
    },
    Change: (Data, IdBranch) => {
        return (dispatch) => {
            ProvidersAPI("Change", Data, IdBranch).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                    ProvidersAPI("Get", null, IdBranch).then((data) => {
                    if(data.ERROR){
                            dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                        }else{
                            dispatch(ProvidersAC.setData(data));
                        }
                    });
                }
            });
        }
    },
    Del: (Data, IdBranch) => {
        return (dispatch) => {
            ProvidersAPI("Del", Data, IdBranch).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                    ProvidersAPI("Get", null, IdBranch).then((data) => {
                    if(data.ERROR){
                            dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                        }else{
                            dispatch(ProvidersAC.setData(data));
                        }
                    });
                }
            });
        }
    }
}

export const DeliveryAC = {
    setData: (data) => {
        return {type: "SET_DATA_DELIVERY", data: data};
    }
}
export const DeliveryThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            DeliveryAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(DeliveryAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            DeliveryAPI("Add", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    }
}

export const CancellationAC = {
    setData: (data) => {
        return {type: "SET_DATA_CANCELLATION", data: data};
    }
}
export const CancellationThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            CancellationAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(CancellationAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            CancellationAPI("Add", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    }
}


export const TransferAC = {
    setData: (data) => {
        return {type: "SET_DATA_TRANSFER", data: data};
    }
}
export const TransferThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            TransferAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(TransferAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            TransferAPI("Add", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    }
}
////////////

////////////
export const FinAccountsAC = {
    setData: (data) => {
        return {type: "SET_DATA_FIN_ACC", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_FIN_ACC", data: data};
    }
}
export const FinAccountsThunkCreator = {
    Get: (IdBranch) => {
        return (dispatch) => {
            FinAccountsAPI("Get", null, IdBranch).then((data) => {
                if(data.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                }else{
                    dispatch(FinAccountsAC.setData(data));
                }
            });
        }
    },
    Add: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            FinAccountsAPI("Add", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Change: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            FinAccountsAPI("Change", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                }
            });
        }
    },
    Del: (Data, IdBranch, Workman) => {
        return (dispatch) => {
            FinAccountsAPI("Del", Data, IdBranch, Workman).then((response) => {
                if(response.ERROR){
                    dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: response.ERROR}));
                }else{
                    dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.Message}));
                    FinAccountsAPI("Get", null, IdBranch).then((data) => {
                        if(data.ERROR){
                            dispatch(NotificationsAC.SetNotification({Type: "ERROR", Message: data.ERROR}));
                        }else{
                            dispatch(FinAccountsAC.setData(data));
                        }
                    });
                }
            });
        }
    },
}
////////////

////////////
export const RolesAC = {
    setData: (data) => {
        return {type: "SET_DATA_ROLES", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_ROLES", data: data};
    }
}
export const RolesThunkCreator = {
  Get: (IdBranch) => {
    return (dispatch) => {
      request("/WorkmanPosition/Get", null, IdBranch).then((data) => {
        dispatch(RolesAC.setData(data));
      });
    }
  },
  Add: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/WorkmanPosition/Insert", {Data: Data, IdBranch: IdBranch, Workman: Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
      });
    }
  },
  Change: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/WorkmanPosition/Update", {Data: Data, IdBranch: IdBranch, Workman: Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
      });
    }
  },
  Del: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/WorkmanPosition/Delete", {Data: Data, IdBranch: IdBranch, Workman: Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
        request("/WorkmanPosition/Get", null, IdBranch).then((data) => {
          dispatch(RolesAC.setData(data));
        });
      });
    }
  }
}

export const WorkersAC = {
    setData: (data) => {
        return {type: "SET_DATA_WORKERS", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_WORKERS", data: data};
    }
}
export const WorkersThunkCreator = {
  Get: (IdBranch) => {
    return (dispatch) => {
      request("/Workman/Get", null, IdBranch).then((response) => {
        dispatch(WorkersAC.setData(response));
      });
    }
  },
  Add: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/Workman/Insert", {Data: Data, IdBranch: IdBranch, Workman:Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
      });
    }
  },
  Change: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/Workman/Update", {Data: Data, IdBranch: IdBranch, Workman:Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
      });
    }
  },
  Del: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/Workman/Delete", {Data: Data, IdBranch: IdBranch, Workman:Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
        request("/Workman/Get", null, IdBranch).then((response) => {
          dispatch(WorkersAC.setData(response));
        });
      });
    }
  }
}
/////////////////

////////////
export const BranchesAC = {
    setData: (data) => {
        return {type: "SET_DATA_Branches", data: data};
    },
    setInitialValues: (data) => {
        return {type: "SET_INITIAL_VALUES_Branches", data: data};
    }
}
export const BranchesThunkCreator = {
  Get: (IdBranch) => {
    return (dispatch) => {
      request("/Branches/Get", {IdBranch: IdBranch}).then((data) => {
        dispatch(BranchesAC.setData(data));
      });
    }
  },
  Add: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/Branches/Insert", {Data: Data, IdBranch: IdBranch, Workman: Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
      });
    }
  },
  Change: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/Branches/Update", {Data: Data, IdBranch: IdBranch, Workman: Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
      });
    }
  },
  Del: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/Branches/Delete", {Data: Data, IdBranch: IdBranch, Workman: Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
        request("/Branches/Get", {IdBranch: IdBranch}).then((data) => {
          dispatch(BranchesAC.setData(data));
        });
      });
    }
  }
}

export const ImagesAC = {
    setData: (data) => {
        return {type: "SET_DATA_Images", data: data};
    }
}
export const ImagesThunkCreator = {
  Get: (IdBranch) => {
    return (dispatch) => {
      request("/Images/Get", {IdBranch: IdBranch}).then((data) => {
        dispatch(ImagesAC.setData(data));
      })
    }
  },
  Add: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      
      let form = new FormData()
      form.append("Image", Data.Image)
      form.append("Name", Data.Name)
      
      request("/Images/Insert", form).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
      })
    }
  },
  Del: (Data, IdBranch, Workman) => {
    return (dispatch) => {
      request("/Images/Delete", {Data: Data, IdBranch: IdBranch, Workman: Workman}).then((response) => {
        dispatch(NotificationsAC.SetNotification({Type: "Message", Message: response.message}));
        request("/Images/Get", {IdBranch: IdBranch}).then((data) => {
          dispatch(ImagesAC.setData(data));
        });
      });
    }
  },
}

export default ManagerReducer;

