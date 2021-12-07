<?php

    include_once('db.php');
    if(isset($_POST['id']) && !(empty($_POST['id']))){
        $id = intval($_POST['id']);
        if(is_int($id)){
            //declaracion de variabes a usar
            $sentencia_sql = "SELECT id_medida FROM id_relacion WHERE id_pozos = '$id'";
            $query = mysqli_query($conexion, $sentencia_sql);
            if($query){
                $array_id_lectura = array();
                while($row = $query->fetch_array()){
                    array_push($array_id_lectura, $row['id_medida']);
                }
                //array con los datos fechas y lecturas
                $data_para_grafica = array();
                for($i = 0; $i<count($array_id_lectura); $i++){
                    $sentencia_sql = "SELECT * FROM medidas WHERE id = '$array_id_lectura[$i]'";
                    $query = mysqli_query($conexion, $sentencia_sql);
                    if($query){
                        while($row = $query->fetch_array()){
                            array_push($data_para_grafica, array($row['fecha'], $row['lectura']));
                        }
                    }
                    
                }
                $data_para_grafica = json_encode($data_para_grafica);
                echo $data_para_grafica;
            }
        }
    }
?>