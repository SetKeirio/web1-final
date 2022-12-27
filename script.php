<?php header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST"); 

    if(!isset($_SESSION["status"])){
        session_set_cookie_params(10000, "/");
        session_start();
    }
    
    function checkR($r){
        return isset($r) && ($r == 1 || $r == 1.5 || $r == 2 || $r == 2.5 || $r == 3);
    }

    function checkX($x){
        return isset($x) && ($x == -2 || $x == -1.5 || $x == -1 || $x == -0.5 || $x == 0 || $x == 0.5 || $x == 1 || $x == 1.5 || $x == 2);
    }

    function checkY($y){
        if (!isset($y)){
            return false;
        }
        $realY = str_replace(",", ".", $y);
        return $realY <= 3 && $realY >= -3 && is_numeric($realY);
    }

    function validate($x, $y, $r){
        return checkR($r) && checkX($x) && checkY($y);
    }

    function inSquare($x, $y, $r){
        return ($x <= 0 && $y >= 0 && $x >= -$r && $y <= $r);
    }

    function inTriangle($x, $y, $r){
        return ($x >= 0 && $y >= 0 && $y <= -2*$x + $r);
    }

    function inCircle($x, $y, $r){
        return ($x <= 0 && $y <= 0 && sqrt($x*$x + $y*$y) <= $r/2);
    }

    function inArea($x, $y, $r){
        return inSquare($x, $y, $r) || inTriangle($x, $y, $r) || inCircle($x, $y, $r);
    }
    date_default_timezone_set("Europe/Moscow");
    $x = $_POST["xval"];
    $y = $_POST["yval"];
    $r = $_POST["rval"];
    $valid = validate($x, $y, $r);
    $isInArea = "false";
    if (inArea($x, $y, $r)){
        $isInArea = "true";
    }
    $executeTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 4);
    $nowTime = date('H:i:s', time());
    //$answer = json_decode($_SESSION["status"]);
    if ($valid && !(isset($answer))){
        $answer = array("x" => $x, "y" => $y, "r" => $r, "validate" => $valid, "nowTime" => $nowTime, "executeTime" => $executeTime, "inArea" => $isInArea);
    }
    $answer = json_encode($answer);
    //$_SESSION["status"] = $answer;
    echo $answer;
    
    //print_r($_SESSION["status"]);
    //echo $answer;
    //$answer = "x = {$x}, y = {$y}, r = {$r}, valid = {$valid}, inArea = {$isInArea}, executeTime = {$executeTime}, nowTime = {$nowTime}";
    
    /*$answer = "{" . "\"x\":\"" . $x . "\"," . 
        "\"y\":\"" . $y . "\"," .
        "\"r\":\"" . $r . "\"," . 
        "\"validate\":\"" . $valid . "\"," . 
        "\"nowTime\":\"" . $nowTime . "\"," . 
        "\"executeTime\":\"" . $executeTime . "\"," . 
        "\"inArea\":\"" . $isInArea . "\"}";*/
    