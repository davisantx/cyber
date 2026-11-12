# Capítulo 1: Três anos de preparação

## Metadados do Capítulo
- **ID:** `chapter-01`
- **Número:** 1
- **Revisão:** 3
- **Título:** Três anos de preparação
- **Protagonista:** André (`andre`)
- **Contexto:** Um concurso fictício na reta final de uma preparação de três anos.
- **Cena Inicial:** `estudo`
- **Próximo Capítulo:** `chapter-02` (O que chegou ao grupo)

---

## Variáveis Iniciais de Estado
As variáveis controlam as ramificações e reações narrativas conforme as escolhas do jogador:
- `reorganizedStudy`: `false` (Indica se André mudou o plano de estudos por causa de boatos)
- `askedGroup`: `false` (Indica se André perguntou ao grupo sobre o comunicado oficial)
- `checkedCard`: `false` (Indica se André conferiu o próprio cartão de confirmação oficial)
- `calledOrganizer`: `false` (Indica se André tentou contato oficial listado no edital)
- `sharedRumor`: `false` (Indica se André repassou o boato/print para o grupo)
- `correctedGroup`: `false` (Indica se André enviou correção no grupo desmentindo o boato)
- `helpedGroup`: `false` (Indica se André enviou instruções oficiais para orientar o grupo)
- `rested`: `false` (Indica se André reconheceu a corrente falsa da madrugada e foi dormir)
- `practicedWeakPoint`: `false` (Indica se André identificou o domínio falso `.xyz` e alertou o grupo sobre o phishing de CPF)
- `followedGroup`: `false` (Indica se André clicou no link suspeito `.xyz` movido pela ansiedade)
- `helpedAtGate`: `false` (Indica se André ajudou uma candidata no portão a conferir o cartão no portal oficial)
- `settledAtGate`: `false` (Indica se André entrou diretamente na escola enquanto Luana orientava a candidata)
- `reportedScam`: `false` (Indica se André alertou o grupo e denunciou a montagem de golpe via PIX pós-prova)
- `ignoredScam`: `false` (Indica se André reconheceu o golpe pós-prova e fechou o grupo aguardando o canal oficial)

---

## Fluxo das Cenas

```mermaid
flowchart TD
    estudo[Cena: estudo] --> contagem[Cena: contagem]
    contagem --> boato_banca[Cena: boato_banca]

    boato_banca -->|Abrir portal| banca_portal[Cena: banca_portal]
    boato_banca -->|Perguntar no grupo| banca_grupo[Cena: banca_grupo]
    boato_banca -->|Trocar plano| banca_revisao[Cena: banca_revisao]

    banca_portal --> revisao_sabado[Cena: revisao_sabado]
    banca_grupo --> revisao_sabado
    banca_revisao --> revisao_sabado

    revisao_sabado -->|Identificar domínio .xyz e alertar| questao_refeita[Cena: questao_refeita]
    revisao_sabado -->|Abrir link suspeito| grupo_acompanhado[Cena: grupo_acompanhado]

    questao_refeita --> boato_local[Cena: boato_local]
    grupo_acompanhado --> boato_local

    boato_local -->|Conferir cartão no portal| local_cartao[Cena: local_cartao]
    boato_local -->|Buscar contato no edital| local_telefone[Cena: local_telefone]
    boato_local -->|Repassar print ao grupo| local_compartilhado[Cena: local_compartilhado]

    local_cartao --> apoio_grupo[Cena: apoio_grupo]
    local_telefone --> apoio_grupo

    local_compartilhado --> reparar_grupo[Cena: reparar_grupo]
    reparar_grupo -->|Corrigir no grupo| correcao[Cena: correcao]
    reparar_grupo -->|Apagar e calar| silencio[Cena: silencio]

    correcao --> ultima_noite[Cena: ultima_noite]
    silencio --> ultima_noite

    apoio_grupo -->|Orientar grupo| grupo_orientado[Cena: grupo_orientado]
    apoio_grupo -->|Deixar Luana responder| grupo_luana[Cena: grupo_luana]

    grupo_orientado --> ultima_noite
    grupo_luana --> ultima_noite

    ultima_noite -->|Reconhecer corrente falsa e dormir| sono[Cena: sono]
    ultima_noite -->|Pesquisar áudio sem fonte| vigilia[Cena: vigilia]

    sono --> entrada_escola[Cena: entrada_escola]
    vigilia --> entrada_escola

    entrada_escola -->|Ajudar candidata a abrir cartão| entrada_ajuda[Cena: entrada_ajuda]
    entrada_escola -->|Entrar na escola| entrada_calma[Cena: entrada_calma]

    entrada_ajuda --> prova[Cena: prova]
    entrada_calma --> prova

    prova -->|Denunciar golpe de PIX| golpe_denunciado[Cena: golpe_denunciado]
    prova -->|Fechar grupo e aguardar edital| golpe_ignorado[Cena: golpe_ignorado]

    golpe_denunciado -->|sharedRumor & !correctedGroup| fim_silencio[Final: fim_silencio]
    golpe_denunciado -->|reorganizedStudy & !rested| fim_cansaco[Final: fim_cansaco]
    golpe_denunciado -->|correctedGroup| fim_correcao[Final: fim_correcao]
    golpe_denunciado -->|Padrão| fim_tranquilo[Final: fim_tranquilo]

    golpe_ignorado -->|sharedRumor & !correctedGroup| fim_silencio
    golpe_ignorado -->|reorganizedStudy & !rested| fim_cansaco
    golpe_ignorado -->|correctedGroup| fim_correcao
    golpe_ignorado -->|Padrão| fim_tranquilo
```
