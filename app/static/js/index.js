
// Iniciacilizacion de la tabla para ingredar datos

const container = document.querySelector('#temas');
const dataTable = new Handsontable(container, {
  data: [],
  dataSchema: { id: null, name: { first: null, last: null }, address: null },
  startRows: 5,
  startCols: 4,
  colHeaders: ['Tema', 'Número Min de Páginas', 'Número Max de Páginas', 'Número de Lectores'],
  height: 'auto',
  width: '100%',
  colWidths: [200, 200, 200,200],
  rowHeights: 40,
  columns: [
    { data: 'id' },
    { data: 'name.first' },
    { data: 'name.last' },
    { data: 'address' }
  ],
  minSpareRows: 1,
  licenseKey: 'non-commercial-and-evaluation'
});


//Se toman los datos del formulario y de la tabla
$("#solve").click(function(e) {

    //Para que no se recarge la pagina cuando se envia los datos del formulario
    e.preventDefault()

    //Se obtiene la data de la tabla
    const gridData = dataTable.getData();

    //Se crea una variable para almacenar la data limpia
    let cleanedGridData = {};


    //Se recorre el grid para tomar los datos del grid
    $.each(gridData, function (rowKey, object) {
        if (!dataTable.isEmptyRow(rowKey)) {
            let row = object.filter((elem) => elem);
            cleanedGridData[rowKey] = row;
        }
    });

    //Se organiza la data que se va a despachar en la peticion
    let data = {
        n:Object.values(cleanedGridData).length,
        minPag: Object.values(cleanedGridData).map(topic => topic[1]),
        maxPag: Object.values(cleanedGridData).map(topic => topic[2]),
        pr:Object.values(cleanedGridData).map(topic => topic[3]),
        P: $("#inputPages").val(),
        lectores: Object.values(cleanedGridData),
        pagTema: Object.values(cleanedGridData).map(topic => topic[3]),
        
        
    }

    $.ajax({
        url: "/solve",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (data) {
          console.log(data);
          if (data.message) {
            alert("Insatisfactible!");
          } else {

            console.log(data)

            /* // Matriz de datos
            let mw = data.data.MW;
            // Inicializar tabla de resultados
            let dias = $("#nd").val();
            initTableResults(dias, mw);
            // Mostrar costo minimo
            $("#costo").text(data.data.costo);
            // Mostrar contenedor de resultados
            $(".container_results").show();
            // Mensaje
            alert("Ver resultados!"); */
          }
        },
        error: function () {
          alert("Datos Invalidos");
        },
      });





}
);