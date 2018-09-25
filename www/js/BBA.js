<?php
/**************************************************

Author: Son Nguyen && Vivien Chow
Description: PHP & MySQL backend to update and explain
             student passing status.
Last Working Date: April-07-2016
File: post_SID_to_get_student_status

**************************************************/
//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}


$conn = new mysqli("localhost", "root", "oak_123456", "db_ionic3");
mysqli_set_charset($conn,"utf8");

$postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		
		$request = json_decode($postdata,true);
		@$std_gro1 = $request['std_gro1'];
		@$std_gro2 = $request['std_gro2'];
		
		
		//print_r($postdata);
	
//$result = $conn->query("SELECT * from student WHERE gro='58390105' or gro='58390106'");
$result = $conn->query("SELECT * from student WHERE gro='$std_gro2'");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"code":"'   . $rs["code"] . '",';
    $outp .= '"name":"'    . $rs["name"]   . '",';
    $outp .= '"nickname":"'   . $rs["nickname"]   . '",';
    $outp .= '"gro":"'   . $rs["gro"]  . '",';
    $outp .= '"birt":"'   . $rs["birt"]  . '",';
    $outp .= '"depwork":"'   . $rs["depwork"]  . '",';
    $outp .= '"pin_id":"'   . $rs["pin_id"]  . '",';
    $outp .= '"Religion":"'   . $rs["reli"]  . '",';
    $outp .= '"province":"'   . $rs["prov1"]  . '",';
     $outp .= '"img":"'   . $rs["code"]  . '.jpg",';
    $outp .= '"tell1":"'   . $rs["tell1"]  . '"}';

	}

$outp ='{"records":['.$outp.']}';

$conn->close();

echo($outp);
 }
?>