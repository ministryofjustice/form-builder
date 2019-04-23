# Tools

## ADR

We use [ADR Tools](https://github.com/npryce/adr-tools).

[Installation instructions](https://github.com/npryce/adr-tools/blob/master/INSTALL.md)

Additionally, the following helper scripts can be found in `./bin`

- `./bin/adr-amends A B`

  Annotates A and B records that A amends B
- `./bin/adr-supersedes A B`

  Annotates A and B records that A supersedes B
- `./bin/adr-generate-toc`

  Generate table of contents for architectural decision records, complete with emoji to reflect status

## Images

- `./bin/images-generate`

  Generate images from any source mermaid (`.mmd`), graphviz (`.dot`) or PlantUML (`.puml`) files

  ### Source files and images

  Source files are located in `./files` and output to `./images`

### Online image editors

#### Mermaid files (.mmd)
- [Mermaid documentation](https://mermaidjs.github.io/)
- [Mermaid Live Editor](https://mermaidjs.github.io/mermaid-live-editor)

#### Dot files (.dot)
- [Graphviz documentation](https://graphviz.gitlab.io/documentation/)
- [Graphviz it](http://graphviz.it)

#### PlantUML files (.puml)
- [PlantUML Guide](http://plantuml.com/guide)
- [Planttext](https://www.planttext.com/)
- [PlantUML Editor](https://plantuml-editor.kkeisuke.com)

### Installing CLI image tools

#### Mermaid files (.mmd)
- `npm install -g mermaid.cli`  
- or see [Mermaid npm page](https://www.npmjs.com/package/mermaid.cli)

#### Dot files (.dot)
- `brew install graphviz`  
- or see [Graphviz download page](https://graphviz.gitlab.io/download/)

#### PlantUML files (.puml)
- `npm install -g node-plantuml`
- or see [node-plantuml npm page](https://www.npmjs.com/package/node-plantuml)
- Requires Java SDK
- Optionally requires Graphviz for all diagram types
  