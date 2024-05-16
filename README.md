# FrontEnd Web Mock

## Description
Ce projet a pour but de builder l'image Docker qui va être utiliser pour déployer l'application Web frontale basique qui validera le test cURL vers le service Krakend. Voici le lien du projet concerné: https://github.com/cloud-pi-native/helm-projects-mocks.git

## Explications
#### Pré-requis
- Avoir déployé le secret contenant le certificat public, la clé privée et le rootCA générés dans le tutoriel du projet [helm-projects-mocks](https://github.com/cloud-pi-native/helm-projects-mocks.git)
#### 
- le fichier server.js fait foi pour se servir du certificat public, de la clé privée et du rootCA client qui sont présent dans le POD en question 

## NOTE 
- Si vous changez votre nom de service krakend, pensez à le modifier dans le fichier **server.js** (actuellement : https://krakend:80/test)
