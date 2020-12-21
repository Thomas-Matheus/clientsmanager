<?php

namespace App\Converter;

use function json_last_error;
use function json_last_error_msg;

class JsonConverter implements JsonConverterInterface
{
    /**
     * @param array $data
     * @return string
     */
    public function arrayToJson(array $data): string
    {
        if (!is_array($data)) {
            throw new \InvalidArgumentException();
        }

        $toJson = json_encode($data);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \InvalidArgumentException(
                sprintf('Invalid array %s', json_last_error_msg())
            );
        }

        return $toJson;
    }

    /**
     * @param string $data
     * @return array
     */
    public function jsonToArray(string $data): array
    {
        if (empty($data)) {
            throw new \InvalidArgumentException();
        }

        $toArray = json_decode($data, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \InvalidArgumentException(
                sprintf('Invalid JSON %s', json_last_error_msg())
            );
        }

        return $toArray;
    }
}
