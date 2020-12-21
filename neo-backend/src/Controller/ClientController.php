<?php

namespace App\Controller;

use App\Converter\JsonConverter;
use App\Exception\ClientNotFoundException;
use App\Form\Type\ClientType;
use App\Service\ClientService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ClientController extends AbstractController
{

    /**
     * @var ClientService
     */
    private ClientService $clientService;

    /**
     * ClientController constructor.
     * @param ClientService $clientService
     */
    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    /**
     * @Route("/api/client", methods={"GET"}, name="client_get_all")
     *
     * @param Request $request
     * @return Response
     */
    public function showAll(Request $request): Response
    {
        try {
            $clients = $this->clientService->findAll();

            return $this->json(
                $clients,
                Response::HTTP_OK
            );
        } catch (\Exception $exception) {
            return $this->json(
                'An unexpected error has occurred',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * @Route("/api/client/{id}", methods={"GET"}, name="client_get_one")
     *
     * @param Request $request
     * @return Response
     */
    public function show(Request $request): Response
    {
        try {
            $id = $request->get('id');

            if (empty($id)) {
                throw new \InvalidArgumentException('ID not found.');
            }

            $client = $this->clientService->find($id);

            return $this->json($client, Response::HTTP_OK);
        } catch (\InvalidArgumentException $iae) {
            return $this->json(
                $iae->getMessage(),
                Response::HTTP_BAD_REQUEST
            );
        } catch (\Exception $exception) {
            return $this->json(
                'An unexpected error has occurred',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * @Route("/api/client", methods={"POST"}, name="client_create")
     *
     * @param Request $request
     * @return Response
     */
    public function create(Request $request): Response
    {
        try {
            $data = (new JsonConverter())->jsonToArray($request->getContent());

            $form = $this->createForm(ClientType::class);
            $form->submit($data);
            $form->handleRequest($request);

            if (!$form->isSubmitted() || !$form->isValid()) {
                throw new \InvalidArgumentException('Bad request.');
            }

            $client = $this->clientService->create($form->getData());

            return $this->json($client, Response::HTTP_CREATED);
        } catch (ClientNotFoundException $cnfe) {
            return $this->json(
                $cnfe->getMessage(),
                Response::HTTP_BAD_REQUEST
            );
        } catch (\InvalidArgumentException $iae) {
            return $this->json(
                $iae->getMessage(),
                Response::HTTP_BAD_REQUEST
            );
        } catch (\Exception $exception) {
            return $this->json(
                'An unexpected error has occurred',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

    }

    /**
     * @Route("/api/client/{id}", methods={"PUT"}, name="client_update")
     *
     * @param Request $request
     * @return Response
     */
    public function update(Request $request): Response
    {
        try {
            $id = $request->get('id');

            if (empty($id)) {
                throw new \InvalidArgumentException('ID not found.');
            }

            $client = $this->clientService->find($id);

            if (empty($client)) {
                throw new ClientNotFoundException('Client not found.');
            }

            $data = (new JsonConverter())->jsonToArray($request->getContent());

            $form = $this->createForm(ClientType::class, $client);
            $form->submit($data);
            $form->handleRequest($request);

            if (!$form->isSubmitted() || !$form->isValid()) {
                return $this->json($form->getErrors(), Response::HTTP_BAD_REQUEST);
            }

            $clientData = $this->clientService->update($form->getData());

            return $this->json($clientData, Response::HTTP_OK);
        } catch (ClientNotFoundException $cnfe) {
            return $this->json(
                $cnfe->getMessage(),
                Response::HTTP_BAD_REQUEST
            );
        } catch (\InvalidArgumentException $iae) {
            return $this->json(
                $iae->getMessage(),
                Response::HTTP_BAD_REQUEST
            );
        } catch (\Exception $ex) {
            return $this->json(
                'An unexpected error has occurred',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }

    /**
     * @Route("/api/client/{id}", methods={"DELETE"}, name="client_delete")
     *
     * @param Request $request
     * @return Response
     */
    public function delete(Request $request): Response
    {
        try {
            $id = $request->get('id');

            if (empty($id)) {
                throw new \InvalidArgumentException('ID not found.');
            }

            $this->clientService->delete($id);

            return $this->json('', Response::HTTP_NO_CONTENT);
        } catch (ClientNotFoundException $cnfe) {
            return $this->json(
                $cnfe->getMessage(),
                Response::HTTP_BAD_REQUEST
            );
        } catch (\InvalidArgumentException $iae) {
            return $this->json(
                $iae->getMessage(),
                Response::HTTP_BAD_REQUEST
            );
        } catch (\Exception $exception) {
            return $this->json(
                'An unexpected error has occurred',
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
