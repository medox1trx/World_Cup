<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NewsArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('news_articles')->insert([
            [
                'tag' => 'Stades',
                'title' => "Le Grand Stade Hassan II officiellement homologué par la FIFA pour la finale",
                'description' => "Une étape majeure pour le dossier 2030 : la FIFA a officiellement approuvé les plans de l'écrin marocain de 115 000 places. Doté d'une architecture unique rappelant les tentes traditionnelles, ce stade devient le grand favori pour accueillir la finale de la Coupe du Monde.",
                'image_url' => 'https://moroccan-culture.com/wp-content/uploads/2025/05/Grand-Stade-Hassan-II-1.png',
                'url' => '#',
                'source_name' => 'FIFA Official',
                'published_at' => Carbon::now()->subDays(1),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'tag' => 'Billets',
                'title' => "Phase 2 des ventes : plus de 8 millions de requêtes en moins de 48 heures",
                'description' => "L'engouement ne faiblit pas ! Dès l'ouverture de la seconde phase de billetterie, les serveurs de la FIFA ont enregistré un record absolu de fréquentation. Mettant en valeur la collaboration inédite entre deux continents, le Mondial 2030 suscite une attente mondiale historique.",
                'image_url' => 'https://editorial01.shutterstock.com/wm-preview-1500/9762843o/a38d997b/Shutterstock_9762843o.jpg',
                'url' => '#',
                'source_name' => 'Billetterie FIFA',
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'tag' => 'Tirage au Sort',
                'title' => "Tirage du Mondial 2030 : Un Groupe de la Mort pour l'Espagne ?",
                'description' => "Le tirage a rendu son verdict. Les groupes s'annoncent dantesques avec notamment l'Espagne, le Japon, le Sénégal et le Pérou dans le groupe G. Le Maroc hérite quant à lui d'un groupe abordable pour viser les 8es de finale.",
                'image_url' => 'https://www.atalayar.com/media/atalayar/images/2023/10/19/2023101911255391424.jpg',
                'url' => '#',
                'source_name' => 'Sports Infos',
                'published_at' => Carbon::now()->subDays(3),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'tag' => 'Formation',
                'title' => "Programme d'Excellence : La FIFA va déployer des académies mondiales en Espagne et au Maroc",
                'description' => "Dans le but de laisser un héritage à long terme après le Mondial 2030, la FIFA s'associe aux fédérations marocaine, espagnole et portugaise pour encadrer des milliers de jeunes au sein de nouvelles infrastructures technologiques.",
                'image_url' => 'https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/sport/foot-zidane-en-lice-pour-le-titre-de-meilleur-entraineur-fifa-de-lannee-3413477/43736945-1-fre-FR/Foot-Zidane-en-lice-pour-le-titre-de-meilleur-entraineur-Fifa-de-l-annee.jpg',
                'url' => '#',
                'source_name' => 'FIFA Development',
                'published_at' => Carbon::now()->subDays(5),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'tag' => 'Durabilité',
                'title' => "Objectif zéro émission : Un Mondial 2030 totalement respectueux de l'environnement",
                'description' => "Mobilité douce, stades solaires et recyclage intégral. Les pays hôtes multiplient les efforts pour assurer une Coupe du Monde ayant l'empreinte carbone la plus faible de l'histoire moderne du sport.",
                'image_url' => 'https://www.saurenergy.me/wp-content/uploads/2022/11/front-21.png',
                'url' => '#',
                'source_name' => 'FIFA Eco-Green',
                'published_at' => Carbon::now()->subDays(7),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'tag' => 'Technologie',
                'title' => "Une nouvelle génération de VAR assistée par IA",
                'description' => "Pour la première fois dans une compétition officielle, la VAR sera connectée à un puissant algorithme capable de détecter automatiquement le moindre problème physique ou comportement d'antijeu instantanément.",
                'image_url' => 'https://images.indianexpress.com/2025/12/fifa-var-word-cup.jpg',
                'url' => '#',
                'source_name' => 'Techno Sports',
                'published_at' => Carbon::now()->subDays(10),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'tag' => 'Infrastructures',
                'title' => "Les TGV relieront Madrid, Lisbonne et Casablanca en temps record",
                'description' => "Pour faciliter le déplacement des supporters entre les trois pays, d'immenses travaux de raccordement ferroviaires sont sur le point d'être achevés, promettant des connexions ultrarapides.",
                'image_url' => 'https://th.bing.com/th/id/OIP.rbZyi8bjd3WckIuKKaz9VwHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
                'url' => '#',
                'source_name' => 'Logistique 2030',
                'published_at' => Carbon::now()->subDays(12),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
