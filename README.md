# Site NovaFlow

Site portfolio d'une seule page, entierement statique.

- Un seul fichier : `index.html`. CSS et JavaScript en ligne, aucune dependance,
  aucun CDN, aucune police distante, aucune image distante.
- Fonctionne en double-cliquant le fichier, sans serveur.
- Bilingue FR / EN, francais par defaut, selecteur dans l'en-tete.
- Theme clair et sombre, `prefers-color-scheme` respecte, bouton de bascule.
- `prefers-reduced-motion` respecte, navigation clavier, contrastes verifies.
- Poids : environ 87 Ko. Aucun traceur, aucun cookie, aucun appel reseau.

## Verifications faites en local

| Point | Resultat |
|---|---|
| Requetes externes | 0 |
| Images bitmap | 0, illustrations en SVG en ligne |
| Defilement horizontal a 375 px | aucun, le tableau des options defile dans son propre cadre |
| Erreurs console | aucune |
| Bascule FR / EN | 183 blocs traduits des deux cotes, aucun orphelin |
| Contraste texte principal | 16,8 en clair, 16,9 en sombre |

## Marqueurs restant a completer

Ils sont visibles a l'ecran, en jaune et en police a chasse fixe :

- `[MENTION TVA A DEFINIR]` dans la note sous le tableau des options.
- `[DOMAINE A DEFINIR]` en pied de page.

Cherchez `todo-inline` dans `index.html` pour les retrouver.

## Previsualiser en local

Le double-clic suffit. Pour un rendu identique a la production, avec un vrai
serveur :

```bash
python -m http.server 4178 --directory "C:/Users/laure/Desktop/freelance/03-site"
```

Puis ouvrez http://localhost:4178

## Deploiement

Rien n'est deploye. Les trois hebergeurs ci-dessous sont gratuits pour ce type
de site. Le plus simple des trois est Cloudflare Pages en glisser-deposer :
aucun compte GitHub necessaire.

### 1. Cloudflare Pages

**Sans depot Git, en glisser-deposer :**

1. Creez un compte sur https://dash.cloudflare.com
2. Menu **Workers & Pages**, puis **Create**, onglet **Pages**, bouton
   **Upload assets**.
3. Nommez le projet, par exemple `novaflow`.
4. Glissez le **dossier** `03-site` dans la zone de depot, pas seulement le
   fichier. Cloudflare sert automatiquement `index.html` a la racine.
5. **Deploy site**. Le site est en ligne sur `novaflow.pages.dev`.

Pour mettre a jour : meme ecran, **Create new deployment**, vous reglissez le
dossier.

**Avec un depot Git :** connectez le depot, laissez la commande de build vide et
indiquez `/` comme repertoire de sortie. Chaque `git push` redeploie.

**Nom de domaine :**

1. Projet Pages, onglet **Custom domains**, **Set up a domain**.
2. Saisissez `novaflow.be` (ou l'extension retenue).
3. Si le domaine est deja gere par Cloudflare, l'enregistrement DNS est cree
   tout seul. Sinon, Cloudflare affiche l'enregistrement `CNAME` a creer chez
   votre registrar : nom `@` ou `www`, valeur `novaflow.pages.dev`.
4. Le certificat HTTPS est emis automatiquement, comptez quelques minutes.

### 2. Netlify

**Sans depot Git :**

1. Compte sur https://app.netlify.com
2. **Add new site**, puis **Deploy manually**.
3. Glissez le dossier `03-site`. Le site est en ligne sur une adresse en
   `*.netlify.app`.
4. **Site configuration**, **Change site name** pour choisir le sous-domaine.

**Avec un depot Git :** connectez le depot, laissez **Build command** vide et
mettez `.` dans **Publish directory**.

**Nom de domaine :**

1. **Domain management**, **Add a domain**.
2. Netlify propose deux voies : deleguer les serveurs de noms a Netlify, ou
   garder votre DNS actuel et creer un `CNAME` vers votre adresse
   `*.netlify.app`. La seconde voie est plus simple si vous avez deja des
   adresses mail sur le domaine.
3. HTTPS via Let's Encrypt, active depuis **Domain management**, section
   **HTTPS**.

### 3. GitHub Pages

Ici un depot Git est obligatoire.

1. Creez un depot, par exemple `novaflow-site`. **Public** suffit et reste
   gratuit. Un depot prive exige un compte payant pour publier des Pages.
2. Deposez `index.html` a la racine du depot.
3. **Settings**, **Pages**, section **Build and deployment** : source
   **Deploy from a branch**, branche `main`, dossier `/ (root)`, **Save**.
4. Le site sort sur `https://<votre-compte>.github.io/novaflow-site/`.

**Nom de domaine :**

1. **Settings**, **Pages**, champ **Custom domain** : saisissez le domaine,
   puis **Save**. GitHub cree un fichier `CNAME` dans le depot, ne le supprimez
   pas.
2. Chez votre registrar :
   - pour `www.novaflow.be` : un `CNAME` vers `<votre-compte>.github.io`
   - pour `novaflow.be` sans `www` : quatre enregistrements `A` vers
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
     `185.199.111.153`
3. Revenez sur l'ecran Pages et cochez **Enforce HTTPS** une fois la
   verification DNS passee.

## Choisir entre les trois

| Critere | Cloudflare Pages | Netlify | GitHub Pages |
|---|---|---|---|
| Sans compte Git | oui | oui | non |
| Depot prive possible | oui | oui | non en gratuit |
| Mise en ligne d'un domaine | la plus rapide si le DNS est chez Cloudflare | simple | manuelle chez le registrar |
| Propagation d'une mise a jour | quelques secondes | quelques secondes | jusqu'a quelques minutes |

Pour une activite freelance qui garde le code de son site hors de GitHub,
Cloudflare Pages en glisser-deposer est le choix le plus direct.

## Apres la mise en ligne

- Verifiez le rendu sur telephone, en clair et en sombre.
- Verifiez que le bouton de contact ouvre bien votre client mail avec l'objet et
  le corps pre-remplis.
- Remplacez les deux marqueurs restants.
- Les prix affiches sont des tarifs de lancement, presentes comme tels dans la
  section Tarifs. Quand les trois references sont acquises, il y a trois
  montants a modifier dans les cartes et un paragraphe a reecrire dans le
  bandeau explicatif.
