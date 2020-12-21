<?php

namespace App\Handler;

use App\Dto\SystemStatusDto;

interface SystemHandlerInterface
{

    public function uptime(): string;

    public function average(): float;

    public function systemStatus(): SystemStatusDto;
}
