# Mano Qual é a Sala!? 🎓

Um sistema de horários escolares simplificado com design Material Expressive, permitindo visualização rápida, responsiva e compartilhamento de grade.

## 🚀 Sobre o Projeto

Este aplicativo ajuda estudantes a encontrarem rapidamente suas aulas, professores e salas. Com uma interface "Mobile-First", ele adapta a visualização de listas verticais para carrosséis horizontais em dispositivos móveis e grades completas em desktops.

### Principais Funcionalidades
*   **Busca Inteligente:** Filtre por Curso, Turno e Período.
*   **Persistência de Dados:** O app "lembra" sua última busca (Curso/Turno) para acesso rápido (LocalStorage).
*   **Visualização Adaptável:**
    *   *Mobile:* Cards com scroll horizontal (snap layout) e dicas visuais.
    *   *Desktop:* Grid completa.
*   **Compartilhamento:** Botão para copiar a grade formatada para o WhatsApp (Clipboard API).
*   **Hero Images:** Cabeçalhos visuais responsivos que se adaptam ao tamanho da tela.

---

## ✅ Checklist de Requisitos (Decálogo Técnico)

O projeto cumpre 100% dos requisitos técnicos propostos:

1.  [x] **Fundamentos Sólidos:** Uso de React Components, Props e State.
2.  [x] **Arquitetura de Dados:** Estruturas de dados claras (Arrays e Objetos) e uso de métodos de array (.map, .find, .filter).
3.  [x] **Modernidade:** Arrow functions utilizadas em todos os componentes e handlers.
4.  [x] **DOM Vivo:** React gerencia a atualização eficiente do DOM sem recargas de página.
5.  [x] **Conexão Externa:** Simulação de API com `fetchGradeHoraria` incluindo estados de "Loading" e tratamento de erros.
6.  [x] **Fluxo Misto (Async/Promises):**
    *   Uso de `async/await` na busca de horários (`App.jsx`).
    *   Uso de `.then/.catch` no compartilhamento via Clipboard (`ScheduleScreen.jsx`).
7.  [x] **Memória (Web Storage):** `localStorage` utilizado para salvar as preferências do aluno (Curso/Turno/Período) entre sessões.
8.  [x] **API Especial (Clipboard):** Integração com `navigator.clipboard` para exportar dados da grade.
9.  [x] **UX e Acessibilidade:** Feedback visual (Toasts), layout responsivo e estados de foco nos formulários.
10. [x] **Código Limpo:** Separação clara de responsabilidades em pastas (`components`, `services`) utilizando JavaScript.

---

## 🛠️ Tecnologias Utilizadas

*   **React 19**
*   **JavaScript (ES6+)**
*   **Tailwind CSS** (Estilização)
*   **Google Fonts & Material Icons**

---

## 🤖 Declaração de Uso de IA

Conforme solicitado no protocolo de entrega, declaro que este projeto foi desenvolvido com o auxílio de ferramentas de Inteligência Artificial para:

1.  **Estruturação de Código:** Geração do esqueleto inicial dos componentes React.
2.  **Estilização (CSS):** Sugestões de classes utilitárias do Tailwind para resolver problemas de layout responsivo (ex: Grid vs Flex no mobile).
3.  **Dados de Teste:** Geração do arquivo `services/data.js` com dados fictícios para validar a lógica.

Todas as decisões de arquitetura e a lógica de negócios foram revisadas e implementadas conforme os requisitos da disciplina.

---

## 📦 Como Executar

1.  Baixe os arquivos do projeto.
2.  Abra o arquivo `index.html` em qualquer navegador moderno.
3.  Não é necessário instalação de pacotes (npm/node), pois o projeto utiliza imports via CDN para facilitar a execução local.

---

&copy; 2025 Mano Qual é a Sala!? - Projeto Acadêmico