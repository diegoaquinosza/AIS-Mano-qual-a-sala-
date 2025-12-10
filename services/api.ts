// @ts-nocheck
import { mockDatabase } from './data';

// Simula um atraso de rede (Network Latency)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Busca a grade horária baseada nos filtros.
 * Utiliza Promises para simular uma requisição Ajax/Fetch.
 */
export const fetchGradeHoraria = async (curso, periodo, turno) => {
  
  // Simulando tempo de carregamento (Loading state requirement)
  await delay(1200);

  // Simulando busca no banco de dados (Array Method: .find)
  const result = mockDatabase.find(grade => 
    grade.curso.toLowerCase().includes(curso.toLowerCase()) &&
    grade.periodo === periodo &&
    grade.turno === turno
  );

  return result;
};

/**
 * Função utilitária para gerar texto compartilhável para WhatsApp.
 * Array Method: .map, .reduce
 */
export const generateShareText = (grade) => {
  let text = `📅 *Grade: ${grade.curso} - ${grade.periodo}º P (${grade.turno})*\n\n`;

  text += grade.dias.map(dia => {
    const aulasText = dia.aulas.map(aula => 
      `   ⏰ ${aula.horarioInicio} - ${aula.horarioFim}\n   📚 ${aula.disciplina}\n   🏫 ${aula.sala} (${aula.professor})`
    ).join('\n\n');

    return `*${dia.nome}*\n${aulasText}`;
  }).join('\n\n------------------\n\n');

  text += "\n\n🔗 *Enviado via App: Mano Qual é a Sala!?*";
  return text;
};