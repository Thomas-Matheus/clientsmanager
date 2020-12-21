<?php

namespace App\Tests\Handler;

use App\Handler\SystemHandler;
use PHPUnit\Framework\TestCase;

class SystemHandlerTest extends TestCase
{
    public function testSystemStatus(): void
    {
        $systemStatus = new SystemHandler();

        $this->assertNotEmpty($systemStatus);
    }
}
