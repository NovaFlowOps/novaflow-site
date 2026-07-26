# Site NovaFlow

Site portfolio d'une seule page, entierement statique.

**En ligne : https://novaflow-ops.com**
Depot : https://github.com/Zanth11/novaflow-site (public, requis par GitHub Pages en gratuit)

- Un seul fichier : `index.html`. CSS et JavaScript en ligne, aucune dependance,
  aucun CDN, aucune police distante, aucune image distante.
- Fonctionne aussi en double-cliquant le fichier, sans serveur.
- Bilingue FR / EN, francais par defaut, selecteur dans l'en-tete.
- Theme clair et sombre, `prefers-color-scheme` respecte, bouton de bascule.
- `prefers-reduced-motion` respecte, navigation clavier, contrastes verifies.
- Environ 103 Ko. Aucun traceur, aucun cookie, aucun appel reseau.

## Contenu

| Bloc | Chiffres |
|---|---|
| Rapprochement facture et banque | mesures reelles |
| Boite mail vers tableau | mesures reelles |
| Controle quotidien d'anomalies | mesures reelles |
| Automatisation du poste de travail, RPA | **aucun chiffre**, positionne comme une offre |
| Moderation multi-sites via ERP | **aucun chiffre**, positionne comme une offre |

Les deux derniers blocs affichent explicitement qu'ils ne sont pas mesures. Ne
pas y ajouter de pourcentage : c'est ce qui fait tenir le reste de la page.

Le bloc multi-sites est redige **sans marqueur sectoriel**. Aucun mot ne permet
d'identifier un secteur ou un employeur. Verification automatique possible :

```bash
grep -iE "VHU|vehicule|recycl|casse auto|demolisseur" index.html
```

Cette commande ne doit rien renvoyer.

## Marqueurs restant a completer

Visibles a l'ecran, en jaune et en police a chasse fixe :

- `[PRIX RPA A DEFINIR]` dans le bloc RPA
- `[PRIX A DEFINIR]` dans le bloc moderation multi-sites
- `[MENTION TVA A DEFINIR]` sous le tableau des options

Cherchez `todo-inline` ou `class="todo"` dans `index.html`.

## Mettre le site a jour

Le site se redeploie a chaque push sur `main`. Comptez une a deux minutes.

```bash
git -C "C:/Users/laure/Desktop/freelance/03-site" add -A
```

```bash
git -C "C:/Users/laure/Desktop/freelance/03-site" commit -m "maj contenu"
```

```bash
git -C "C:/Users/laure/Desktop/freelance/03-site" push
```

Ne supprimez pas le fichier `CNAME` a la racine : c'est lui qui tient le nom de
domaine cote GitHub.

## Previsualiser en local avant de pousser

```bash
python -m http.server 4178 --directory "C:/Users/laure/Desktop/freelance/03-site"
```

Puis http://localhost:4178

## Configuration en place

**Hebergement.** GitHub Pages, branche `main`, racine du depot. Gratuit, sans
limite de trafic utile a cette echelle.

**Identite des commits.** Configuree en local sur ce depot uniquement :
nom `NovaFlow`, adresse `64888772+Zanth11@users.noreply.github.com`. Votre
adresse personnelle n'apparait pas dans l'historique public. Si vous clonez le
depot ailleurs, refaites ce reglage :

```bash
git config user.email "64888772+Zanth11@users.noreply.github.com"
```

**DNS chez IONOS.** Le parking IONOS a ete desactive, les enregistrements de
messagerie sont intacts.

| Type | Hote | Valeur |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | zanth11.github.io |
| MX, TXT SPF, CNAME _dmarc, DKIM | @ et sous-domaines | inchanges, messagerie IONOS |

**HTTPS.** Le certificat est emis automatiquement par GitHub via Let's Encrypt
apres validation DNS. Une fois emis, forcer la redirection :

```bash
gh api -X PUT "/repos/Zanth11/novaflow-site/pages" -F https_enforced=true
```

Verifier l'etat :

```bash
gh api "/repos/Zanth11/novaflow-site/pages"
```

## Si vous voulez passer a un depot prive

GitHub Pages exige un depot public en gratuit. Pour garder le code prive :
Cloudflare Pages accepte un depot prive, ou un simple glisser-deposer du
dossier, sans depot du tout. Il faut creer un compte Cloudflare, connecter le
depot ou deposer le dossier, puis repointer le DNS : supprimer les quatre
enregistrements A et le CNAME `www` chez IONOS, et suivre les valeurs indiquees
par Cloudflare.

## A verifier de temps en temps

- Le bouton de contact ouvre bien votre client mail, objet et corps pre-remplis,
  vers `novaflowops@gmail.com`.
- Le rendu sur telephone, en clair et en sombre.
- Le domaine expire le 26/07/2027. Le renouvellement automatique est desactive
  sur le compte IONOS : a surveiller.
