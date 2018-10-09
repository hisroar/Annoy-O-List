if(!empty($_POST['data'])){
	$data = $_POST['data'];
	$fname = "data.yml";

	$file = fopen(.$fname, 'w'); //overwrite file
	fwrite($file, $data);
	fclose($file);
}