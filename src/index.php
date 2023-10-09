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
  <link rel="stylesheet" href="styles/app.css">
  <script src="scripts/app.js" defer></script>
</head>
<body>
  <?php 
    // Lire le contenu du fichier JSON
    $jsonData = file_get_contents('projets.json');
    // Décoder le JSON en tableau PHP
    $projets = json_decode($jsonData, true);
  ?>
  <main>
    <section class="section sectionLoading">
      <svg class="sectionLoading__svg">
        <circle filter="url(#glow)" cx="150" cy="150" r="150" fill="none" stroke="#472F8C" stroke-width="18"></circle>
      </svg>
      <div class="sectionLoading__img">
        <img src="assets/images/picto_dwt.svg" alt="pictogramme des divers options">
      </div>
    </section>

    <section class="section sectionProjet">
      <h1 class="sectionProjet__title">Liste des projets</h1>
      <!-- Grille de projets -->
      <div class="sectionProjet__wrapper">
        <div class="sectionProjet__grid" id="projetGrid">
          <?php foreach ($projets as $projet): ?>
            <a class="active" href="details.php?id=<?= $projet['id'] ?>" style="background-image: url('<?= $projet['image'] ?>');">
              <p><?= $projet['nom'] ?><img src="<?= $projet['picto'] ?>" alt="<?= $projet['nom'] ?>"></p>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="sectionProjet__filterBar">
        <a href="#" data-option="Option 1" class="class1"><p>anim 2d</p></a>
        <a href="#" data-option="Option 2"><p>anim 3d</p></a>
        <a href="#" data-option="Option 3"><p>cgp</p></a>
        <a href="#" data-option="Option 4"><p>dwt</p></a>
        <a href="#" data-option="Option 5"><p>ir</p></a>
        <a href="#" data-option="Option 6"><p>jv</p></a>
        <a href="#" data-option="Option 7" class="class2"><p>vfx</p></a>
    </div>
    </section>
  </main>
</body>
</html>
