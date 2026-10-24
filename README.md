# samanthacta

Site de portfólio profissional de **Samantha Albuquerque** — estudante de Psicologia, 10º
período, na Universidade Federal Fluminense (Niterói), com ênfase em neuropsicologia.

O site reúne a trajetória de formação, as competências técnicas — documentos psicológicos,
instrumentos psicométricos, idiomas e ferramentas — e um canal de contato direto. É uma
página pública em português, inglês e espanhol, com tema claro e escuro.

## Status

**Em construção.** Este repositório ainda não contém código de aplicação: por enquanto
existem apenas a licença e este README. A fundação técnica — `package.json`, `src/`,
configuração de Tailwind e estrutura de pastas — é criada na etapa 01.

A documentação do projeto (briefing, decisões, direção de arte e o plano dividido em etapas)
não fica neste repositório: ela contém dados pessoais da titular e é mantida apenas no
ambiente local de desenvolvimento.

## Stack

| Camada       | Escolha                          |
| ------------ | -------------------------------- |
| Framework    | Next.js (App Router)             |
| Linguagem    | TypeScript                       |
| Estilo       | Tailwind CSS                     |
| Componentes  | shadcn/ui                        |
| Idiomas      | `next-intl` (pt, en, es)         |
| Tema         | `next-themes` (claro e escuro)   |
| Deploy       | Vercel                           |

Nenhuma dependência é adicionada sem justificativa registrada na etapa correspondente.

## Como rodar

Os comandos abaixo passam a valer a partir da etapa 01, quando o `package.json` existir.

```bash
npm install
npm run dev
```

Depois, abrir `http://localhost:3000`.

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
