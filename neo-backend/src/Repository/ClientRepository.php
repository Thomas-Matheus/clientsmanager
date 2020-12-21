<?php

namespace App\Repository;

use App\Document\Client;
use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use Doctrine\Bundle\MongoDBBundle\Repository\ServiceDocumentRepository;

class ClientRepository extends ServiceDocumentRepository implements ClientRepositoryInterface
{

    /**
     * ClientRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Client::class);
    }

    /**
     * @param string $id
     * @return Client|null
     * @throws \Doctrine\ODM\MongoDB\LockException
     * @throws \Doctrine\ODM\MongoDB\Mapping\MappingException
     */
    public function findById(string $id): ?Client
    {
        return $this->getDocumentManager()
            ->getRepository(Client::class)
            ->find($id)
        ;
    }
}
