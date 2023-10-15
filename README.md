# La nouvelle Marche du Monde

## Install

```bash
> cd anywhere/you/like
> git clone https://github.com/lm-maxfab/marche-du-monde.git
> cd marche-du-monde
> npm i
```
 
## Start
```bash
> npm start
# triggers:
# npm run watch (watches changes inside src/index.ts and bundles to dist/index.js)
# npm run serve (starts a http server on port 40404 from project's root dir)

```

## Usage
- Create a new html page inside `tests/`, create a `<script type="module"></script>`
- `npm start` and go to `http://localhost:40404/tests/<your-page>.html`
- Do what you want to do inside `src/`
- `import { anything } from dist/index.js` inside your test page and test anything you want

## File structure

### Pour info
Je laisse des `/* [WIP] */` à tous les endroits où il y a encore des choses à faire, histoire de pas en oublier en chemin, et si on travaille à plusieurs dans ce projet ça peut permettre à chacun de savoir ce qui reste à faire.

### `src/index.ts`
- Exporte la fonction principale de la lib : `nouvelleMarcheDuMonde` (ou nouveau nom à trouver)
- Exporte toutes les "sous-fonctions" utilisées par `nouvelleMarcheDuMonde`

Le détail de comment fonctionne `nouvelleMarcheDuMonde` :
- reçoit une chaine de caractères et un objet d'options en input
- met à l'abri les chaines de caractères échappées à l'intérieur (`{ escape } from src/escape/index.ts`)
- parse cet input "tokenisé" comme du markdown (donc retourne un élément HTML) (`src/parse-markdown/index.ts`)
- passe dans chaque branche de cet élément HTML (`src/replace-in-node/index.ts`), et :
  - remplace les textes un par un, en fonction d'un objet d'options passé en paramètres (`src/replacers/index.ts`)
  - remet à leur place les bouts de texte échappés (`{ unescape } from src/escape/index.ts`)
- en fonction de ce qui est demandé dans l'objet d'options, retourne le tout sous forme de :
  - texte ([`Node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)),
  - ou de [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) (on ne retourne pas l'élément parent qu'a produit parseMarkdown, mais ses enfants, parce qu'un input `"texte simple"` serait retourné en tant que `<div>texte simple</div>`)

### `src/escape/index.ts`

**`escape` :**
```
input = 'un texte \avec\ des zones \protégées\'
=> 
tokenized = 'un texte ESCAPED-0 des zones ESCAPED-1'
escaped = ['avec', 'protégées']

Il faudra trouver le bon token pour échapper (\ va nous poser problème je pense),
et pour les tokens de remplacement, peut-être quelque chose de plus farfelu que ESCAPED-<position>
```

**`unescape` :**
```
input = ('un texte ESCAPED-0 des zones ESCAPED-1', ['avec', 'protégées'])
output = 'un texte avec des zones protégées'
```

### `src/parse-markdown/index.ts`

Librairie à trouver, ou à faire maison, à voir

### `src/replace-in-node/index.ts`

Fonction qui reçoit un objet [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node), et :
  - remplace et retourne son contenu texte si c'est un Node de type TEXT_NODE,
  - liste tous ses Node enfants si type === ELEMENT_NODE, et s'appelle elle-même sur chacun des enfants
  - retourne le Node tel quel dans tous les autres cas

### `src/replacers/index.ts`

Fonction qui prend un input texte et un objet d'options, et applique une série de remplacements dans l'input, en fonction de si l'objet d'options l'autorise ou non. La liste des fonctions de remplacements (guillemets français, anglais, allemands, insécables en fonction de la ponctuation, formattage des nombres, etc...) est à construire, chacune est indépendante et elles sont toutes assemblées et séquencées par `replacer`, exporté par `src/replacers/index.ts`
