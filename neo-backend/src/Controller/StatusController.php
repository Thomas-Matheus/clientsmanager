<?php

namespace App\Controller;

use App\Handler\SystemHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StatusController extends AbstractController
{

    /**
     * @Route("/api/status", methods={"GET"}, name="status")
     *
     * https://github.com/marcioAlmada/uptime
     *
     * @param Request $request
     * @param SystemHandler $systemHandler
     * @return Response
     */
    public function index(Request $request, SystemHandler $systemHandler): Response
    {
        try {
            $status = $systemHandler->systemStatus();

            return  $this->json($status, Response::HTTP_OK);
        } catch (\Exception $ex) {
            return $this->json(
                'An unexpected error has occurred',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
