<?php

namespace App\Form\Type;

use App\Document\Client;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotNull;

class ClientType extends AbstractType
{

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'constraints' => [
                    new NotNull([
                        'message' => 'Name cannot be blank',
                    ]),
                ],
            ])
            ->add('cpfCnpj', TextType::class, [
                'constraints' => [
                    new NotNull([
                        'message' => 'CPF / CNPJ cannot be blank',
                    ]),
                    new Length([
                        'min' => 11,
                        'max' => 14,
                    ])
                ],
            ])
            ->add('blackList')
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Client::class,
            'csrf_protection' => false,
        ]);
    }
}
