<?php
include("../vendor/autoload.php");

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader);

if (isset($_GET['id'], $_GET['option'])) {
    $projectId = $_GET['id'];
    $projectOption = $_GET['option'];

    // Chargez les données spécifiques au projet en fonction de l'ID du projet
    $jsonData = file_get_contents('assets/database/dataProjets.json');
    $projets = json_decode($jsonData, true);

    // Recherchez le projet avec l'ID et l'option correspondants
    foreach ($projets as $projet) {
        if ($projet['id'] == $projectId && $projet['option'] == $projectOption) {
            // Retournez les données du projet au format JSON
            header('Content-Type: application/json');
            echo json_encode($projet);
            exit;
        }
    }
}

// Si l'ID du projet n'est pas trouvé ou en cas d'erreur, renvoyez une réponse d'erreur
http_response_code(404);
echo json_encode(array('error' => 'Projet non trouvé'));
?>
