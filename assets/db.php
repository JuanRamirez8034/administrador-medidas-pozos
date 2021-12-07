<?php
    //conexion de la base de datso
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $bdd = 'manometros';
    $conexion = mysqli_connect($host, $user, $password, $bdd);
    if($conexion){
        //echo 'conexion exitosa';
    }else{
        die('no se pudo establecer la conexion a la base de datsos');
        
    }

?>