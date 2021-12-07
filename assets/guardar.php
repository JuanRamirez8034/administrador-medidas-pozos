<?php
    //incluyendo la conexion
    include('../assets/db.php');
    //guardando lo capturado en el metodo post
    $datarecibida = $_POST['arregloDatosGuardar'];
    //validando que exista el metodo
    if(isset($_POST['arregloDatosGuardar'])){
        //la variable y datos recibidos no pueden estar vacios ni nulo
        if(!empty($datarecibida) && $datarecibida != null){
            ///////echo(var_dump($datarecibida));
            //variable nombre y otro
            $nombre = $datarecibida[0][1];
            $fecha = date('Y-m-d H:i');
            $lectura = null;
            ///////echo $fecha;
            //////////////////////////////////////////////////////////////////////////
            //decharacion de la sentencia para guardar los datos tabla pricipal pozos
            /////////////////////////////////////////////////////////////////////////
            $sentencia_sql = "INSERT INTO pozos (nombre, fecha) VALUES ('$nombre','$fecha')";
            $query = mysqli_query($conexion,$sentencia_sql);
            //validar query
            if($query){
                ///////echo 'todo bien';
                ///////////////////////////////////////////////////////////////
                //capturando gatos y guardandolos en la segunda tabla medidas
                ////////////////////////////////////////////////////////////////

                //obteniendo el id asignado al pozo guardado
                $sentencia_sql= "SELECT (id) FROM pozos WHERE nombre = '$nombre' AND fecha = '$fecha'";
                $query = mysqli_query($conexion,$sentencia_sql);
                
                //validando la sentencia anterior para poder proceder
                if($query){
                    //capturando array y guardando
                    //obteniendo y guardando el valor del id del pozo en la bdd
                    $id_pozo = $query->fetch_array()['id'];
                    $medi = 0;
                    for($i =0; $i<count($datarecibida); $i++){
                        //sacando la fecha y hora para guaradarlas
                        $lectura = $datarecibida[$i][2];
                        $fecha = $datarecibida[$i][3];
                        $id_medida = null;
                        ///////echo ' -/-/- '.$lectura.' - ' . $fecha.' - '. $id_medida.' - '. $id_pozo;
                        //creando la sentencia query para la otra tabla
                        $sentencia_sql = "INSERT INTO medidas (lectura,fecha)VALUES('$lectura','$fecha')";
                        //ejecutando la sentencia
                        $query = mysqli_query($conexion,$sentencia_sql);
                        //validando que todo vaya bien
                        if($query){
                            ///////echo 'todo bien segunda face';
                            //Obteniendo la id de la medida guardada
                            $sentencia_sql = "SELECT id FROM medidas WHERE lectura = '$lectura' AND fecha = '$fecha'";
                            $query = mysqli_query($conexion, $sentencia_sql);
                            if($query){
                                ///////echo 'todo bien en la segunda consulta';
                                //guardando la nueva id obtenida en una variable
                                $id_medida = $query->fetch_array()['id'];
                                //////////////////////////////////////////////////////////////////////////
                                //tercera face insertar datos de relacion entre las tablas anteriores
                                /////////////////////////////////////////////////////////////////////////
                                $sentencia_sql = "INSERT INTO id_relacion (id_pozos , id_medida) VALUES ('$id_pozo','$id_medida')";
                                $query = mysqli_query($conexion, $sentencia_sql);
                                if($query){
                                    ///////echo 'Registro exitoso de relaciones';
                                    $medi++;
                                    
                                }else{
                                    die('error al relacionar');
                                    break;
                                }
                                
                            }
                        }else{
                            die('ha ocurrido un error');
                            break;
                        }
                    }
                    echo $medi.' Lecturas guardadas';
                }else{
                    die('hubu un error en la consulta');
                }
                

            }else{
                die('hubo un error');
            }
            //cerrando conexion
            mysqli_close($conexion);
        }
    }

?>