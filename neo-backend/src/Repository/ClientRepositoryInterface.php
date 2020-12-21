<?php


namespace App\Repository;


use App\Document\Client;

interface ClientRepositoryInterface
{

    /**
     * @param string $id
     * @return Client|null
     */
    public function findById(string $id): ?Client;
}
