<?php
    include_once('db.php');
    //errores
    $errores = array();
    if(isset($_POST['id']) && !empty($_POST['id'])){
        $id = intval($_POST['id']);
        if(is_int($id)){
            $sentencia_sql = "DELETE FROM pozos WHERE id = '$id'";
            $query = mysqli_query($conexion, $sentencia_sql);
            if($query){
                $sentencia_sql = "SELECT id_medida FROM id_relacion WHERE id_pozos = '$id'";
                $query = mysqli_query($conexion, $sentencia_sql);
                if($query){
                    $id_medida = array();
                    while($row = $query->fetch_array()){
                        array_push($id_medida, $row['id_medida']);
                    }
                    for($i =0; $i<count($id_medida); $i++){
                        $sentencia_sql = "DELETE FROM id_relacion WHERE id_medida = '$id_medida[$i]'";
                        $query = mysqli_query($conexion, $sentencia_sql);
                        if(!$query){
                            array_push($errores, 'Error al eliminar datos en la tabla de relaciones');
                            break;
                        }
                    }
                    for($i=0; $i<count($id_medida); $i++){
                        $sentencia_sql = "DELETE FROM medidas WHERE id = '$id_medida[$i]'";
                        $query = mysqli_query($conexion, $sentencia_sql);
                        if(!$query){
                            array_push($errores, 'Error al eliminar las medidas en la tabla de lecturas');
                            break;
                        }
                    }
                }else{
                    array_push($errores, 'Error al encontrar los id de relaciones');
                }
            }else{
                array_push($errores, 'Error al eliminar la fila #'.$id.' de la tabla pozos');
            }
            //mensaje de resgreso
            if(count($errores) <=0){
                echo 'Eliminacion exitosa';
            }else{
                for($i =0; $i<count($errores); $i++){
                    echo $errores[$i];
                }
            }
        }else{
            array_push($errores,'Identificador no valido');
        }
    }
?>