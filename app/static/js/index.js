
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

    console.log(gridData);


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

            
             // Matriz de datos
            // Inicializar tabla de resultados
            resulTable(data);

            // Mostrar números de clientes potenciales
            $("#clientesPotenciales").text(data.lectores);
            // Mostrar contenedor de resultados
            //$(".container_results").show();
            // Mensaje
            alert("Ver resultados!"); 
          }
        },
        error: function () {
          alert("Datos Invalidos");
        },
      });
});


function resulTable(data) {
    // Tabla para resultados del minizin
    const containerResults = document.querySelector('#containerResults');

  
    let resulDataTable = new Handsontable(containerResults, {
      startRows: 3,
      startCols: 2,
      rowWidths: 100,
      colHeaders: ['Tema', 'Páginas',],
      filters: false,
      dropdownMenu: false,
      width: "100%",
      height: 'auto',
      manualColumnResize: true,
      manualRowResize: true,
      colWidths: 100,
      licenseKey: 'non-commercial-and-evaluation' 
    });


    const gridData = dataTable.getData();
    console.log(data)

    const grid = data.paginas.map(function(value, key){
        return [gridData[key][0],value]
    });
  
    // Se cargan los datos despues de hacerle una limpieza

    resulDataTable.loadData(grid);
  }



$("#download").click(function () {
    const options = {
        method: "GET",
    };
    fetch("/solve", options)
        .then((res) => {
            return res.blob();
        })
        .then((blob) => {
            download(blob, "Datos.dzn");
        })
        .catch((err) => console.log(err));
});