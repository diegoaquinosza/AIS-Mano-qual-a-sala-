// @ts-nocheck
import React, { useState } from 'react';
import { generateShareText } from '../services/api';

const ScheduleScreen = ({ data, onBack }) => {
  const [layoutMode, setLayoutMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024 ? 'horizontal' : 'vertical';
    }
    return 'vertical';
  });
  
  const [copyFeedback, setCopyFeedback] = useState(false);

  const toggleLayout = () => {
    setLayoutMode(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
  };

  /**
   * FLUXO MISTO: Promise Pattern (.then/.catch)
   */
  const handleShare = () => {
    const textToShare = generateShareText(data);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare)
        .then(() => {
          setCopyFeedback(true);
          setTimeout(() => setCopyFeedback(false), 3000);
        })
        .catch((err) => {
          console.error('Falha ao copiar: ', err);
          alert('Erro ao copiar para área de transferência.');
        });
    } else {
      alert("Seu navegador não suporta cópia automática.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-background-light dark:bg-background-dark animate-slide-up transition-colors duration-300">
      {/* Hero Image */}
      <img 
        src="/GatinhosOK.png" 
        alt="Resultado da Busca" 
        className="w-full h-[250px] lg:h-[350px] object-cover object-center shadow-sm"
      />

      <div className={`
        w-full mx-auto pb-24 transition-all duration-500 mt-6
        ${layoutMode === 'horizontal' ? 'max-w-[1450px] px-4 lg:px-8' : 'max-w-2xl px-4'}
      `}>
        {/* Header com botão de voltar */}
        <div className="text-center mb-8 relative pt-2">
          <button 
            onClick={onBack}
            className="absolute left-0 top-2 p-2 text-primary dark:text-primary-light hover:bg-blue-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1 className="text-3xl font-bold text-primary dark:text-white transition-colors">Mano Qual é a Sala!?</h1>
          <div className="flex items-center justify-center mt-2">
            <h2 className="text-lg text-primary/80 dark:text-primary-light/90 font-medium bg-blue-50 dark:bg-gray-800 px-4 py-1 rounded-full border border-transparent dark:border-gray-700">
              {data.curso} - {data.periodo}º P
            </h2>
          </div>
        </div>

        {/* Grid de Dias */}
        <div className={`
          transition-all duration-500
          ${layoutMode === 'vertical' 
            ? 'flex flex-col space-y-3' 
            : 'flex flex-row gap-4 overflow-x-auto pb-8 snap-x snap-mandatory lg:grid lg:grid-cols-3 xl:grid-cols-5 lg:gap-4 lg:overflow-visible lg:snap-none lg:pb-0 justify-start lg:justify-center'
          }
        `}>
          {data.dias.map((dia, index) => (
            <DayCard key={index} dia={dia} mode={layoutMode} />
          ))}
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md p-2 rounded-full shadow-2xl border border-blue-100 dark:border-gray-700 transition-colors">
          <button 
            onClick={toggleLayout}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-blue dark:bg-gray-700 text-primary dark:text-white hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
            title="Alternar Visualização"
          >
            <span className="material-symbols-outlined">
              {layoutMode === 'vertical' ? 'view_column' : 'view_agenda'}
            </span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-primary dark:bg-primary-light text-white dark:text-gray-900 font-medium py-3 px-6 rounded-full hover:bg-cyan-800 dark:hover:bg-blue-400 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">ios_share</span>
            <span>{copyFeedback ? 'Copiado!' : 'Compartilhar'}</span>
          </button>
        </div>

        {/* Toast Feedback */}
        {copyFeedback && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-lg shadow-lg text-sm animate-bounce z-50">
            Grade copiada para o clipboard! 📋
          </div>
        )}
      </div>
    </div>
  );
};

// Componente Interno para Renderizar o Card do Dia
const DayCard = ({ dia, mode }) => {
  return (
    <div className={`
      bg-surface-blue dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-blue-100 dark:border-gray-700 h-full flex flex-col transition-colors
      ${mode === 'horizontal' 
        ? 'w-[78vw] sm:w-[320px] shrink-0 snap-center lg:w-auto' 
        : 'w-full'}
    `}>
      <h3 className="text-xl font-bold text-primary dark:text-primary-light text-center mb-3 transition-colors">{dia.nome}</h3>
      
      <div className="space-y-3 flex-1">
        {dia.aulas.map((aula, idx) => (
          <React.Fragment key={idx}>
            {/* Intervalo */}
            {idx === 1 && (
              <div className="bg-pill-blue/30 dark:bg-gray-700 rounded-full px-2 py-1 text-center my-1 border border-transparent dark:border-gray-600">
                <div className="flex justify-between items-center text-[10px] font-bold text-text-title dark:text-blue-200 tracking-wider">
                  <span>{dia.intervalo.inicio}</span>
                  <span>INTERVALO</span>
                  <span>{dia.intervalo.fim}</span>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-700/50 rounded-2xl p-3 shadow-sm border border-blue-50 dark:border-gray-600 hover:shadow-md transition-all">
              <p className="text-base font-bold text-primary dark:text-white text-center leading-tight mb-2">
                {aula.disciplina}
              </p>
              <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 font-medium">
                <span className="bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-200">{aula.horarioInicio}</span>
                <span className="text-primary dark:text-blue-200 font-bold bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded-lg truncate max-w-[80px]" title={aula.sala}>{aula.sala}</span>
                <span className="bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-200">{aula.horarioFim}</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 text-center border-t border-gray-100 dark:border-gray-600 pt-1 truncate">
                Prof. {aula.professor}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScheduleScreen;