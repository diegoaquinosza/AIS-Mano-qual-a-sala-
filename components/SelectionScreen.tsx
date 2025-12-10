// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { AVAILABLE_CURSOS, AVAILABLE_PERIODOS } from '../services/data';

const SelectionScreen = ({ onSearch, savedPreferences }) => {
  // States para formulário
  const [curso, setCurso] = useState('');
  const [turno, setTurno] = useState('Matutino');
  const [periodo, setPeriodo] = useState(1);
  const [error, setError] = useState('');

  // Carrega preferências salvas se existirem
  useEffect(() => {
    if (savedPreferences) {
      setCurso(savedPreferences.curso);
      setTurno(savedPreferences.turno);
      setPeriodo(savedPreferences.periodo);
    }
  }, [savedPreferences]);

  const handleSubmit = () => {
    if (!curso.trim()) {
      setError('Por favor, digite o nome do curso.');
      return;
    }
    setError('');
    onSearch(curso, turno, periodo);
  };

  const handleCursoChange = (e) => {
    setCurso(e.target.value);
    if (error) setError('');
  };

  // Requirement 2: Use at least 3 array methods (.map, .find, .filter)
  const filteredCursos = AVAILABLE_CURSOS.filter(c => 
    c.toLowerCase().includes(curso.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center animate-fade-in bg-background-light dark:bg-background-dark transition-colors duration-300">
      
      {/* Hero Image */}
      <img 
        src="/Gatinhos.png" 
        alt="Gatinhos Estudando" 
        className="w-full h-[250px] lg:h-[350px] object-cover object-center shadow-sm mb-6"
      />

      <div className="w-full max-w-sm px-4 flex flex-col items-center justify-center flex-1 pb-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-text-title dark:text-white mb-2 transition-colors">
            Mano Qual é a <br/>Sala!?
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Encontre sua grade rapidinho</p>
        </header>

        <div className="w-full space-y-6 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          
          {/* Input Curso */}
          <div className="space-y-2">
            <label htmlFor="curso" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
              Curso
            </label>
            <div className="relative">
              <input
                id="curso"
                type="text"
                list="cursos-list"
                value={curso}
                onChange={handleCursoChange}
                placeholder="Ex: Sistemas"
                className="w-full pl-6 pr-12 py-4 bg-surface-blue dark:bg-gray-700 text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 border-none rounded-full focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              />
              <span className="material-icons absolute right-5 top-1/2 -translate-y-1/2 text-primary dark:text-primary-light">
                search
              </span>
              <datalist id="cursos-list">
                {filteredCursos.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>

          {/* Input Turno */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
              Turno
            </label>
            <div className="flex bg-surface-blue dark:bg-gray-700 p-1 rounded-full relative">
              <div 
                className={`absolute top-1 bottom-1 w-[48%] bg-primary dark:bg-primary-light rounded-full transition-all duration-300 shadow-md ${turno === 'Noturno' ? 'translate-x-[104%]' : 'translate-x-0'}`}
              ></div>
              <button
                onClick={() => setTurno('Matutino')}
                className={`flex-1 py-3 text-lg font-medium rounded-full z-10 transition-colors ${turno === 'Matutino' ? 'text-white dark:text-gray-900' : 'text-primary dark:text-gray-300'}`}
              >
                Matutino
              </button>
              <button
                onClick={() => setTurno('Noturno')}
                className={`flex-1 py-3 text-lg font-medium rounded-full z-10 transition-colors ${turno === 'Noturno' ? 'text-white dark:text-gray-900' : 'text-primary dark:text-gray-300'}`}
              >
                Noturno
              </button>
            </div>
          </div>

          {/* Input Periodo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
              Período
            </label>
            <div className="grid grid-cols-3 gap-3">
              {AVAILABLE_PERIODOS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriodo(p)}
                  className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-2xl transition-all duration-200 ${
                    periodo === p 
                      ? 'bg-primary dark:bg-primary-light text-white dark:text-gray-900 shadow-lg scale-105' 
                      : 'bg-surface-blue dark:bg-gray-700 text-primary dark:text-gray-300 hover:bg-blue-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {p}º
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 rounded-xl text-sm text-center border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full py-4 text-xl font-bold bg-primary dark:bg-primary-light text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-xl hover:bg-cyan-800 dark:hover:bg-blue-400 transition-all active:scale-95"
          >
            Ver Horários
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionScreen;