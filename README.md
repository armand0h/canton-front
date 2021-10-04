# Canton Front
Test Front-end para la api canton-api

## Repositorio
    git clone git@github.com:armand0h/canton-front.git

## Instalación
    cd canton-front
    npm install

## Configuración
    en src/app/equipos/services/equipos.service.ts
    configurar puerto, en caso de usar canton-api, dejarlo como 8080
    private baseUrl: string = 'http://localhost:8080';    // <- puerto

## Iniciar
    dentro de canton-front
    ng-serve
    visitar: http://localhost:4200/
