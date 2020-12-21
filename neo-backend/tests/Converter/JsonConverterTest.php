<?php

namespace App\Tests\Converter;

use App\Converter\JsonConverter;
use PHPUnit\Framework\TestCase;

class JsonConverterTest extends TestCase
{

    public function testArrayToJson()
    {
        $array = ['param' => 'teste', 'param2' => 123, 'param4' => null];

        $toJson = (new JsonConverter())->arrayToJson($array);
        $this->assertIsString($toJson);
    }

    public function testJsonToArray()
    {
        $array = ['param' => 'teste', 'param2' => 123, 'param4' => null];
        $json = json_encode($array);

        $toArray = (new JsonConverter())->jsonToArray($json);
        $this->assertIsArray($toArray);
    }

    public function testExceptionJsonToArray()
    {
        $this->expectException('InvalidArgumentException');
        $this->expectErrorMessage('Invalid JSON Syntax error');

        $stringJson = '{"uptime":"Days 0 hours 11 minutes 1","average": }';
        (new JsonConverter())->jsonToArray($stringJson);
    }
}
