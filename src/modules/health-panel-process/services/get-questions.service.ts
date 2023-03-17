import { HttpClient } from '../../../infra/http/http';

export class GetQuestionsService {
  constructor(private readonly http: HttpClient) {}

  async execute(): Promise<any> {
    // return this.http
    //   .get('http://localhost:3000/questions')
    //   .then(({ data }) => data.data);
    return mock;
  }
}

const mock = [
  {
    title: 'Qualidade de código',
    background: '#607D8B',
    columns: [
      {
        title: '1',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Padrões de codificação existem mas não são documentados',
            value: 'DONE',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Qualidade independente de cada desenvolvedor',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '2',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Padrões de codificação e qualidade são documentados.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Início da automação da qualidade nos ambientes de desenvolvimento (IDEs).',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Revisões por pares são estabelecidas e documentadas',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '3',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Seleção da revisão por pares automatizada.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Verificação da qualidade ocorre em ambientes dedicados de integração',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Adoção de um padrão de arquitetura e documentação. ',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '4',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Qualidade incorpora atributos de qualidade tais como performance, segurança ou usabilidade.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Verificação da qualidade opera consistentemente em base diária por automações.',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '5',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Verificação da qualidade é disparada no momento dos commits.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Defeitos e não conformidades são resolvidos no dia da ocorrência',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Dashboards de qualidade de código compartilhados publicamente com o time',
            value: 'PENDING',
          },
        ],
      },
    ],
  },
  {
    title: 'Infraestrutura como código',
    background: '#607D8B',
    columns: [
      {
        title: '1',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Padrões de codificação existem mas não são documentados',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Qualidade independente de cada desenvolvedor',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '2',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Padrões de codificação e qualidade são documentados.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Início da automação da qualidade nos ambientes de desenvolvimento (IDEs).',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Revisões por pares são estabelecidas e documentadas',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '3',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Seleção da revisão por pares automatizada.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Verificação da qualidade ocorre em ambientes dedicados de integração',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description: 'Adoção de um padrão de arquitetura e documentação. ',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '4',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Qualidade incorpora atributos de qualidade tais como performance, segurança ou usabilidade.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Verificação da qualidade opera consistentemente em base diária por automações.',
            value: 'PENDING',
          },
        ],
      },
      {
        title: '5',
        questions: [
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Verificação da qualidade é disparada no momento dos commits.',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Defeitos e não conformidades são resolvidos no dia da ocorrência',
            value: 'PENDING',
          },
          {
            id: '9fb59381-9d75-4c62-8c6b-97a553f74dbd',
            description:
              'Dashboards de qualidade de código compartilhados publicamente com o time',
            value: 'PENDING',
          },
        ],
      },
    ],
  },
];
