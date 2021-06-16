import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export async function createPdf(List, Cost, Discount) {
    var docDefinition = {
        pageSize: {
            width: 300,
            height: 'auto'
          },
        content: [
            "Чек",
            {
                layout: "noBorders",
                table: {
                    body: [
                        [ 'Название', 'Кол-во', 'Цена', 'Итого' ],
                    ]
              }
            }
        ]
    }
    List.forEach(el => {
        docDefinition.content[1].table.body.push([el.Name, el.Number, el.Price, el.Price * el.Number]);
    });
    docDefinition.content.push("Скидка: " + Discount + "%");
    docDefinition.content.push("К оплате: " + Cost + "p");
    
    
    pdfMake.createPdf(docDefinition).open();
}
        