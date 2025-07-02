import { Injectable } from '@nestjs/common';
import { GeminiService } from './gemini/gemini.service';

@Injectable()
export class AiService {
  constructor(private readonly geminiService: GeminiService) {}

  public async noficationNewUser(name: string) {
    const prompt = `Você está criando uma frase de boas-vindas para um novo usuário em nosso sistema de livraria. O nome do usuário é ${name}.

Instruções:

Foque apenas na frase de boas-vindas.

Use HTML de forma simples, sem incluir blocos de código. Apenas as tags < > e seu conteúdo, sem necessidade de usar o formato de código.

Não inclua links ou números de telefone, pois não temos essas informações no momento.

Baseie-se no exemplo a seguir, mas sinta-se livre para tornar a mensagem mais acolhedora e personalizada. Adicione qualquer outro detalhe que você achar que ajudaria a tornar a recepção ainda mais calorosa e envolvente:

Exemplo:
<h1>Olá, fulano! Seja bem-vindo(a) à nossa livraria!</h1>
<p>Estamos muito felizes com a sua entrada. Temos certeza de que vamos compartilhar muitos livros e experiências incríveis juntos!</p>
Fim do exemplo.
Importante: Não é necessário seguir o exemplo exatamente. Use-o apenas como referência para o tom e a estrutura. A mensagem deve ser amigável, calorosa e acolhedora. Não esqueça de estilizar o HTML e se quiser pode mencionar (livros aleatórios que "existem" na livraria) alguns livros que estão em alta.
    `;

    const result = await this.geminiService.generateText({
      prompt,
      sessionId: 'none',
    });

    if (!result) {
      return '';
    }

    return result;
  }

  public async suggestCategoriesForBook(
    title: string,
    categ: string[],
    description?: string,
  ): Promise<string> {
    const prompt = `Dada a descrição do livro '${title} - ${description}', sugira as 3 categorias mais relevantes para ele em formato de lista [Categoria1, Categoria2]. Use as seguintes categorias existentese como referência: '${categ}'. Retorne apenas o array com as categorias, nada mais.`;
    const suggest = await this.geminiService.generateWithPrompt(prompt);
    return suggest;
  }
}
