<?php

namespace Database\Seeders;

use App\Models\Hospitality;
use Illuminate\Database\Seeder;

class HospitalitySeeder extends Seeder
{
    public function run(): void
    {
        $hospitalities = [
            [
                'tier' => 'Premium',
                'price' => '2 500 €',
                'badge' => null,
                'is_featured' => false,
                'description' => 'L\'expérience Premium vous offre un accès exclusif aux meilleures places du tournoi.',
                'perks' => [
                    'Siège catégorie Premium en tribune',
                    'Accès salon hospitalité FIFA',
                    'Repas gastronomique 3 services',
                    'Programme de match officiel',
                    'Cadeau de bienvenue FIFA',
                    'Service voiturier',
                ],
                'cta_text' => 'Réserver',
                'image_url' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=80&fit=crop',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'tier' => 'Business',
                'price' => '5 000 €',
                'badge' => 'Le plus populaire',
                'is_featured' => true,
                'description' => 'L\'expérience Business combine confort ultime et services exclusifs pour les passionnés du football.',
                'perks' => [
                    'Siège catégorie Business en tribune centrale',
                    'Salon privatif avec vue terrain',
                    'Menu dégustation & bar premium',
                    'Conférencier invité FIFA',
                    'Kit media & accréditation presse',
                    'Transfert aller-retour luxe',
                    'Accès vestiaires après match',
                ],
                'cta_text' => 'Réserver',
                'image_url' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80&fit=crop',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'tier' => 'Prestige',
                'price' => 'Sur devis',
                'badge' => 'Exclusif',
                'is_featured' => false,
                'description' => 'L\'expérience Prestige est réservez aux clients les plus exigeants souhaitant une personnalisation totale.',
                'perks' => [
                    'Loge privée avec terrasse terrain',
                    'Chef privé & sommelier personnel',
                    'Rencontre avec une légende FIFA',
                    'Accès pitch walk officiel',
                    'Suite hôtel 5★ incluse',
                    'Jet privé depuis votre ville',
                    'Itinéraire 100% personnalisé',
                ],
                'cta_text' => 'Contacter notre équipe',
                'image_url' => 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80&fit=crop',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($hospitalities as $hospitality) {
            Hospitality::create($hospitality);
        }
    }
}