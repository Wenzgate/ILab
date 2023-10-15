<!DOCTYPE html>
<html>
<head>
  <title>ILab</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="">
  <!-- Meta Partage -->

  <!-- Favicon -->

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/styles/app.css">
  <script src="assets/scripts/app.js" defer ></script>

  </head>
<body>
  <?php
    //inclure l'autoloader
    include("../vendor/autoload.php");
  //   echo 'Autoloader Composer inclus !'; // Message de débogage
  //   if (class_exists('Twig\Environment')) {
  //     echo 'Twig est correctement chargé !'; // Message de débogage
  // } else {
  //     echo 'Erreur : Twig n\'est pas correctement chargé !'; // Message de débogage
  // }

  // $twigLoaderPath = '../vendor/twig/twig/lib/Twig/Loader/Filesystem.php';
  // echo 'Chemin vers le chargeur de Twig : ' . $twigLoaderPath; // 
  //   // Inclure les fichiers nécessaires de Twig

    $loader = new \Twig\Loader\FilesystemLoader('templates');
    $twig = new \Twig\Environment($loader,['debug' => true]);

    // Lire le contenu du fichier JSON
    $jsonData = file_get_contents('assets/database/projets.json');
    // Décoder le JSON en tableau PHP
    $projets = json_decode($jsonData, true);
  ?>
  <main>
    <section class="section sectionLoading">
      <svg class="sectionLoading__svg">
        <filter id="glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <!-- Adjust the stdDeviation value for the blur intensity -->
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <circle filter="url(#glow)" cx="150" cy="150" r="150" fill="none" stroke="#472F8C" stroke-width="18"></circle>
      </svg>
      <div class="sectionLoading__wrapper wrapperCanvas">
        <!-- <img src="assets/images/picto_dwt.svg" alt="pictogramme des divers options"> -->
        <canvas class="tj-canvas"></canvas>
      </div>
    </section>

    <section class="section sectionProjet">
      <h1 class="sectionProjet__title">Liste des projets</h1>
      <!-- Grille de projets -->
      <div class="sectionProjet__wrapper">
        <div class="sectionProjet__grid" id="projetGrid">
          <?php foreach ($projets as $projet): ?>
            <a class="active sectionProjet__grid__link " data-option="<?= $projet['option'] ?>" data-id="<?= $projet['id'] ?>" href="javascript:void(0);" style="background-image: url('<?= $projet['image'] ?>');">
              <p><?= $projet['nom'] ?><img src="<?= $projet['picto'] ?>" alt="<?= $projet['nom'] ?>"></p>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
      <nav class="sectionProjet__filterBar">
        <a href="#" data-option="option1" class="class1"><p>anim 2d</p></a>
        <a href="#" data-option="option2"><p>anim 3d</p></a>
        <a href="#" data-option="option3"><p>cgp</p></a>
        <a href="#" data-option="option4"><p>dwt</p></a>
        <a href="#" data-option="option5"><p>ir</p></a>
        <a href="#" data-option="option6"><p>jv</p></a>
        <a href="#" data-option="option7" class="class2"><p>vfx</p></a>
      </nav>
    </section>
  </main>
</body>
</html>
