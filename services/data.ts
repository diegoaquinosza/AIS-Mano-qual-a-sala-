// @ts-nocheck
/**
 * ============================================================================
 * ÁREA DE ATUALIZAÇÃO DE DADOS
 * ============================================================================
 * Para atualizar os horários, edite o array abaixo.
 * Mantenha a estrutura do JSON válida.
 */

export const mockDatabase = [
  {
    id: "sistemas-2-matutino",
    curso: "Sistemas para Internet",
    periodo: 2,
    turno: "Matutino",
    dias: [
      {
        nome: "Segunda",
        intervalo: { inicio: "09:00", fim: "09:15" },
        aulas: [
          {
            disciplina: "Fund. Proj. de Dados",
            professor: "Liliane Felix",
            sala: "LABDES",
            horarioInicio: "07:30",
            horarioFim: "09:00"
          },
          {
            disciplina: "Fund. Proj. de Dados",
            professor: "Liliane Felix",
            sala: "LABDES",
            horarioInicio: "09:15",
            horarioFim: "10:45"
          }
        ]
      },
      {
        nome: "Terça",
        intervalo: { inicio: "09:00", fim: "09:15" },
        aulas: [
          {
            disciplina: "Programação Web 1",
            professor: "Carlos Silva",
            sala: "LAB 3",
            horarioInicio: "07:30",
            horarioFim: "09:00"
          },
          {
            disciplina: "Banco de Dados",
            professor: "Ana Souza",
            sala: "LAB 2",
            horarioInicio: "09:15",
            horarioFim: "10:45"
          }
        ]
      },
      {
        nome: "Quarta",
        intervalo: { inicio: "09:00", fim: "09:15" },
        aulas: [
          {
            disciplina: "Matemática Discreta",
            professor: "Roberto Santos",
            sala: "Sala 12",
            horarioInicio: "07:30",
            horarioFim: "09:00"
          },
          {
            disciplina: "Inglês Técnico",
            professor: "Mary Jones",
            sala: "Sala 10",
            horarioInicio: "09:15",
            horarioFim: "10:45"
          }
        ]
      },
      {
        nome: "Quinta",
        intervalo: { inicio: "09:00", fim: "09:15" },
        aulas: [
            {
            disciplina: "Fund. Proj. de Dados",
            professor: "Liliane Felix",
            sala: "LABDES",
            horarioInicio: "07:30",
            horarioFim: "09:00"
          },
          {
            disciplina: "Redes de Computadores",
            professor: "Pedro Alvares",
            sala: "LAB REDES",
            horarioInicio: "09:15",
            horarioFim: "10:45"
          }
        ]
      },
      {
        nome: "Sexta",
        intervalo: { inicio: "09:00", fim: "09:15" },
        aulas: [
          {
            disciplina: "Ética Profissional",
            professor: "Joana Dark",
            sala: "Auditório",
            horarioInicio: "07:30",
            horarioFim: "09:00"
          },
          {
            disciplina: "Projeto Integrador",
            professor: "Equipe PI",
            sala: "LABDES",
            horarioInicio: "09:15",
            horarioFim: "10:45"
          }
        ]
      }
    ]
  },
  // Exemplo de outro período/curso para teste
  {
    id: "sistemas-4-noturno",
    curso: "Sistemas para Internet",
    periodo: 4,
    turno: "Noturno",
    dias: [
      {
        nome: "Segunda",
        intervalo: { inicio: "20:30", fim: "20:45" },
        aulas: [
          {
            disciplina: "Segurança da Info",
            professor: "Mr. Robot",
            sala: "LAB 5",
            horarioInicio: "19:00",
            horarioFim: "20:30"
          }
        ]
      }
    ]
  }
];

// Listas auxiliares para os dropdowns/botões
export const AVAILABLE_CURSOS = ["Sistemas para Internet", "Engenharia Civil", "Licenciatura em Química"];
export const AVAILABLE_PERIODOS = [1, 2, 3, 4, 5, 6];