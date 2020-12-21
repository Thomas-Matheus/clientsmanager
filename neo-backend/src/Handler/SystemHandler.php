<?php

namespace App\Handler;

use App\Dto\SystemStatusDto;

class SystemHandler implements SystemHandlerInterface
{

    /**
     * @return string
     */
    public function uptime(): string
    {
        $time = (float) explode(' ', file_get_contents('/proc/uptime'))[0];

        list($days, $time)    = [(int) ($time / 86400), $time % 86400];
        list($hours, $time)   = [(int) ($time / 3600), $time % 3600];
        list($minutes, $time) = [(int) ($time / 60), $time % 60];

        return sprintf('Days %d hours %d minutes %d', $days, $hours, $minutes);
    }

    public function average(): float
    {
        $systemAverage = sys_getloadavg();

        return current($systemAverage);
    }

    public function systemStatus(): SystemStatusDto
    {
        $uptime = $this->uptime();
        $average = $this->average();

        return new SystemStatusDto($uptime, $average);
    }
}
