<?php
    include_once('db.php');
    //contenedor de mensaje
    $errores = array();
    if(isset($_POST['id']) && !empty($_POST['id']) && isset($_POST['nombre']) && !empty($_POST['nombre']) && $_POST['metodo']==1){
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        //variables
        $sentencia_sql = "UPDATE pozos SET nombre = '$nombre' WHERE id = '$id'";
        $query = mysqli_query($conexion, $sentencia_sql);
        if($query){
            echo 'Actualización exitosa';
        }else{
            echo 'Ha ocurrido un error durante la ctualización';
        }
    }
    if(isset($_POST['id']) && !empty($_POST['id']) && isset($_POST['datos']) && !empty($_POST['datos']) && $_POST['metodo']==2 ){
        $datos = $_POST['datos'];
        $id = $_POST['id'];
        //consulta relaciones
        $sentencia_sql = "SELECT id_medida FROM id_relacion WHERE id_pozos = '$id'";
        $query = mysqli_query($conexion, $sentencia_sql);
        $id_medida = array();
        if($query){
            while($row = $query->fetch_array()){
                array_push($id_medida, $row['id_medida']);
            }
            for($i=0; $i<count($id_medida); $i++){
                $fecha = strval($datos[$i][1]);
                $lectura = strval($datos[$i][0]);
                $id_medida_1 = strval($id_medida[$i]);
                $sentencia_sql = "UPDATE medidas SET lectura = '$lectura' WHERE id = '$id_medida_1' AND fecha = '$fecha'";
                $query = mysqli_query($conexion, $sentencia_sql);
                if(!$query){
                    array_push($errores, 'Error al actualizar los datos en la tabla de lecturas');
                    break;
                }
                
            }

        }else{
            array_push($errores, 'Error al buscar id reelacionadas a la id ->' .$id);
        }
        if(count($errores) <= 0){
            echo 'Actualizacion exitosa';
        }else{
            for($i=0; $i<count($errores); $i++){
                echo $errores[$i];
            }
        }
    }
?>