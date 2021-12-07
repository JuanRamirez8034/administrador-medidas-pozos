//funcion agregar a la tabla
function agregar(){
    //capturando datos dentro de las variables
    var nombre = document.getElementById('nombrePozo').value;
    var fecha = document.getElementById('fechaLectura').value;
    var lectura = document.getElementById('valorLectura').value;
    var id = document.getElementById('tablaLectura').childElementCount + 1;  
    //validando que no hayan campos vacios
    if(nombre == '' || fecha == '' || lectura == '') {
        //Si esta uno vacio se muestra esto
        alert('No puede agregar datos con campos vacios');
    }else{
        //convertir el elemento tipo disable
        document.getElementById('nombrePozo').disabled = true;
        document.getElementById('tipomanometro').disabled = true;
        //si estan llenos
        var filanueva = `<tr><td><input type="button" class="btn btn-secundary" value = "${id}" id = "id${id}">
                         </td><td><input type="button" class="btn btn-secundary" value ="${nombre}" id = "nombre${id}">
                         </td><td><input type="button" class="btn btn-secundary" value = "${lectura}" id="lectura${id}">
                         </td><td><input type="button" class="btn btn-secundary" value = "${fecha}" id  ="fecha${id}"></td></tr>`;
        //crear un elemento con una id especifica numero de fila mas(+)id
        var filaTabla = document.createElement('TR');
        filaTabla.setAttribute('id','dataFila'+id);
        //agregar la fila nueva al elemnto creado
        filaTabla.innerHTML = filanueva;
        //añadir el elemento al elemento padre
        document.getElementById('tablaLectura').appendChild(filaTabla);
        //reiniciar los valores de los campos
        document.getElementById('valorLectura').value = '';
        document.getElementById('fechaLectura').value = '';
        //sacando y rescribiendo el valor de la media        
        //sacando la suma para la media
        var suma = 0;
        var aux = 0;
        for(var i =0; i< Number(id); i++){
            //accediendo a los datos de la tabla columna de lecturs para sacar la suma con la que se obtendra media
            suma += Number(document.getElementById('lectura'+(aux + 1)).value);
            //incrementando la variable aux
            aux ++;
        }
        document.getElementById('mediaLectura').value = (suma/aux).toFixed(2);
        //restablecer los botones
        reset(1);
    }
}
//Funcion para guardar
function guardar(){
    //obteniendo la cantidad de elementos o filas a guadar
    var id = Number(document.getElementById('tablaLectura').childElementCount);
    var aux = 0;
    var arregloDatosGuardar = new Array();
    for(var i =0; i<id; i++){
        //recolectando los valores
        var nombre = String(document.getElementById('nombre'+(aux +1)).value);
        var lectura = parseFloat(document.getElementById(`lectura${aux +1}`).value);
        var fecha = String(document.getElementById(`fecha${aux +1}`).value);
        //agregando los valores a un arreglo
        arregloDatosGuardar.push([aux, nombre, lectura, fecha]);
        //alert(`id:${aux}Nombre:${nombre} \nlectura:${lectura}\nFecha:${fecha}`)
        aux++;
    }
    var aux = 0;
    for(var i = 0; i< arregloDatosGuardar.length; i++){
        console.log(arregloDatosGuardar[aux]);
        aux ++;
    }
    if(arregloDatosGuardar.length >= 0){
        $.ajax({
            url:'./assets/guardar.php', //direccion archivo que hace funciones backend
            type: 'POST', //tipo de peticion POST o GET
            data: {arregloDatosGuardar},
            success: function(response){ //funcion por si todo sale bien
                alert(response);
            }
        });
        
    }
    document.getElementById('botonAñadir').disabled = true;
    document.getElementById('btnguardar').disabled = true;
}
//funcion limpiar, aparecer desaparecer
function reset(a){
    if(a == 1){
        document.getElementById('btnguardar').disabled = false;
    }
    if(a == 2){
        document.getElementById('btnreset').disabled = false;
    }
    if(a == 3){
        document.getElementById('btnguardar').disabled = true;
        document.getElementById('botonAñadir').disabled = false;
        document.getElementById('nombrePozo').disabled = false;
    document.getElementById('tipomanometro').disabled = false;  
        document.getElementById('valorLectura').value = '';
        document.getElementById('nombrePozo').value = '';
        document.getElementById('fechaLectura').value = '';
        document.getElementById('mediaLectura').value = '0.00';
        var elemento = document.getElementById('tablaLectura');
        //eliminar y crear eleemnto de nuevo
        if(elemento){
            elemento.remove();
            elemento = document.createElement('TBODY');
            elemento.setAttribute('id','tablaLectura');
            document.getElementById('tabla').appendChild(elemento);
        }
    }
}
//funcion para buscar todos los elementos
function buscahistorial(a){
    if(a==1){
        var opcion = 1;
        $.ajax({
            url: './assets/buscar.php',
            type: 'POST',
            data:{opcion},
            success: function(response){
                var respuesta = JSON.parse(response);
                for(var i =0; i < respuesta.length; i++){
                    var id = respuesta[i]['id'];
                    var nombre = respuesta[i]['nombre'];
                    var fecha = respuesta[i]['fecha'];
                    var filanueva = `<tr>
                                        <td><input type="button" class="btn btn-secundary" value="${id}"></td>
                                        <td><input type="button" class="btn btn-secundary" value="${nombre}"></td>
                                        <td><input type="button" class="btn btn-secundary" value="${fecha}"></td>
                                     </tr>`;
                    var elemento = document.createElement('TR');
                    elemento.setAttribute('id','elementospozoN'+id);
                    var filaAgregar = elemento.innerHTML = filanueva;
                    document.getElementById('tablaLectura').appendChild(elemento);
                }
            }
        });
    }if (a == 2) {
        var opcion = 2;
        var busqueda = document.getElementById('nombrePozo').value;
        //mostrar la tabla
        document.getElementById('mostrar').style.display = 'block';
        var elemento = document.getElementById('contenedorEditar').style.display = 'none';
        info();
        $.ajax({
            url: './assets/buscar.php',
            type: 'POST',
            data: {opcion, busqueda},
            success: function(response){
                //console.log(response);
                var respuesta = JSON.parse(response);
                //console.log(respuesta[1]);
                var lectura_indice = new Array();
                //recorrer la cantidad de arregos que contiene el arreglo princiopal
                for(var x=0; x<respuesta[0].length; x++){
                    //recorre la cantidad de elementos que contiene el arreglo indice y
                    for(var y = 0; y < respuesta[1].length; y++){
                        if(respuesta[0][x]['id'] == respuesta[1][y][0]){
                            for(var z =0; z < respuesta[2].length; z++){
                                if(respuesta[1][y][1] == respuesta[2][z]['id_lectura']){
                                    lectura_indice.push(Array(respuesta[2][z]['lectura'],respuesta[2][z]['fecha_lectura']));
                                }
                            }
                        }
                    }
                }
                if(lectura_indice.length <=0){
                    alert('No existe este pozo.\nComprueba el nombre.\nIntenta con la ID respectiva');
                }
                //sacando la media
                var media = 0;
                for(var m =0; m<lectura_indice.length; m++){
                    media += Number(lectura_indice[m][0]);
                    if(m == (lectura_indice.length - 1)){
                        media = media/(m+1);
                    }
                }
                if(respuesta.length >= 0){
                    //añadir los elementos que se sacaron durante la consulta
                    for(var a =0; a<respuesta[0].length; a++){
                        var id = respuesta[0][a]['id'];
                        var nombre = respuesta[0][a]['Nombre'];
                        var fecha = respuesta[0][a]['fecha'];
                        var filanueva = `<tr>
                                            <td><input type="button" class="btn btn-secundary" value="${id}" id="idpozo"></td>
                                            <td><input type="button" class="btn btn-secundary" value="${nombre}" id="nombre_p"></td>
                                            <td><input type="button" class="btn btn-secundary" value="${fecha}"></td>
                                            <td><input type="button" class="btn btn-secundary" value="${media.toFixed(2)}"></td>
                                        </tr>`;
                        elemento = document.createElement('TR');
                        elemento.setAttribute('id','elementospozoN'+id);
                        elemento.innerHTML = filanueva;
                        document.getElementById('cuerpoTablaResultado').appendChild(elemento);
                    }
                    if((document.getElementById('cuerpoTablaResultado').childElementCount) == 1){
                        document.getElementById('botonesEE').style.display = 'flex';
                    }else{
                        document.getElementById('botonesEE').style.display = 'none';
                    }
                }
                if(lectura_indice.length>=0){
                    for(var d=0; d<lectura_indice.length; d++){
                        var fecha = lectura_indice[d][1];
                        var lectura = lectura_indice[d][0];
                        var filanueva = `<tr>
                                            <td><input type="button" class="btn btn-secundary" value="${lectura}" id="Lectura_${d}"></td>
                                            <td><input type="button" class="btn btn-secundary" value="${fecha}" id="fecha_${d}"></td>                                            
                                        </tr>`;
                        elemento = document.createElement('TR');
                        elemento.innerHTML = filanueva;
                        document.getElementById('cuerpoTablaResultadoLectura').appendChild(elemento);
                    }
                }
            }
        });
    }
    if(a==3){
        var opcion = 2;
        var busqueda = document.getElementById('nombrePozo').value;
        //mostrar la tabla
        document.getElementById('mostrar').style.display = 'block';
        var elemento = document.getElementById('cuerpoTablaResultado');
        if(elemento){
            //removemos
            elemento.remove();
            elemento = document.createElement('TBODY');
            elemento.setAttribute('id', 'cuerpoTablaResultado');
            document.getElementById('tablaResultado').appendChild(elemento); 
            elemento = document.getElementById('cuerpoTablaResultado');
        }
        //consulta
        $.ajax({
            url: './assets/buscar.php',
            type: 'POST',
            data: {opcion, busqueda},
            success: function(response){
                //console.log(response);
                var respuesta = JSON.parse(response);
                //console.log(respuesta[1]);
                var lectura_indice = new Array();
                //recorrer la cantidad de arregos que contiene el arreglo princiopal
                for(var x=0; x<respuesta[0].length; x++){
                    //recorre la cantidad de elementos que contiene el arreglo indice y
                    for(var y = 0; y < respuesta[1].length; y++){
                        if(respuesta[0][x]['id'] == respuesta[1][y][0]){
                            for(var z =0; z < respuesta[2].length; z++){
                                if(respuesta[1][y][1] == respuesta[2][z]['id_lectura']){
                                    lectura_indice.push(Array(respuesta[2][z]['lectura'],respuesta[2][z]['fecha_lectura']));
                                }
                            }
                        }
                    }
                }
                if(lectura_indice.length <=0){
                    alert('No existe este pozo.\nComprueba el nombre.\nIntenta con la ID respectiva');
                }
                //sacando la media
                var media = 0;
                for(var m =0; m<lectura_indice.length; m++){
                    media += Number(lectura_indice[m][0]);
                    if(m == (lectura_indice.length - 1)){
                        media = media/(m+1);
                    }
                }
                if(respuesta.length >= 0){
                    //añadir los elementos que se sacaron durante la consulta
                    for(var a =0; a<respuesta[0].length; a++){
                        var id = respuesta[0][a]['id'];
                        var nombre = respuesta[0][a]['Nombre'];
                        var fecha = respuesta[0][a]['fecha'];
                        var filanueva = `<tr>
                                            <td><input type="button" class="btn btn-secundary" value="${id}"  id="pozoid"></td>
                                            <td><input type="button" class="btn btn-secundary" value="${nombre}" id="nPozo"></td>
                                            <td><input type="button" class="btn btn-secundary" value="${fecha}"></td>
                                            <td><input type="button" class="btn btn-secundary" value="${media.toFixed(2)}"></td>
                                        </tr>`;
                        elemento = document.createElement('TR');
                        elemento.setAttribute('id','elementospozoN'+id);
                        elemento.innerHTML = filanueva;
                        document.getElementById('cuerpoTablaResultado').appendChild(elemento);
                    }
                    if(document.getElementById('cuerpoTablaResultado').childElementCount == 1){
                        document.getElementById('btnGraficar').style.display = 'Block';
                    }else{
                        document.getElementById('btnGraficar').style.display = 'none';
                    }
                }
            }
        });
    }
}
function info(){
        var elemento = document.getElementById('cuerpoTablaResultado');
        if(elemento){
            //removemos
            elemento.remove();
            elemento = document.createElement('TBODY');
            elemento.setAttribute('id', 'cuerpoTablaResultado');
            document.getElementById('tablaResultado').appendChild(elemento); 
            elemento = document.getElementById('cuerpoTablaResultado');
        }
        var elemento = document.getElementById('cuerpoTablaResultadoLectura');
        if(elemento){
            //removemos
            elemento.remove();
            elemento = document.createElement('TBODY');
            elemento.setAttribute('id', 'cuerpoTablaResultadoLectura');
            document.getElementById('tablaResultadoLectura').appendChild(elemento); 
            elemento = document.getElementById('cuerpoTablaResultadoLectura');
        }
}
function eliminar(){
    var id = document.getElementById('idpozo').value;
    info();
    $.ajax({
        url: './assets/eliminar.php',
        type: 'POST',
        data: {id},
        success: function(response){
            alert(response);
            console.log(response);
        }
    });
    buscahistorial(2);
}
function buscarDataGrafica(){
    console.log('dentro');
    var id = document.getElementById('pozoid').value;
    
    $.ajax({
    url: './assets/buscarData.php' ,
    type: 'POST',
    data:{id},
    success: function(response){
        console.log(response);
        var datos_grafica = JSON.parse(response);

        var elemento = document.getElementById('graficaPozo');
        if(elemento){
            console.log('existe se borra');
            elemento.remove();
            elemento = document.createElement('CANVAS');
            elemento.setAttribute('id', 'graficaPozo');
            elemento.setAttribute('width', '400');
            elemento.setAttribute('height', '300');
            elemento.style.maxWidth = '800px';
            elemento.style.maxHeight = '500px';
            elemento.style.marginTop = '30px';
            document.getElementById('contenedorGrafica').appendChild(elemento);
            document.getElementById('contenedorGrafica').style.borderBottom = '2px gray solid';
            let x=Array(), y=Array();
            for(let i = 0; i < datos_grafica.length; i++){
                x.push(datos_grafica[i][0]);
                y.push(datos_grafica[i][1]);
            }
            let miCanvas = document.getElementById('graficaPozo').getContext("2d");
            var chart = new Chart(miCanvas,{
                type: "line",//tipo de barra
                data:{//datos a pasar
                    labels:x, //eje de las equis
                    datasets:[
                        {
                            label: document.getElementById('nPozo').value.toUpperCase(), //titulo
                            backgroundColor:'rgb(25 56 135)',//color de fondo
                            borderColor: 'rgb(31 69 165)',//color del los bordes
                            data:y,//datos del eje y
                            fill: false,
                            tension: 0.3
                        }
                    ]
                }
            })
        }
    }
    });
}
function graficate() {
    let miCanvas = document.getElementById('graficaPozo').getContext("2d");
    var chart = new Chart(miCanvas,{
        type: "line",//tipo de barra
        data:{//datos a pasar
            labels:['Date','Date','Date','Date','Date','Date','Date' ], //eje de las equis
            datasets:[
                {
                    label:'Pozo buscado', //titulo
                    backgroundColor:'rgb(25 56 135)',//color de fondo
                    borderColor: 'rgb(31 69 165)',//color del los bordes
                    data:[5,10,15,20,25,30,45],//datos del eje y
                    fill: false,
                    tension: 0.3
                }
            ]
        }
    })
}
//funcion para activar editar
function editar(){
    var elemento = document.getElementById('contenedorEditar').style.display = 'flex';
    elemento = document.getElementById('tablaActualizarLectura');
    if(elemento){
        elemento.remove();
        elemento = document.createElement('TBODY');
        elemento.setAttribute('id', 'tablaActualizarLectura');
        document.getElementById('tablaActualizar').appendChild(elemento);
    }
    for(let i =0; i < Number(document.getElementById('cuerpoTablaResultadoLectura').childElementCount); i++){
        let fecha = document.getElementById('fecha_'+i).value;
        let lectura = document.getElementById('Lectura_'+i).value;
        var filanueva = `<tr>
                            <td><input type="button" class="btn btn-secundary" value="${fecha}" id="fechaN${i}"></td>
                            <td><input type="number" class="form-control" value="${lectura}" step="0.01" id="lecturaN${i}"></td>                                            
                         </tr>`;
                        elemento = document.createElement('TR');
                        elemento.innerHTML = filanueva;
                        document.getElementById('tablaActualizarLectura').appendChild(elemento);
    }
    elemento = document.getElementById('idpozo').value;
    document.getElementById('idActualizar').value = elemento;
    elemento = document.getElementById('nombre_p').value;
    document.getElementById('nombreActualizar').value = elemento;
}
//actualizar datos
function actualizar(a){
    let id = Number(document.getElementById('idActualizar').value);
    let nombre = document.getElementById('nombreActualizar').value;
    let metodo = a;
    if(a==1){
        $.ajax({
            url: './assets/actualizar.php',
            type: 'POST',
            data:{id,nombre,metodo},
            success: function(response){
                alert(response);
                console.log(response);
            }
        });
    }
    let datos = Array();
    for(let i =0; i<Number(document.getElementById('tablaActualizarLectura').childElementCount); i++){
        let lectura = document.getElementById('lecturaN'+i).value;
        let fecha = document.getElementById('fechaN'+i).value;
        datos.push(Array(lectura, fecha));
    }
    if(a==2){
        $.ajax({
            url: './assets/actualizar.php',
            type: 'POST',
            data:{id,datos,metodo},
            success: function(response){
                alert(response);
                console.log(response);
            }
        });
    }
}