// @ts-nocheck
import React, { useState, useEffect } from 'react';
import SelectionScreen from './components/SelectionScreen';
import ScheduleScreen from './components/ScheduleScreen';
import { fetchGradeHoraria } from './services/api';

const App = () => {
  // Estados para controle de navegação e dados
  const [currentScreen, setCurrentScreen] = useState('selection');
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Estado para persistência de preferências
  const [savedPrefs, setSavedPrefs] = useState(null);

  // Estado para Tema Escuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * MEMÓRIA (Web Storage) - Tema e Preferências
   * Recupera tema e dados do usuário ao iniciar.
   */
  useEffect(() => {
    // Carregar preferências de busca
    const storedPrefs = localStorage.getItem('mano_sala_prefs');
    if (storedPrefs) {
      try {
        setSavedPrefs(JSON.parse(storedPrefs));
      } catch (e) {
        console.error("Erro ao ler storage de prefs", e);
      }
    }

    // Carregar Tema Escuro
    const storedTheme = localStorage.getItem('mano_sala_theme');
    // Verifica storage ou preferência do sistema
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('mano_sala_theme', newMode ? 'dark' : 'light');
      
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  /**
   * FLUXO MISTO: Async/Await Pattern
   */
  const handleSearch = async (curso, turno, periodo) => {
    setLoading(true);
    setErrorMsg('');

    try {
      localStorage.setItem('mano_sala_prefs', JSON.stringify({ curso, turno, periodo }));
      const result = await fetchGradeHoraria(curso, periodo, turno);

      if (result) {
        setScheduleData(result);
        setCurrentScreen('schedule');
      } else {
        setErrorMsg('Poxa mano, não achei grade pra essa turma aí não. Tenta "Sistemas" / 2º P / Matutino.');
      }

    } catch (err) {
      console.error(err);
      setErrorMsg('Deu ruim na conexão. Tenta de novo.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentScreen('selection');
    setScheduleData(null);
    setErrorMsg('');
  };

  // Renderização condicional baseada no estado de Loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-300 p-4">
        <div className="w-16 h-16 border-4 border-surface-blue border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-primary font-medium animate-pulse">Buscando horários...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans transition-colors duration-300 flex flex-col relative">
      
      {/* Botão Flutuante de Tema (Canto Superior Direito) */}
      <button 
        onClick={toggleTheme}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-300 shadow-md hover:shadow-lg transition-all active:scale-95"
        title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
      >
        <span className="material-icons">
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      {/* Container principal */}
      <main className="w-full mx-auto flex-grow">
        {currentScreen === 'selection' ? (
          <>
            <SelectionScreen 
              onSearch={handleSearch} 
              savedPreferences={savedPrefs}
            />
            {errorMsg && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-2xl text-center max-w-sm mx-auto border border-red-100 dark:border-red-800 shadow-sm animate-bounce mx-4">
                <span className="material-icons text-2xl block mb-1">error_outline</span>
                {errorMsg}
              </div>
            )}
          </>
        ) : (
          scheduleData && (
            <ScheduleScreen 
              data={scheduleData} 
              onBack={handleBack} 
            />
          )
        )}
      </main>

      {/* Footer simples */}
      <footer className="text-center py-6 text-gray-400 text-xs mt-auto p-4 dark:text-gray-600">
        <p>&copy; {new Date().getFullYear()} Mano Qual é a Sala!?</p>
        <p>Projeto Acadêmico</p>
      </footer>
    </div>
  );
};

export default App;