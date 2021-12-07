<?php
    //incluyendo la base de datos
    include('db.php');
    //validando opcion
    if(isset($_POST['opcion']) && $_POST['opcion'] == 1){
        //echo 'Ya estamos listos perra';
        //variable de la sentencia reutilzable
        $sentencia_sql = "SELECT * FROM pozos";
        //variable del query reutilizable
        $query = mysqli_query($conexion,$sentencia_sql);
        //arreglo para datos
        $datos_historial = array();
        $i=0;
        if($query){
            //si todo va bien pues bien
            while($row = $query->fetch_array()){
                array_push($datos_historial,array('id'=>$row['id'], 'nombre'=>$row['nombre'],'fecha'=>$row['fecha']));
            }
            //convirtiendo el arreglo a un archivo json
            $datos_historial_string = json_encode($datos_historial);
            echo $datos_historial_string;
        }else{
            echo 'Hubo un herror en la consulta';
        }
    }elseif(isset($_POST['opcion']) && ($_POST['opcion'] == 2)){
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////BUSQUEDA DE LOS POZOS POR EL NOMBRE PROVENIENTE DE LA VARIABLE BUSQUEDA
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //variable de la busqueda
        $busqueda = $_POST['busqueda'];
        //variable para sentencias y query
        $sentencia_sql = "SELECT * FROM pozos WHERE nombre LIKE '$busqueda%' OR id LIKE '$busqueda%'";
        //realizar la busqueda de la sentencia
        $query = mysqli_query($conexion, $sentencia_sql);
        //validar que esta bien la consulta
        if($query){
            //almacenando los datos dentro de un arreglo (datos de a tabla pozo 'tabla principal' sin sus valores de medidas)
            //array que contendra los valores de los resultados de las busqueda
            $resultado_busqueda = array();
            //array enlaces id
            $id_enlaces = array();
            //array con los valores de las lecturas correspondientes
            $lecturas_pozos = array();
            while($row = $query->fetch_array()){
                array_push($resultado_busqueda, array('id'=>$row['id'], 'Nombre'=>$row['nombre'], 'fecha'=>$row['fecha']));
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////BUSQUEDA DE LAS ID DE LAS LECTURAS EN LA TABLA DE RELACIONES
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //sentencia para encontrar las id de la tablas de relaciones entre la pozos y medidas
            for($i = 0; $i < count($resultado_busqueda); $i++){
                //variable de apoyo para guardar las id
                $id = $resultado_busqueda[$i]['id'];
                //sentencia de busqueda relacionada
                $sentencia_sql = "SELECT id_pozos, id_medida FROM id_relacion WHERE id_pozos = '$id'";
                //ejecutando la consulta y guardando el resultado del query
                $query = mysqli_query($conexion, $sentencia_sql);
                //validando que la sentencia sea efectiva
                if($query){
                    //si todo salio bien continuamos
                    //nuevo array con las id a buscar
                    $id_relaciones = array();
                    while($row = $query->fetch_array()){
                        //añadiendo las ids al arreglo conttenedor de id_de_relaciones
                        array_push($id_relaciones, $row['id_medida']);
                        array_push($id_enlaces, array($row['id_pozos'],$row['id_medida']));
                    }
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    ////////////////////BUSQUEDA DE LAS LECTURAS CORRESPONDIENTES A LAS ID ENCONTRADAS EN LA CONSULTA ANTERIOR
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //procedemos a buscar las lecturas de cada elemento id dentro del arreglo y lo almacenamos
                    //obteniendo las lecturas de los pozos y sus fechas
                    for($i_ids = 0; $i_ids < count($id_relaciones); $i_ids++){
                        //variable reutilizada y de apoyo para la id indice a buscar
                        $id = $id_relaciones[$i_ids];
                        //variables para la sentencia de la consulta y query
                        $sentencia_sql = "SELECT * FROM medidas WHERE id = '$id'";
                        //ejecutando la consulta y guardando el resultado del query
                        $query = mysqli_query($conexion, $sentencia_sql);
                        //validando el query de la consulta
                        if($query){
                            //como todo va  bien podemos continuar
                            //capturando las lecturas en el array correspondiente lecturas_pozos
                            while($row = $query->fetch_array()){
                                array_push($lecturas_pozos, array('id_lectura'=>$row['id'], 'lectura'=>$row['lectura'], 'fecha_lectura'=>$row['fecha']));
                            }
                            
                        }else{
                            die('Ha ocurrido un error durante la consulta de las lecturas');
                        } //cerramos el else del condicional 
                    }//cerramos el form de la ultima consulta
                }else{
                    die('hubo un error durante la busqueda de los \'ids\' de relacion');
                }//cierre del bloque del condicional de la busqueda de las id de relciones
            }//cierre del for que realiza las consultas de las id de relaciones
            
                /////////////////////////////////////////////////////////////////
                ///si se encontraron medidas y pozos se crea el archivo JSON/////
                /////////////////////////////////////////////////////////////////
                if(count($resultado_busqueda)>= 0 && count($lecturas_pozos)>=0){
                    $datos_regreso = array();
                    array_push($datos_regreso, $resultado_busqueda);
                    array_push($datos_regreso, $id_enlaces);
                    array_push($datos_regreso, $lecturas_pozos);
                    $datos_regreso_string = json_encode($datos_regreso);
                    echo $datos_regreso_string;
                }
        }else{
            die('Error durante la consulta');
        }//bloque condicional consulta de los nombres cierre
        //cerrando la conexion
        mysqli_close($conexion);
    }//cerramos el bloque del primer condicional

?>