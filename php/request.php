<?php

require_once('database.php');

// Databse connexion.
$db = dbConnect();
if (!$db)
{
  header ('HTTP/1.1 503 Service Unavailable');
  exit;
}

// Check the request.
$requestType = $_SERVER['REQUEST_METHOD'];
$request = substr($_SERVER['PATH_INFO'], 1);
$request = explode('/', $request);
$requestRessource = array_shift($request);

// Check the id associated to the request.
$id = array_shift($request);
if ($id == '')
$id = NULL;
$data = false;

// Photos request.
if ($requestRessource == 'photos')
{
  if ($id != NULL)
  $data = dbRequestPhoto($db, intval($id));
  else
  $data = dbRequestPhotos($db);
}
if ($requestRessource == 'twitts')
{
  $id = array_shift($request);
  if($id == '')
    $id = NUll;
  $data = false;

  if ($requestRessource == 'photos'){
    if($id!=NULL) {
      $data = dbRequestPhoto($db,intval($id));
    }
    else {
      $data = dbRequestPhotos($db);
    }
  }

  if ($requestType == 'GET')
  {
    if (isset($_GET['login']))
    $data = dbRequestTwitts($db, $_GET['login']);
    else
    $data = dbRequestTwitts($db);
  }
  if ($requestType == 'POST'){
    $data = dbAddTwitt($db, $_POST['login'], $_POST['text']);
  }
  if ($id != NULL && $requestType == 'PUT'){
    parse_str(file_get_contents('php://input'),$_PUT);
    $data = dbModifyTwitt($db, intval($id), $_PUT['login'], $_PUT['text']);
  }
  if ($requestType == 'DELETE'){
    $data = dbDeleteTwitt($db, $id,$_GET['login'] );
  }

}

// Send data to the client.
header('Content-Type: text/plain; charset=utf-8');
header('Cache-control: no-store, no-cache, must-revalidate');
header('Pragma: no-cache');
header('HTTP/1.1 200 OK');
echo json_encode($data);
exit;
?>
