# Tools

## ADR

We use [ADR Tools](https://github.com/npryce/adr-tools)

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
