<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use App\Repository\ClientRepository;

/**
 * @MongoDB\Document(repositoryClass=ClientRepository::class)
 */
class Client
{

    /**
     * @MongoDB\Id
     */
    private string $id;

    /**
     * @MongoDB\Field(type="string")
     */
    private string $name;

    /**
     * @MongoDB\Field(type="string")
     */
    private string $cpfCnpj;

    /**
     * @MongoDB\Field(type="boolean")
     */
    private bool $blackList;

    /**
     * @MongoDB\Field(type="date_immutable")
     */
    private \DateTimeInterface $date;

    public function __construct()
    {
        $this->date = new \DateTimeImmutable();
    }

    /**
     * @return string
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getCpfCnpj(): string
    {
        return $this->cpfCnpj;
    }

    /**
     * @param string $cpfCnpj
     * @return Client
     */
    public function setCpfCnpj(string $cpfCnpj): Client
    {
        $this->cpfCnpj = $cpfCnpj;
        return $this;
    }

    /**
     * @return bool
     */
    public function isBlackList(): bool
    {
        return $this->blackList;
    }

    /**
     * @param bool $blackList
     * @return Client
     */
    public function setBlackList(bool $blackList): Client
    {
        $this->blackList = $blackList;
        return $this;
    }

    /**
     * @return \DateTimeInterface
     */
    public function getDate(): \DateTimeInterface
    {
        return $this->date;
    }

    /**
     * @param \DateTimeInterface $date
     * @return $this
     */
    public function setDate(\DateTimeInterface $date): Client
    {
        $this->date = $date;
        return $this;
    }
}
