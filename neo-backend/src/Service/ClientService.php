<?php

namespace App\Service;

use App\Document\Client;
use App\Exception\ClientNotFoundException;
use App\Repository\ClientRepositoryInterface;
use Doctrine\ODM\MongoDB\MongoDBException;
use InvalidArgumentException;

class ClientService
{

    /**
     * @var ClientRepositoryInterface
     */
    private ClientRepositoryInterface $repository;

    /**
     * ClientService constructor.
     * @param ClientRepositoryInterface $repository
     */
    public function __construct(ClientRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $id
     * @return Client|null
     */
    public function find(string $id): ?Client
    {
        return $this->repository->findById($id);
    }

    /**
     * @param array|null $creteria
     * @return array
     */
    public function findAll(?array $creteria = []): array
    {
        return $this->repository->findAll();
    }

    /**
     * @param Client $client
     * @return Client
     * @throws InvalidArgumentException|MongoDBException
     */
    public function create(Client $client): Client
    {
        if (!$client) {
            throw new ClientNotFoundException('Client not found.');
        }

        $this->repository->getDocumentManager()->persist($client);
        $this->repository->getDocumentManager()->flush();

        return $client;
    }

    /**
     * @param string $id
     * @param Client $client
     * @return Client
     * @throws InvalidArgumentException|MongoDBException
     */
    public function update(Client $client): Client
    {
        if (!$client) {
            throw new ClientNotFoundException('Client not found.');
        }

        $this->repository->getDocumentManager()->persist($client);
        $this->repository->getDocumentManager()->flush();

        return $client;
    }

    /**
     * @param string $id
     * @throws MongoDBException
     */
    public function delete(string $id): void
    {
        $client = $this->repository->findById($id);

        if (!$client) {
            throw new ClientNotFoundException('Client not found.');
        }

        $this->repository->getDocumentManager()->remove($client);
        $this->repository->getDocumentManager()->flush();
    }
}
