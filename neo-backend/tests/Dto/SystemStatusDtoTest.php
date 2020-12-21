<?php

namespace App\Tests\Dto;

use App\Dto\SystemStatusDto;
use PHPUnit\Framework\TestCase;

class SystemStatusDtoTest extends TestCase
{
    /**
     * @var SystemStatusDto
     */
    private $status;

    /**
     * @var string
     */
    private $uptime;

    /**
     * @var float
     */
    private $average;

    protected function setUp(): void
    {
        $this->uptime = sprintf('Days %d hours %d minutes %d', 0, 5, 0.8);
        $this->average = 0.8;

        $this->status = new SystemStatusDto($this->uptime, 0.8);
    }

    public function testGetUptime(): void
    {
        $this->assertNotEmpty($this->status->getUptime());
        $this->assertSame($this->status->getUptime(), $this->uptime);
    }

    public function testGetAverage(): void
    {
        $this->assertNotEmpty($this->status->getAverage());
        $this->assertSame($this->status->getAverage(), $this->average);
    }
}
