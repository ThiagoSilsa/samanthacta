# samanthacta

Site de portfólio profissional de **Samantha Albuquerque** — estudante de Psicologia, 10º
período, na Universidade Federal Fluminense (Niterói), com ênfase em neuropsicologia.

O site reúne a trajetória de formação, as competências técnicas — documentos psicológicos,
instrumentos psicométricos, idiomas e ferramentas — e um canal de contato direto. É uma
página pública em português, inglês e espanhol, com tema claro e escuro.

## Status

**Fundação técnica pronta** (etapa 01): Next.js 16, React 19, TypeScript em modo `strict`,
Tailwind CSS 4, shadcn/ui inicializado e estrutura de pastas criada. A página inicial é um
placeholder — o conteúdo entra nas etapas seguintes.

A documentação do projeto (briefing, decisões, direção de arte e o plano dividido em etapas)
não fica neste repositório: ela contém dados pessoais da titular e é mantida apenas no
ambiente local de desenvolvimento.

## Stack

| Camada      | Escolha                        |
| ----------- | ------------------------------ |
| Framework   | Next.js (App Router)           |
| Linguagem   | TypeScript                     |
| Estilo      | Tailwind CSS                   |
| Componentes | shadcn/ui                      |
| Idiomas     | `next-intl` (pt, en, es)       |
| Tema        | `next-themes` (claro e escuro) |
| Deploy      | Vercel                         |

Nenhuma dependência é adicionada sem justificativa registrada na etapa correspondente.

## Como rodar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Depois, abrir `http://localhost:3000`.

| Comando         | O que faz                 |
| --------------- | ------------------------- |
| `npm run dev`   | servidor de desenvolvimento |
| `npm run build` | build de produção         |
| `npm start`     | serve o build de produção |
| `npm run lint`  | ESLint                    |

## Estrutura prevista

```
src/
├─ app/[locale]/          rotas (App Router)
├─ components/
│  ├─ layout/             cabeçalho, rodapé, alternador de tema e idioma
│  ├─ sections/           seções de página
│  ├─ content/            peças de conteúdo reaproveitadas
│  └─ ui/                 componentes shadcn/ui
├─ data/                  conteúdo factual tipado
├─ i18n/                  configuração de idiomas
├─ messages/              textos de interface por idioma
└─ lib/                   utilitários
public/
├─ images/                retrato, logos, certificados, artes
└─ cv/                    currículo em PDF
scripts/                  verificações de conteúdo e de tradução
```

## Convenções

- Conteúdo factual separado da apresentação, em `src/data/` — nunca embutido em componente.
- HTML semântico e acessibilidade WCAG 2.1 AA como requisito, não como melhoria posterior.
- Mobile-first: o layout é decidido em telas de 360px e adaptado para cima.
- Sem gradientes, sombras, animação decorativa ou cards arredondados.
- Commits em [Conventional Commits](https://www.conventionalcommits.org/), em português.

## Licença

O **código** está sob a licença MIT — ver [LICENSE](LICENSE).

O **conteúdo** não é licenciado: textos, fotografias, artes, currículo e demais materiais
são de autoria de Samantha Albuquerque e não podem ser copiados ou reutilizados sem
autorização.
