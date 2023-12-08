## Healthpanel Frontend

Esse é um projeto escrito em vue 3, que tem como objetivo ser o frontend do projeto Healthpanel.

## Instalação

Para instalar as dependências do projeto, basta executar o comando abaixo:

```bash
npm install
```

## Execução

Para executar o projeto, basta executar o comando abaixo:

```bash

npm run dev
```

## Internacionalização

### Boas práticas

Evite utilizar palavras fixas no código, utilize o arquivo de tradução para isso. Exemplo:

```html
<!-- Evite -->
<template>
  <div>
    <h1>Healthpanel</h1>
  </div>
</template>

<!-- Prefira -->
<template>
  <div>
    <h1>{{ $t('healthpanel') }}</h1>
  </div>
</template>
```

### Nomenclatura
