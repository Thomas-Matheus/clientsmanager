<?php

namespace App\Dto;

class SystemStatusDto
{

    /**
     * @var string
     */
    private string $uptime;

    /**
     * @var float
     */
    private float $average;

    /**
     * SystemStatusDto constructor.
     *
     * @param string $uptime
     * @param float $average
     */
    public function __construct(string $uptime, float $average)
    {
        $this->uptime = $uptime;
        $this->average = $average;
    }

    /**
     * @return string
     */
    public function getUptime(): string
    {
        return $this->uptime;
    }

    /**
     * @return float
     */
    public function getAverage(): float
    {
        return $this->average;
    }
}
