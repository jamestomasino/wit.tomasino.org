<?php

class XMLtoJSON {
	public function Parse ($url) {

		$fileContents = file_get_contents($url);
		$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);
		$fileContents = trim(str_replace('"', "'", $fileContents));
		$simpleXML = simplexml_load_string($fileContents);
		$json = json_encode($simpleXML);
		return $json;
	}
}

header('Content-Type: application/json');
print XMLtoJSON::Parse("http://vimeo.com/album/2286122/rss");

?>
