/* *
 * Este exemplo demonstra o manuseio das intenções de uma habilidade Alexa usando o Alexa Skills Kit SDK (v2).
 * Visite https://alexa.design/cookbook para exemplos adicionais sobre a implementação de slots, gerenciamento de diálogos,
 * persistência da sessão, chamadas de api, e muito mais.
 * */
const Alexa = require("ask-sdk-core");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput = "Entrando em modo conversacional";

    const speakReprompt =
      "Conectando ao servidor do GPT3... Pronto, estou ouvindo.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakReprompt)
      .getResponse();
  },
};

const ConversationModeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "ConversationModeIntent"
    );
  },
  handle(handlerInput) {
    const resultGPT3Output = "Este é a resposta do GPT3";
    const speakOutput = `${resultGPT3Output}`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Mais alguma coisa?")
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Me fale alguma coisa ou me faça alguma pergunta que irei tentar ajudar";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speakOutput = "Até mais!";

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent é acionado quando um cliente diz algo que não é mapeado em sua habilidade
 * Também deve ser definido no modelo de idioma (se o locale o suportar)
 * Este manipulador pode ser adicionado com segurança, mas será ignorado em locais que ainda não o suportam
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Desculpe, Não consegui entender. Tente falar novamente.";

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessãoEndedRequest notifica que uma sessão foi encerrada. Este manipulador será acionado quando uma sessão estiver
 * aberta no momento que sessão é encerrada por uma das seguintes razões:
 * 1) O usuário diz "sair" ou "desistir".
 * 2) O usuário não responde ou diz algo que não corresponde a uma intenção definida em seu modelo de voz.
 * 3) Ocorre um erro
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  handle(handlerInput) {
    console.log(
      `~~~~ Sessão terminada: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * O refletor de intenção é usado para testar e depurar o modelo de interação.
 * Ele simplesmente repetirá a intenção que o usuário disse. Você pode criar manipuladores personalizados para suas intenções
 * definindo-os acima e depois adicionando-os também à cadeia de tratamento de solicitações abaixo
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `Você precisa corrigir a ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Lida com erros genéricos para capturar qualquer erro de sintaxe ou de roteamento. Se você receber um erro
 * declarando que não foi encontrada a cadeia de tratamento de pedidos, você não implementou um manipulador para
 * a intenção que está sendo invocada ou incluída no construtor de habilidades abaixo
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput =
      "Desculpe, estou tendo problemas para processar o que você disse. Tente novamente mais tarde.";
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * Este handler atua como ponto de entrada para sua habilidade, encaminhando todas as solicitações e respostas
 * cargas úteis para os handlers acima. Certifique-se de que quaisquer novos handlers ou interceptores que você tenha
 * definidos estão incluídos abaixo. O pedido importa - eles são processados de cima para baixo
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ConversationModeIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent("sample/hello-world/v1.2")
  .lambda();
