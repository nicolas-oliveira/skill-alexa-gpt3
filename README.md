# Projeto Alexa com GPT3

Sempre assisti em filmes assistentes pessoais realmente inteligentes onde suas respostas sempre impressionam os personagens que tem contato com essa tecnologia.

Hoje em dia, assistentes pessoais como Alexa, Siri e Google são simples e creio que há um motivo para isso.

Creio que por mais que seja uma ficção científica um assistente realmente inteligente, isso é o que normalmente as pessoas associam quando desejam ver uma IA de verdade. A realidade é um pouco diferente.

Agora, será que precisamos de muito tempo para encontrar uma IA que nos impressione com suas respostas?

Com este repositório quero provar que isso já está acontecendo e as BigTechs não deixam público numa Alexa ou Siri por dois motivos:

- Ainda é muito caro ter isso em massa.

- Pode causar incômodo nas pessoas, e há implicações éticas nisso que nossa sociedade ainda está discutindo.

### Configuração e criação do código

Para criar tal código precisei criar uma skill nova com template em NodeJS na plataforma da Amazon no seguinte domínio `https://developer.amazon.com/`.

Após isso em `https://developer.amazon.com/alexa/console/ask` há uma opção para criar a skill `Create skill` e será necessário escolher o tamplete correspondente ao NodeJS.

A skill é executada em uma Lambda Function que é uma forma de 

```
./skill_alexa_gpt3
├── interactionModels
│   └── custom
│       └── pt-BR.json
├── lambda
│   ├── index.js
│   ├── local-debugger.js
│   ├── package.json
│   └── util.js
└── skill.json
```





```bash
curl https://api.openai.com/v1/engines/text-davinci-001/completions \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"prompt": "Say this is a test", "max_tokens": 6}'
```

Beleza

```json
{
  "id": "cmpl-4bFoR1iUb7UaOPmA5biP0UFdLKZNa",
  "object": "text_completion",
  "created": 1644784267,
  "model": "text-davinci:001",
  "choices": [
    {
      "text": "\n\nThis is a test",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ]
}
```


