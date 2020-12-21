<?php

namespace App\Converter;

/**
 * Interface JsonConverterInterface
 * @package App\Converter
 */
interface JsonConverterInterface
{
    /**
     * @param array $data
     * @return string
     */
    public function arrayToJson(array $data): string;

    /**
     * @param string $data
     * @return array
     */
    public function jsonToArray(string $data): array;
}
