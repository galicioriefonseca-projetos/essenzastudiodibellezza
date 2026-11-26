# Essenzza Studio Site

crei um site para o salão de alto padrão, Essenzza Studio di Bellezza em Fernandópolis-SP seguindo essas instruções, e o layout deve ser algo parecido com o da imagem, Análise do Estilo e Aplicação

O design que geramos utiliza uma paleta de cores orgânicas e terrosas (bege suave, creme, taupe profundo, tons de madeira), inspirada diretamente no interior do salão. A tipografia combina uma serifa elegante para títulos (sofisticação) com uma sem serifa limpa para o corpo de texto (legibilidade moderna).

A estrutura é uma adaptação de uma Bento Grid suave e assimétrica, onde os diferentes elementos (especialidades, galeria, depoimentos, mapa) são organizados em blocos distintos com cantos arredondados, criando um fluxo visual claro. As linhas curvas finas e a iluminação indireta sutil trazem uma sensação tátil e de profundidade.

Estrutura do Site (Seções Detalhadas)

Vamos seguir essa estrutura exata para o desenvolvimento:

1. Cabeçalho (Header)

Identidade: O logotipo "ESSENZA Studio di Bellezza" no canto superior esquerdo, usando a fonte serifada estilizada em taupe.

Navegação: Menu limpo e horizontal (Home, Serviços, Galeria, Agendamento, Contato), alinhado à direita, utilizando a fonte sem serifa sutil.

2. Seção Hero (Destaque Principal)

Conteúdo: A foto de alta qualidade da modelo com cabelos e maquiagem impecáveis, segura um copo de café com o logo.

Texto: O título "Harmonia, Beleza e Bem-Estar" em serifa grande, seguido pelo texto descritivo.

Botão (CTA): O botão "AGENDE SEU HORÁRIO" com o contorno dourado sutil e cantos arredondados, pronto para ação.

Design: O fundo texturizado imitando o cimento queimado e o detalhe curvo de madeira com luz indireta, integrando a foto organicamente.

3. Corpo do Site (A Grid de Conteúdo)

Vamos manter os quatro blocos principais que geramos:

Bloco A: Especialidades

Título: "ESPECIALIDADES" em serifa.

Conteúdo: Ícones lineares minimalistas e elegantes para cada serviço (Cabelo, Unhas, Estética/Sélia, Massagem), com os nomes abaixo em sans-serif.

Bloco B: Galeria de Estilo

Título: "GALERIA DE ESTILO" em serifa.

Conteúdo: Uma grade de 4 fotos em miniatura (inspirada na Bento Grid), mostrando exemplos de trabalhos reais (diferentes estilos de cabelo, nail art, etc.).

Bloco C: Depoimentos

Título: "AVALIAÇÕES DE CLIENTES" em serifa.

Conteúdo: Citações curtas e elegantes de clientes satisfeitos em sans-serif, seguidas pelos nomes.

Bloco D: Localização

Título: "LOCALIZAÇÃO EM FERNANDÓPOLIS" em serifa.

Conteúdo: Um mapa estilizado mostrando Fernandópolis, ao lado da foto original do balão (image_0.png) para confirmar o espaço físico.

Tecnologias e Funcionalidades Modernas para Implementar

Para que o site não apenas pareça moderno, mas funcione de forma excepcional:

Performance: Construído com um framework moderno (como Next.js ou Astro) para garantir carregamento instantâneo, vital para SEO e experiência do usuário.

Responsividade Total: Cada bloco da grid se reorganizará de forma fluida para telas de celular e tablet, mantendo a integridade do design.

Animações Sutis (GSAP ou Framer Motion):

Os blocos da grid podem aparecer suavemente ao fazer o scroll.

A luz indireta na seção hero pode ter um pulso muito sutil.

A "Galeria de Estilo" pode ter um efeito de zoom suave ao passar o mouse.

Integração de Agendamento: O botão "AGENDE SEU HORÁRIO" pode abrir um modal ou link para um sistema de reservas online (como Salão Vip, WhatsApp Business, etc.).

Galeria Dinâmica: A seção "Galeria de Estilo" pode ser puxada diretamente de um feed do Instagram, mantendo o conteúdo sempre atualizado com os trabalhos mais recentes.

Personalização com IA: O site pode usar geolocalização sutil para destacar a mensagem de boas-vindas para visitantes de Fernandópolis ou regiões próximas.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://essenzastudiodibellezza.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/24bc3053-ade4-4dd6-9907-eb79cce19b17).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
