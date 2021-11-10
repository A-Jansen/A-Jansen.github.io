<?php
//https://github.com/RJP43/CitySlaveGirls/issues/59
// $xmlParam = $_GET["xml"];
// $xslParam = $_GET["xsl"];

$xml = new DOMDocument;
$xml->load('datatypes.xml');

$xsl = new DOMDocument;
$xsl->load('datatokens.xsl');

$proc = new XSLTProcessor;
$proc->importStylesheet($xsl);

$proc->transformToURI($xml, 'file:///var/www/html/out.html');

echo file_get_contents('out.html');

?>
